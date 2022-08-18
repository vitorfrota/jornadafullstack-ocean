import "dotenv/config";
import express from "express";
import { MongoClient } from "mongodb";

const MONGO_URL = "mongodb://localhost:27017";
const MONGO_DB_NAME = "jornada-fullstack";

async function main() {
  const client = await MongoClient.connect(MONGO_URL);
  const db = client.db(MONGO_DB_NAME);
  const collection = db.collection("scores");

  const app = express();

  app.use(express.json());

  app.get("/", (req, res) => {
    res.send("Hello Mario!");
  });

  app.get("/scores", async (req, res) => {
    const items = await collection
      .find()
      .sort({ scores: -1 })
      .limit(10)
      .toArray();

    res.json({
      scores: items,
    });
  });

  app.post("/scores", async (req, res) => {
    try {
      const { name, score } = req.body;

      if (!name || !score) {
        return res.status(400).json({
          message: "You must fill all fields",
        });
      }

      const newItem = {
        name,
        score,
      };

      await collection.insertOne(newItem);

      return res.json(newItem).status(200);
    } catch (e) {
      return res.status(204);
    }
  });

  app.listen(process.env.PORT, () => {
    console.log(`🚀 Server is running in port: ${process.env.PORT}`);
  });
}

main();
