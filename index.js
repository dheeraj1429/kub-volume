const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/story", (req, res) => {
  fs.readFile(
    path.join(__dirname, "story", "story.txt"),
    "utf-8",
    (err, data) => {
      if (err) {
        console.log({ err });
      }
      return res.status(200).json({ data });
    }
  );
});

app.post("/story", (req, res) => {
  const { task } = req.body;
  if (!task)
    return res.status(200).json({ message: "Task is required", error: true });

  fs.appendFile(
    path.join(__dirname, "story", "story.txt"),
    task + "\n",
    (error) => {
      if (error) {
        console.log(error);
      }
    }
  );
  return res.status(200).json({ success: true });
});

app.get("/exit", () => {
  process.exit(1);
});

app.listen(port, () => {
  console.log("listening on port " + port);
});
