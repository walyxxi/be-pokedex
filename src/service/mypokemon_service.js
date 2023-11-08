import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { fibonacci, isPrime, randomBoolean } from "../util/index.js";
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

const prob50Percent = () => {
  const random = randomBoolean();

  if (!random) {
    throw new ResponseError(400, "Opsss, you miss it, try again!");
  }

  return "Gotcha, you got new pokemon.";
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
  const pokemonId = validate(getMyPokemonValidation, uid);
  const pokemon = validate(editMyPokemonValidation, body);

  const totalInDatabase = await prismaClient.myPokemon.count({
    where: {
      uid: pokemonId,
    },
  });

  if (totalInDatabase !== 1) {
    throw new ResponseError(404, "Pokemon is not found.");
  }

  const getFibonacciNumber = fibonacci(body.count_update);
  let nickname = "";

  if (pokemon.count_update > 0) {
    const splitNick = pokemon.nickname.split("-");
    splitNick.splice(-1, 1, getFibonacciNumber);
    nickname = splitNick.join("-");
  } else {
    nickname += `${pokemon.nickname}-${getFibonacciNumber}`;
  }

  const data = {
    nickname: nickname,
    count_update: pokemon.count_update + 1,
  };

  return prismaClient.myPokemon.update({
    where: {
      uid: parseInt(uid),
    },
    data,
    select: {
      id: true,
      name: true,
      nickname: true,
      count_update: true,
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

  const randomNumber = Math.floor(Math.random() * 100);
  const isPrimeNumber = isPrime(randomNumber);

  const data = {
    number: randomNumber,
    isPrimeNumber,
  };

  if (!isPrimeNumber) {
    throw new ResponseError(400, "Unsuccessfully release, try again!");
  }

  return prismaClient.myPokemon.delete({
    where: {
      uid: pokemonId,
    },
  });
};

export default { get, create, update, remove, prob50Percent };
