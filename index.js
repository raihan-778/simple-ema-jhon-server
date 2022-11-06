const express = require("express")
const cors = require("cors")
const { MongoClient, ServerApiVersion } = require("mongodb")

require("dotenv").config()
const app = express()

const port = process.env.PORT || 5000

//middleware
app.use(cors())
app.use(express.json())

/*
 mongodb 
 user:ema-jhon-db
 password:ULNiRKbcnozdlQGA
  */

//mongodb connection setup with database

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.jz1qjld.mongodb.net/?retryWrites=true&w=majority`

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
})
const run = async () => {
  try {
    const productCollection = client.db("emaJhon").collection("products")

    app.get("/products", async (req, res) => {
      const page = req.query.page
      const size = req.query.size
      console.log(page, size)
      const query = {}

      const cursor = productCollection.find(query)
      const products = await cursor.toArray()
      const count = await productCollection.estimatedDocumentCount()
      res.send({ count, products })
    })
  } finally {
  }
}
run().catch((err) => console.error(err))

app.get("/", (req, res) => {
  res.send("Simple Ema-john server is running")
})

app.listen(port, () => {
  console.log(`Ema-jhon server is running on port ${port}`)
})
