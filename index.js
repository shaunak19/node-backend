const express = require("express");
const app = express();
const cors = require("cors");
const mongodb = require("mongodb");
const mongoclient = mongodb.MongoClient;

const URL = "mongodb+srv://shaunakDas:admin123@cluster0.exlrt.mongodb.net/test"; 

app.use(express.json());
app.use(cors({
    origin: "*"
}))

var projects= [];

app.post("/student1", async function(req,res){
    try {
        //open the connection
        let conn = await mongoclient.connect(URL);

        //select the db
        let db= conn.db("students");

        //select the collection
        //do operation
        await db.collection("project").insertOne(req.body);
        
        //close the connection
        await conn.close()
        res.json({
            message:"Project Created"
        })
    } catch (error) {
        res.status(500).json({
            message: "Error"
        })
    }
})

app.get("/student2", async function(req,res){
    try {
        //open the connection
        let conn = await mongoclient.connect(URL);

        //select the db
        let db= conn.db("students");

        //select the collection
        //do operation
        projects = await db.collection("project").find().toArray();

        //close the connection
        await conn.close();

        res.json(projects);
    } catch (error) {
        res.status(500).json({
            message: "Error"
        })
    }
})

app.get("/student/:id",async function(req,res){
    try {
        //open the connection
        let conn = await mongoclient.connect(URL);

        //select the db
        let db= conn.db("students");

        //select the collection
        //do operation
        projects = await db.collection("project").findOne({_id:mongodb.ObjectId(req.params.id)})
        
        res.json(projects);
    } catch (error) {
        console.log(error)
        res.json({
            message: "there was an error"
        })
    }
})

app.put("/student/:id",async function(req,res){
    try {
        //open the connection
        let conn = await mongoclient.connect(URL);

        //select the db
        let db= conn.db("students");

        //select the collection
        //do operation
        await db.collection("project").findOneAndUpdate({_id:mongodb.ObjectId(req.params.id)},{$set:req.body})

        //close the connection
        await conn.close();

        res.json({
            message : "Updated"
        })
    } catch (error) {
        console.log(error)
    }
})

app.delete("/student/:id", async function(req,res){
    try {
        //open the connection
        let conn = await mongoclient.connect(URL);

        //select the db
        let db= conn.db("students");

        //select the collection
        //do operation
        await db.collection("project").findOneAndDelete({_id:mongodb.ObjectId(req.params.id)});

        //close the connection
        await conn.close();

        res.json({
            message: "Deleted"
        });
    } catch (error) {
        res.status(500).json({
            message: "error"
        })
    }
})

app.listen(process.env.PORT || 3000, function(){
    console.log(`Server is running in PORT ${process.env.port}`);
})