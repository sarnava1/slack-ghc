var conString = "mongodb://anumeha:systers2018@ds217131.mlab.com:17131/demo-inviter"

var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var nodeMailer = require('nodemailer');
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
 mongoose.connect(conString, { useMongoClient: true }, () => {
    console.log("DB is connected");
});
 var nameSchema = new mongoose.Schema({
    name: String,
    email: String
});
var User = mongoose.model("User", nameSchema);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/main.html");
});

app.post("/addname", (req, res) => {
    var myData = new User(req.body);
    myData.save()
        .then(item => {
            res.send("Name saved to database");
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
        let transporter = nodeMailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
              user: 'anumehaagrawal29@gmail.com',
              pass: ''
          }
      });
      let mailOptions = {
          from: '"Anuuzen" <anumehaagrawal29@gmail.com>', // sender address
          to: req.body.email, // list of receivers
          subject: req.body.name, // Subject line
          text: 'Hell', // plain text body
          html: '<b>NodeJS Email Tutorial</b>' // html body
      };

      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message %s sent: %s', info.messageId, info.response);
              res.render('index');
          });

});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});