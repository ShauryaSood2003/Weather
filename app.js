const express=require("express");
const https=require("https");

const app=express();


app.use(express.urlencoded());

const info=require(__dirname+"/info.txt");
console.log(info);

app.get("/",function(req,res){
      res.sendFile(__dirname + "/index.html");


});


app.post("/",function(req,res){
  let country=req.body.country;
  const url=info+country;
  https.get(url,function(response){

    response.on("data",function(data){
      const WeatherData=JSON.parse(data);

      const temp=WeatherData.main.temp;
      const weatherDescription=WeatherData.weather[0].description;
      const icon=WeatherData.weather[0].icon;
      const imgurl="https://openweathermap.org/img/wn/"+ icon +"@2x.png";

      console.log(temp);
      console.log(weatherDescription);

      res.write("<h1>The weather in "+country+" is "+ temp +" degree celcius</h1>");
      res.write("<h1>The current weather is " +weatherDescription+"</h1>");
      res.write("<img src="+imgurl+">");

      res.send();

    });
  });

});

app.listen(3000,function(){
  console.log("server is running");
});
