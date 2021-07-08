const express = require("express");
// const request = require("request");
const mailchimp = require('@mailchimp/mailchimp_marketing');
const http = require("http");
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({
  extended: false
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

mailchimp.setConfig({
  apiKey: "614dddbe11aa7f29bc6923723e376f8a-us6",
  server: "us6"
});

app.post("/", function(req, res) {
  const formData = req.body;
  // console.log(data);
  const firstName = formData["First Name"];
  const lastName = formData["Last Name"];
  const email = formData.Email;
  const data = {
    email_address: email,
    status: "subscribed",
    merge_fields: {
      FNAME: firstName,
      LNAME: lastName
    }
  };
  const jsonData = JSON.stringify(data);
  async function run() {
    const response = await mailchimp.lists.addListMember("dcc74014f0", jsonData).then(
      function(responses) {
        res.sendFile(__dirname + "/success.html");
      }).catch(
      function(responses) {
        res.sendFile(__dirname + "/failure.html");
      });
  };
  run();
});
app.listen(3000, function(req, res) {
  console.log("Server Started listening at port 3000");
});
