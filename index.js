const express = require("express");
const app = express();
app.use(express.json());

app.post("/crane", async (req, res) => {
  try {
    const { messages } = req.body;

    const response = await fetch("http://localhost:11434/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "qwen2.5:7b",
        messages: messages,
        stream: false
      })
    });

    const data = await response.json();
    const text = data.message?.content || "";

    res.json({ response: text });
  } catch (err) {
    console.error("Ollama error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("Proxy running on port 3000"));
