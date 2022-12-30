const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
require("colors");

const app = express();

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uugevwk.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    //database collection
    const tasksCollection = client.db("tasksManager").collection("myTasks");

    // get data from the mongodb server
    app.get("/myTasks", async (req, res) => {
      const query = {}; // use query to get all data from the database
      const options = await tasksCollection.find(query).toArray();
      res.send(options);
    });

    // post tasks 
    app.post("/tasks", async (req, res) => {
      const tasks = req.body;
      console.log(tasks);
      const result = await tasksCollection.insertOne(tasks);
      res.send(result);
    });


  } finally {
  }
}
run().catch(console.dir);

app.get("/", async (req, res) => {
  res.send("Tasks Manager Server is Running");
});

app.listen(port, () =>
  console.log(`Task Manager Running on port ${port}`.cyan.bold)
);
