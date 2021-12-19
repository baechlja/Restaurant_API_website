// express app
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({extended:true}));

// connect to mongobd
const dbUrl= "mongodb+srv://FusionEat:FusionEat@clusterwds20a.h2osc.mongodb.net/ClusterWDS20A"

mongoose.connect(dbUrl,{useNewUrlParser:true}, {useUnifiedTopology:true});

// create a data schema
const Schema = mongoose.Schema;
const orderSchema = new Schema({
    customername: {
        type:String,
        required:true
    },
    reservetime:{
        type:Date,
        required:true
    },
    tel:{
        type: String,
        required:true
    }, 
},{timestamp:true});

const Order = mongoose.model("Order", orderSchema);


app.get("/", function(req,res) {
    res.sendFile(__dirname + "/indexDB.html");
})

app.post("/", function(req,res){
    let newOrder = new Order({
        customername: req.body.customername,
        reservetime: req.body.reservetime,
        tel:req.body.tel
    });
    newOrder.save();
    res.redirect("/");
})

app.listen(3000, function() {
    console.log("server is running on 3000");
})


/* 
1. Kommando in Terminal eingeben
cd desktop 
cd RestaurantProject
npm init
npm i express mongoose body-parser
npx nodemon mongoDB.js

2. http://localhost:3000/ öffen 
Bestellung eingeben und abschicken 

3. https://cloud.mongodb.com/v2/61a62d6661f41678a4d8e404#metrics/replicaSet/61a62e6d077eb037f7b6d8ba/explorer/ClusterWDS20A/orders/find
oder 
in MongoDB compass App/ New Connection/ mongodb+srv://FusionEat:FusionEat@clusterwds20a.h2osc.mongodb.net/clusterwds20a  eingeben 

Bestellung in Cloud Mongodb / MongoDB compass einsehen
*/