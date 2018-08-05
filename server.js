var conString = "mongodb://anumeha:systers2018@ds217131.mlab.com:17131/demo-inviter";
var express = require("express");
var app = express();
const PORT = process.env.PORT || 5000
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var nodeMailer = require("nodemailer");
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
 mongoose.connect(conString,  () => {
    
});
 var nameSchema = new mongoose.Schema({
    name: String,
    created:  {type: Date, default: Date.now},
});
var User = mongoose.model("User", nameSchema);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/main.html");
});

app.post("/addname", (req, res) => {
    var myData = new User(req.body);
    myData.save()
        .then(item => {

            res.sendFile(__dirname + "/response.html");
        })

        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
        let transporter = nodeMailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
              user: "communitystaff@anitab.org",
              pass: ""
          }
      });
      let mailOptions = {
          from: "<communitystaff@anitab.org>", // sender address
          to: req.body.name, // list of receivers
          subject: "Join the GHC slack channel !", // Subject line
          text: "Hell", // plain text body
          html: '<img src ="http://abetteruserexperience.com/wp-content/uploads/2016/07/slack.png" > <br> <br><br><h1> Join GHC18 on Slack</h1><br><img src="https://ci5.googleusercontent.com/proxy/fyAoFvPyo0eYUKe4_VolitANLFrpYnGlA9dPRAn9Thn2P-RtFZBrniNkAu7FEmEg_j-XJ5-p40WabZ2smDC0Ava2DFzgnTXUyxPRRi5doXPnr-vKqfniYrZ7BdVMgjXh-2uPUhhLM3EK5qWWF6YjgV0n2yqQ0Q0u8Om6v6mWM0eh=s0-d-e1-ft#https://s3-us-west-2.amazonaws.com/slack-files2/avatars/2017-10-03/251165127045_b5f26f2478857e3c6557_88.jpg"><a href="https://ghc17.slack.com/"><h2>Click here to join the slack channel</h2></a>'
      };

      transporter.sendMail(mailOptions, (error, info) => {

          if (error) {
              return console.log(error);
          }
          console.log('Message %s sent: %s', info.messageId, info.response);
              res.render('index');
});


});

app.listen(PORT, () => {
    
});