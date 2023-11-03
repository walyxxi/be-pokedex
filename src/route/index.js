import express from "express";
import mypokemonController from "../controller/mypokemon_controller.js";

const routes = express.Router();

routes.get("/", (req, res) => {
  res.send("BE Pokedex");
});
routes.get("/api/mypokemon", mypokemonController.get);
routes.get("/api/mypokemon/catch", mypokemonController.catchPokemon);
routes.post("/api/mypokemon", mypokemonController.create);
routes.put("/api/mypokemon/rename/:uid", mypokemonController.update);
routes.delete("/api/mypokemon/release/:uid", mypokemonController.remove);

export { routes };
