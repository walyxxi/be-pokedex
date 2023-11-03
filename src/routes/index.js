import express from "express";

const routes = express.Router();

routes.route("/").get((req, res) => {
  res.send("BE Pokedex");
});

export { routes };
