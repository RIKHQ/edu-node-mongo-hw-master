const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const url = "mongodb://127.0.0.1:27017/edu-node-mongo-hw"; // change this as needed

mongoose.connect(url, { useNewUrlParser: true });

const db = mongoose.connection;
db.once("open", (_) => {
  console.log("Database connected:", url);
});

db.on("error", (err) => {
  console.error("connection error:", err);
});

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

// The method of the root url. Be friendly and welcome our user :)
router.get("/", function (req, res) {
  res.json({ message: "Welcome to the APOD app!" });
});

router.get("/favorite", function (req, res) {
  // TODO:

  Images.find().then((results)  => {

  res.json({ results });
});
});


router.post("/add", function (req, res) {
  // TODO:

  const url = req.body.image_url;
  const date = req.body.date;
  const newImage = new Images({
    date: date,
    image_url: url,
  })
  newImage.save(( error, doc ) => {
    if (error) {

      res.json({ status: "failure"})

      console.log("failure");

    } else {

      res.json({ status: "sucess"})

      console.log("sucess");
      
      res.json({
        date: date,
        image_url: url,
      });
    }
  });
});



router.post("/delete", function (req, res) {
  // TODO:

  const date = req.body.date;

   Images.findOneAndDelete({ date: date }).then(() => {
    res.json({ message: "delete" });
  });
});

app.use("/api", router); // API Root url at: http://localhost:8080/api

app.listen(port);
console.log("Server listenning on port " + port);
