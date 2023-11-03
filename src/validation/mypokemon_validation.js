import Joi from "joi";

const createMyPokemonValidation = Joi.object({
  id: Joi.number().positive().required(),
  name: Joi.string().max(50).required(),
  nickname: Joi.string().max(100).required(),
});

const editMyPokemonValidation = Joi.object({
  id: Joi.number().positive().required(),
  name: Joi.string().max(50).required(),
  nickname: Joi.string().max(100).required(),
  count_update: Joi.number().positive().required(),
});

const getMyPokemonValidation = Joi.number().positive().required();

export {
  createMyPokemonValidation,
  editMyPokemonValidation,
  getMyPokemonValidation,
};
