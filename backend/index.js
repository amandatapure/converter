var docxConverter = require("docx-pdf");
const express = require("express");
const multer = require("multer");
const cors = require('cors');
var path = require("path");

const bodyparser = require("body-parser");

const app = express();
app.use(cors());
app.use(express.static("uploads"));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file,req,'checking file exist or not')
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    console.log(file,'checking file exist or not')
    cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  },
});

var upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/docxtopdf", upload.single("file"), (req, res) => {
  try {
    console.log(req,'checking')
    let outputpath = Date.now() + "output.pdf";
    docxConverter(req.file.path, outputpath, function (err, result) {
      if (err) {
        console.log(err);
      }
      res.download(outputpath,(err) => {
          if(err){
            return res.status(501).send(err.message);
          }
        })
      });
      // res.send('okay')
    } catch (error) {
      console.log(error.message)
      return res.status(501).send(error.message);
  }
});

app.listen(5000, () => {
  console.log("App is listening on port 5000");
});