// jshint esversion: 6

const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
// const port = 3000;
const app = express();



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//semua file dan folder di dalam folder "public" terbaca dg express ( web jd dinamis : jangan lupa ruah href pada style.css dan src pada image logo)
app.use(express.static("public"));



app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html")
});


app.post("/", (req, res) => {

    let firstName = req.body.fName;
    let lastName = req.body.lName;
    let email = req.body.email;
    let data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    };
    let jsonData = JSON.stringify(data);
    let options = {
        url: "https://us7.api.mailchimp.com/3.0/lists/7f6b2a29b5",
        method: "POST",
        headers: {
            "Authorization": "masendhy ac4ef0e18f2ebde970ea40998e49c85c-us7"
        },
        body: jsonData
    };

    request(options, (error, response, body) => {
        if (error) {
            // console.log(error);
            res.sendFile(__dirname + "/failure.html")
        } else {
            // console.log(response.statusCode);
            if (response.statusCode === 200) {
                res.sendFile(__dirname + "/success.html")
            } else {
                res.sendFile(__dirname + "/failure.html")
            }
        }
    })


})

app.post("/success", (req, res) => {
    res.redirect("/");
})

app.post("/failure", (req, res) => {
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running on port 3000")
});

// app.listen(port, () => {
//     console.log(`Server is running on port http:localhost:${port}`)
// });



// API mailchimp
// ac4ef0e18f2ebde970ea40998e49c85c-us7

// List id
// 7f6b2a29b5