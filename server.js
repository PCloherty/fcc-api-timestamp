// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//check funtion to make sure the date provided is valid
function isValid(date){
  let check = new Date(date)
  if (!check.getTime()||!check.toUTCString()){
    return false;
  }else{
    return true;
  }
}

//time api
app.get("/api/timestamp/:date_string?", (req,res)=>{
        //get the provided date in :date_sting
        let date= req.params.date_string
        console.log(typeof (date))
        
        //if nothing is in date then respond with today
        if(date==null){
          let now = new Date()
          res.json({"unix":now.getTime(),"utc":now.toUTCString()});
        }  
        if (/\d{5,}/.test(date)){
          date=parseInt(date)  
        }
        if (isValid(date)){
          let request= new Date(date);
          res.json({"unix":request.getTime(),"utc":request.toUTCString()});
        } else {
          res.json({"error" : "Invalid Date" });
        } 
})
          

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});