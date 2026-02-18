import React, { useState } from "react";
import { Send } from "lucide-react";

function MessageInput({ onSend, disabled }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div className="border-t p-4">
      <div className="max-w-3xl mx-auto flex gap-3 border rounded-2xl p-3 shadow">
        <textarea
          className="flex-1 resize-none outline-none"
          placeholder="Message Serani"
          rows={1}
          value={text}
          disabled={disabled}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <button
          onClick={handleSend}
          disabled={disabled}
          className="p-2 rounded-xl hover:bg-gray-100"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default MessageInput;
