const express = require("express");
const app = express();
const connect = require("./lib/connect");
connect();
const PORT = process.env.PORT || 5000;

//middleware
app.use(express.json());

//cow middleware
app.use("/api/cow", require("./routes/cow/index"));

//worker middleware
app.use("/api/worker", require("./routes/worker/index"));

//finance middleware
app.use("/api/finance", require("./routes/finance/index"));






app.listen(PORT, (err) => {
  if (err) throw err;
  console.log("server is up and running 🚀");
});
