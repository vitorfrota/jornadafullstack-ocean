import { Router } from "express";
const routes = Router();

let scores = [];

routes.get("/", (req, res) => {
  res.send("Hello Mario!");
});

routes.get("/scores", (req, res) => {
  res.json({
    scores: scores,
  });
});

routes.delete("/scores", (req, res) => {
  scores = [];

  res.status(200).json({
    message: "All scores deleted!",
  });
});

routes.post("/scores", (req, res) => {
  const { name, score } = req.body;

  if (!name || !score) {
    return res.status(400).json({
      message: "You must fill all fields",
    });
  }

  scores.push({
    id: scores.length + 1,
    name,
    score,
  });

  return res.status(200);
});

export { routes };
