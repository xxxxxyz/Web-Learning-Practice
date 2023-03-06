
//jshint esversion: 6


const request = require('request');
const express = require('express');
const bodyParser = require('body-parser');
const https = require('http');

const client = require("@mailchimp/mailchimp_marketing");

client.setConfig ({
    apiKey: "d92e294a1a3c79201df2062882cfa5f7-us21",
    server:"us21"
});

const app = express();

app.use("/public", express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
    res.sendFile(__dirname + '/signup.html');
});


app.post("/", function(req,res){

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    
    const subscribingUser = {firstName: firstName, lastName: lastName, email: email};

    const run = async () => {
        const response = await client.lists.addListMember("f142b6589a", {
          email_address: subscribingUser.email,
          status: "subscribed",
          merge_fields: {
              FNAME: subscribingUser.firstName,
              LNAME: subscribingUser.lastName
          }
        });
        console.log(response); // (optional) 
    };
    // const jsonData = JSON.stringify(data);

    // const url =  "https://us21.api.mailchimp.com/3.0/lists?fields=zoe,f142b6589a";

    // const options = {
    //     method: "POST",
    //     auth:"zoeNews:d92e294a1a3c79201df2062882cfa5f7-us21"
    // }

    // const request = https.request(url, options, function(response){
    //     response.on("data",function(data){
    //         console.log(JSON.parse(data));
    //     })
    // });

    // request.write(data);
    // request.end();

    run();

    

});


app.listen(3000, function(req,res){
    console.log('server is running on port 3000');
});



// api key d92e294a1a3c79201df2062882cfa5f7-us21
//audience ID f142b6589a
