const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Serve frontend
app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.post("/run", (req, res) => {
  const code = req.body.code;

  const tempDir = path.join(__dirname, "temp");
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }

  const filePath = path.join(tempDir, "temp.py");

  fs.writeFileSync(filePath, code);

  exec(`python -X utf8 "${filePath}"`, (err, stdout, stderr) => {
  if (err) {
    return res.json({ output: stderr || "Error running code" });
  }

  if (stderr) {
    return res.json({ output: stderr });
  }

  res.json({ output: stdout || "No Output" });
});
});

app.listen(3000, () => {
  console.log("🔥 Server running: http://localhost:3000");
});