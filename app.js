const express = require('express');
const config = require('config');
const mongoose = require("mongoose");
const indexRoute = require("./routes");

const PORT = config.get("port") || 3030;

const app = express();
app.use(express.json());

app.use("/api", indexRoute);

async function start() {
  try {
    const uri = config.get("dbUri");
    await mongoose.connect(uri);
    app.listen(PORT, () => {
      console.log(`Server running on port:${PORT}`);
    });
  } catch (error) {
    console.log(`error: `, error.message);
  }
}
start();
