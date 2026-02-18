import React from "react";
import { Trash2 } from "lucide-react";
import { deleteSession } from "../../../api/chatApi";

function Sidebar({
  conversations,
  onOpenChat,
  onNewChat,
  activeSessionId,
  setConversations,
  setActiveSessionId,
  setMessages,
}) {

  const handleDelete = async (e, id) => {
    e.stopPropagation(); // prevent opening chat

    try {
      await deleteSession(id);

      setConversations((prev) =>
        prev.filter((chat) => chat._id !== id)
      );

      if (activeSessionId === id) {
        setActiveSessionId(null);
        setMessages([]);
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="w-72 border-r bg-white flex flex-col">

      {/* New Chat Button */}
      <div className="p-4">
        <button
          onClick={onNewChat}
          className="w-full border rounded-lg py-2 flex items-center justify-center gap-2"
        >
          <span className="text-xl">+</span>
          <span>New Chat</span>
        </button>
      </div>

      {/* Chat History */}
      <div className="px-4 space-y-2 overflow-y-auto">

        {conversations.map((chat) => (
          <div
            key={chat._id}
            onClick={() => onOpenChat(chat._id)}
            className={`group flex items-center justify-between p-2 rounded-lg cursor-pointer transition ${
              activeSessionId === chat._id
                ? "bg-gray-200"
                : "hover:bg-gray-100"
            }`}
          >
            <span className="truncate text-sm">
              {chat.title || "Untitled"}
            </span>

            {/* Hidden by default, visible on hover */}
            <Trash2
              size={16}
              className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:text-red-400 cursor-pointer"
              onClick={(e) => handleDelete(e, chat._id)}
            />
          </div>
        ))}

      </div>
    </div>
  );
}

export default Sidebar;
