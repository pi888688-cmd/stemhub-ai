import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const r = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: "Bạn là trợ lý STEMHUB, trả lời ngắn gọn." },
          { role: "user", content: userMessage }
        ]
      })
    });

    const data = await r.json();
    res.json({ reply: data.choices?.[0]?.message?.content || "AI bận" });
  } catch (e) {
    res.json({ reply: "Lỗi server AI" });
  }
});

app.listen(3000);
