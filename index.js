const express = require("express")
const app = express()
app.use(express.json())

const GROQ_API_KEY = process.env.GROQ_API_KEY

app.post("/crane", async (req, res) => {
    const { messages } = req.body
    if (!messages) return res.status(400).json({ error: "No messages" })

    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${GROQ_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama3-8b-8192",
                messages: messages,
                max_tokens: 80,
                temperature: 0.7,
            })
        })
        const data = await response.json()
        const text = data.choices?.[0]?.message?.content || "..."
        res.json({ response: text })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

app.get("/", (req, res) => res.send("Cornered proxy running"))

app.listen(process.env.PORT || 3000)
