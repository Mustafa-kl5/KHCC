const express = require("express");
const { connectDB } = require("./Database");
const app = express();
const port = 4111;

app.get("/", async (req, res) => {
  try {
    const users = await connectDB();
    res.send(users);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
