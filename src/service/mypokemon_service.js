import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import {
  createMyPokemon,
  editMyPokemon,
  pokemonId,
} from "../validation/mypokemon_validation.js";
import { validate } from "../validation/validation.js";

const create = async (body) => {
  const pokemon = validate(createMyPokemon, body);

  return prismaClient.myPokemon.create({
    data: pokemon,
    select: {
      id: true,
      name: true,
      nickname: true,
    },
  });
};

const update = async (uid, body) => {
  const pokemon = validate(editMyPokemon, body);

  return prismaClient.myPokemon.update({
    where: {
      uid: parseInt(uid),
    },
    data: {
      nickname: pokemon.nickname,
      count_update: pokemon.count_update,
    },
    select: {
      id: true,
      name: true,
      nickname: true,
    },
  });
};

const remove = async (uid) => {
  const id = validate(pokemonId, uid);

  const totalInDatabase = await prismaClient.myPokemon.count({
    where: {
      uid: id,
    },
  });

  if (totalInDatabase !== 1) {
    throw new ResponseError(404, "Pokemon is not found.");
  }

  return prismaClient.myPokemon.delete({
    where: {
      uid: id,
    },
  });
};

export default { create, update, remove };
