const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { spawn } = require("child_process");

const app = express();
const PORT = 8000;

app.use(cors());
app.use(bodyParser.json());

app.post("/api/chat", (req, res) => {
  const question = req.body.message;
  const python = spawn("python", ["C:/Desktop/chatbotwebd/QA.py", question]);

  let result = "";
  python.stdout.on("data", (data) => (result += data.toString()));
  python.stderr.on("data", (data) => console.error(`stderr: ${data}`));
  python.on("close", () => res.json({ reply: result.trim() }));
});

app.listen(PORT, () => console.log(`Express API running on http://localhost:${PORT}`));
