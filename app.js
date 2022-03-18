const { response } = require("express");
const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res)
{    
    res.sendFile(__dirname+"/index.html");

})
app.post("/",function(req,res)
{
    const Query=req.body.cityName;
    const key="a9f99c8a00dafe405f2e01071ff7553a";
    const unit="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+Query+"&appid="+key+"&units="+unit;
https.get(url,function(response)
{
    response.on("data",function(data)
{
    const weatherData=JSON.parse(data);
   var temp=weatherData.main.temp;
   var icon=weatherData.weather[0].icon;
   const imgUrl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
   var weatherDescription=weatherData.weather[0].description;
   res.write("<h1>The temperature in "+req.body.cityName+" is "+temp+" degree Celcius</h1>");
    res.write("<h2> The Weather is currently "+weatherDescription+"</h2>");
    res.write("<img src="+imgUrl+">");
    res.send();

})

})
})
/*
const Query="London";
    const key="a9f99c8a00dafe405f2e01071ff7553a";
    const unit="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+Query+"&appid"+key+"=&units="+unit;
https.get(url,function(response)
{
    console.log(response.statusCode);
    response.on("data",function(data)
{
    const weatherData=JSON.parse(data);
   var temp=weatherData.main.temp;
   var icon=weatherData.weather[0].icon;
   const imgUrl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
   var weatherDescription=weatherData.weather[0].description;
   res.write("<h1>The temperature in London is "+temp+" degree Celcius</h1>");
    res.write("<h2> The Weather is currently "+weatherDescription+"</h2>");
    res.write("<img src="+imgUrl+">");
    res.send();

})

})
*/
app.listen(3000,function()
{
    console.log("Server is Running");
});