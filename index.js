const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { spawn } = require("child_process");

const app = express();
const PORT = process.env.PORT || 8000; // Dynamic port for Render

app.use(cors());
app.use(bodyParser.json());

// Path to Python script from env
const PYTHON_SCRIPT_PATH = process.env.PYTHON_SCRIPT_PATH || "./QA.py";

app.post("/api/chat", (req, res) => {
  const question = req.body.message;
  const python = spawn("python3", [PYTHON_SCRIPT_PATH, question]);

  let result = "";
  python.stdout.on("data", (data) => (result += data.toString()));
  python.stderr.on("data", (data) => console.error(`stderr: ${data}`));
  python.on("close", () => res.json({ reply: result.trim() }));
});

app.listen(PORT, () => console.log(`Express API running on port ${PORT}`));
