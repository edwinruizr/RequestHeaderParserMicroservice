var express = require('express');
var os = require('os');
var app = express();
app.use('/',function(req,res){
    //req.header('x-forwarded-for') in case they are using a proxy
    var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
    var language = req.headers["accept-language"];
    var languageArray = language.split(",");
    language = languageArray[0];
    var agent = req.headers["user-agent"];
    //bottom line gets only whats inside the parenthesis
    var os = agent.substring(agent.indexOf("(")+1,agent.indexOf(")"));
    
    var object = {};
    
    object["ipaddress"] = ip;
    object["language"] = language;
    object["software"] = os;
    //let's send them their info ;)
    res.json(object);
    res.end();
});


app.listen(process.env.PORT, process.env.IP,function () {
  console.log('Go to Window > Share > open Application!');
});