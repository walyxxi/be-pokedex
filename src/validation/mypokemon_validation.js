import Joi from "joi";

const createMyPokemon = Joi.object({
  id: Joi.number().positive().required(),
  name: Joi.string().max(50).required(),
  nickname: Joi.string().max(100).required(),
});

const editMyPokemon = Joi.object({
  id: Joi.number().positive().required(),
  name: Joi.string().max(50).required(),
  nickname: Joi.string().max(100).required(),
  count_update: Joi.number().positive().required(),
});

const pokemonId = Joi.number().positive().required();

export { createMyPokemon, editMyPokemon, pokemonId };
