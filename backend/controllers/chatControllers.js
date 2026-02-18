const Chat = require("../models/chatModels");
const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

function getModelName() {
  // you already have MODEL in .env
  return process.env.MODEL || "llama-3.1-8b-instant";
}

async function getAiReply(history) {
  if (!process.env.GROQ_API_KEY) {
    return "GROQ_API_KEY is not set in backend/.env";
  }

  // Use last N messages to avoid long prompts
  const messages = (history || [])
    .slice(-20)
    .map((m) => ({ role: m.role, content: m.content }));

  const completion = await groq.chat.completions.create({
    model: getModelName(),
    messages,
    temperature: 0.7,
  });

  return completion?.choices?.[0]?.message?.content?.trim() || "No reply";
}

exports.sendMessage = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) return res.status(401).json({ message: "Not authorized" });

    const { message, sessionId } = req.body;
    const clean = (message || "").trim();
    if (!clean) return res.status(400).json({ message: "Message is required" });

    let chat;

    if (sessionId) {
      chat = await Chat.findOne({ _id: sessionId, user: userId });
      if (!chat) return res.status(404).json({ message: "Chat session not found" });
    } else {
      chat = await Chat.create({
        user: userId,
        title: clean.slice(0, 40),
        messages: [],
      });
    }

    // 1) Save user message
    chat.messages.push({ role: "user", content: clean });

    // 2) Generate AI reply using Groq (inside same Node backend)
    const reply = await getAiReply(chat.messages);

    // 3) Save assistant message
    chat.messages.push({ role: "assistant", content: reply });

    await chat.save();

    return res.status(200).json({
      sessionId: chat._id,
      reply,
    });
  } catch (err) {
    console.error("sendMessage error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) return res.status(401).json({ message: "Not authorized" });

    const chats = await Chat.find({ user: userId })
      .select("_id title updatedAt createdAt")
      .sort({ updatedAt: -1 });

    return res.status(200).json(chats);
  } catch (err) {
    console.error("getHistory error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getSession = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) return res.status(401).json({ message: "Not authorized" });

    const chat = await Chat.findOne({ _id: req.params.id, user: userId });
    if (!chat) return res.status(404).json({ message: "Chat session not found" });

    return res.status(200).json(chat);
  } catch (err) {
    console.error("getSession error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.deleteSession = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) return res.status(401).json({ message: "Not authorized" });

    const deleted = await Chat.findOneAndDelete({ _id: req.params.id, user: userId });
    if (!deleted) return res.status(404).json({ message: "Chat session not found" });

    return res.status(200).json({ message: "Chat deleted" });
  } catch (err) {
    console.error("deleteSession error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.clearHistory = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) return res.status(401).json({ message: "Not authorized" });

    await Chat.deleteMany({ user: userId });
    return res.status(200).json({ message: "All chat history cleared" });
  } catch (err) {
    console.error("clearHistory error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
