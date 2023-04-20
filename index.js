const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const route = require("./src/routes/route");
const multer = require("multer");
const mongoose = require("mongoose");
app.use(bodyparser.json());
app.use(multer().any());
var cors = require("cors");

app.use(cors());

app.use(bodyparser.urlencoded({ extended: true }));

mongoose
  .connect(
    "mongodb+srv://DeeptirthaMukherjee:QYKI3k8QSKC4I7FZ@cluster1.khatgm1.mongodb.net/project1-db?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  )

  .then(() => console.log("connected"))
  .catch((err) => console.log(err.msg));

app.use("/", route);
app.listen(process.env.PORT || 4000, function () {
  console.log("running at " + (process.env.PORT || 4000));
});
