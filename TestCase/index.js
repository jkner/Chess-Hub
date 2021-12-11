const express = require("express");
const bodyParser = require("body-parser");

fs = require('fs');
  
// New app using express module
const app = express();
app.use(bodyParser.urlencoded({
    extended:true
}));
  
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});
  
app.post("/", function(req, res) {
  var num1 = Number(req.body.num1);
  var num2 = Number(req.body.num2);

  fs.readFile('./rankings/rankings.json', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    console.log(data);

    let rankingJson = [1,2,3,4,5,6];  

    //updates ranking based on the winner
    updateRanking(rankingJson);

    writeToFile(rankingJson);

    res.send("Current Leaderboard" + data);
  });

    
  
});
  
app.listen(3000, function(){
  console.log("server is running on port 3000");
})

function writeToFile(rankingArray){
    fs.writeFile('./rankings/rankings.json', "[" + rankingArray + "]", function (err) {
        if (err) throw err;
        console.log('Saved!');
      });

    return;
}

function updateRanking(rankingArray){
    let updatedRankingArray;

        
    
    return updatedRankingArray;

}




