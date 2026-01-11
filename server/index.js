const express = require("express")
const app = express()
const cors = require("cors")
const port = 5000

app.use(express.json())
app.use(cors())

app.get("/", (req,res)=>{
    res.json("hello mongo")
})

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://shobana:12345@cluster0.geady3q.mongodb.net/?appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const productCollection = client.db("Ecom").collection("Cloth")

    app.post("/uploadData", async(req,res)=>{
        const data = req.body
        const result = await productCollection.insertOne(data)
        res.send(result)
    })

    app.get("/getdata", async(req,res)=>{
        const data = productCollection.find()
        const result = await data.toArray()
        res.send(result)
    })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, ()=>{
    console.log(`server listening on port http://localhost:${port}`)
})
