import React, { useEffect, useRef } from "react";
import SeraniAILogo from "./SeraniAILogo";
import { User } from "lucide-react";

function MessageList({ messages = [], loading = false }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // ==========================
  // WELCOME SCREEN
  // ==========================
  if (messages.length === 0) {
    return (
      // ✅ FIX: Use h-full/w-full so this fills the parent height correctly
      <div className="h-full w-full flex items-center justify-center bg-white">
        <div className="flex items-center gap-5">
          <SeraniAILogo size={60} color="#16a34a" />
          <h2 className="text-3xl font-semibold text-gray-800">
            What brings you here today?
          </h2>
        </div>
      </div>
    );
  }

  return (
    // ✅ FIX: Use h-full (not flex-1) to correctly fill parent wrapper height
    <div className="h-full overflow-y-auto bg-white">
      {/* Container centered */}
      <div className="max-w-5xl mx-auto px-10 py-8">
        {messages.map((msg, index) => {
          const isUser = msg.role === "user";

          return (
            <div
              key={index}
              className={`mb-8 flex ${isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex gap-3 ${
                  isUser ? "flex-row-reverse" : "flex-row"
                } max-w-[65%]`}
              >
                {/* Avatar */}
                <div className="w-9 h-9 flex-shrink-0">
                  {isUser ? (
                    <div className="w-9 h-9 bg-blue-500 rounded-full flex items-center justify-center shadow-md">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  ) : (
                    <div className="w-9 h-9 bg-green-500 rounded-full flex items-center justify-center shadow-md">
                      <SeraniAILogo size={16} color="#ffffff" />
                    </div>
                  )}
                </div>

                {/* Bubble */}
                <div
                  className={`px-5 py-3 rounded-2xl shadow-sm text-[15px] leading-relaxed break-words ${
                    isUser
                      ? "bg-blue-100 text-gray-900 rounded-br-sm"
                      : "bg-gray-100 text-gray-900 rounded-bl-sm"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            </div>
          );
        })}

        {/* Loading bubble */}
        {loading && (
          <div className="mb-8 flex justify-start">
            <div className="flex gap-3 max-w-[65%]">
              <div className="w-9 h-9 bg-green-500 rounded-full flex items-center justify-center shadow-md">
                <SeraniAILogo size={16} color="#ffffff" />
              </div>

              <div className="px-5 py-3 rounded-2xl bg-gray-100 shadow-sm rounded-bl-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  />
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}

export default MessageList;
