import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "./Sidebar";
import { fetchHistory, fetchSession, sendMessage } from "../../../api/chatApi";
import { Menu, Sun } from "lucide-react";
import SeraniAILogo from "./SeraniAILogo";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

function ChatInterface() {
  const sessionIdLocal = useMemo(() => {
    return "user-" + Math.random().toString(36).slice(2, 10);
  }, []);

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mongo sessions list (history)
  const [conversations, setConversations] = useState([]);

  // The currently opened MongoDB chat session id
  const [activeSessionId, setActiveSessionId] = useState(null);

  // Load history on mount
  useEffect(() => {
    (async () => {
      try {
        const res = await fetchHistory();
        setConversations(res.data || []);
      } catch (e) {
        console.error("fetchHistory error:", e);
      }
    })();
  }, []);

  // ✅ CLICK HISTORY ITEM: open that chat
  const openChatFromHistory = async (mongoId) => {
    try {
      setLoading(true);
      setActiveSessionId(mongoId);
      const res = await fetchSession(mongoId);
      setMessages(res.data?.messages || []);
    } catch (e) {
      console.error("fetchSession error:", e);
    } finally {
      setLoading(false);
    }
  };

  // New chat: clear UI, create new session when first message sent
  const newChat = () => {
    setActiveSessionId(null);
    setMessages([]);
  };

  // Send message: must include activeSessionId
  const sendToBackend = async (text) => {
    const clean = (text || "").trim();
    if (!clean) return;

    // show user msg immediately
    setMessages((prev) => [...prev, { role: "user", content: clean }]);

    try {
      setLoading(true);

      const res = await sendMessage(clean, activeSessionId);
      const { sessionId, reply } = res.data;

      // If it was a new chat, backend created sessionId
      if (!activeSessionId) setActiveSessionId(sessionId);

      // show assistant msg
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);

      // refresh history list so sidebar updates
      const his = await fetchHistory();
      setConversations(his.data || []);
    } catch (e) {
      console.error("sendMessage error:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[91vh] ">
      <Sidebar
  conversations={conversations}
  onOpenChat={openChatFromHistory}
  onNewChat={newChat}
  activeSessionId={activeSessionId}
  setConversations={setConversations}
  setActiveSessionId={setActiveSessionId}
  setMessages={setMessages}
/>


      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-white border-gray-200 text-black">
          <div className="flex items-center gap-3">
            <Menu className="cursor-pointer" />
            <SeraniAILogo />
            <span className="font-semibold text-lg">SeraniAI</span>
          </div>

          <div className="flex items-center gap-2">
            <Sun className="cursor-pointer" />
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          <MessageList messages={messages} loading={loading} />
        </div>

        {/* Input */}
        <MessageInput onSend={sendToBackend} loading={loading} />
      </div>
    </div>
  );
}

export default ChatInterface;
