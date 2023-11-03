import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import {
  createMyPokemonValidation,
  editMyPokemonValidation,
  getMyPokemonValidation,
} from "../validation/mypokemon_validation.js";
import { validate } from "../validation/validation.js";

const get = async (offset, limit) => {
  const skip = offset * limit;

  const [data, count] = await prismaClient.$transaction([
    prismaClient.myPokemon.findMany({
      skip: skip,
      take: limit,
      select: {
        uid: true,
        id: true,
        name: true,
        nickname: true,
        count_update: true,
      },
    }),
    prismaClient.myPokemon.count(),
  ]);

  return {
    pagination: {
      offset,
      limit,
      total: count,
    },
    data,
  };
};

const create = async (body) => {
  const pokemon = validate(createMyPokemonValidation, body);

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
  const pokemon = validate(editMyPokemonValidation, body);

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
  const pokemonId = validate(getMyPokemonValidation, uid);

  const totalInDatabase = await prismaClient.myPokemon.count({
    where: {
      uid: pokemonId,
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

export default { get, create, update, remove };
