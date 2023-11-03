import mypokemonService from "../service/mypokemon_service.js";
import { fibonacci, isPrime, randomBoolean } from "../util/index.js";

const get = async (req, res, next) => {
  try {
    const offset = parseInt(req.query.offset);
    const limit = parseInt(req.query.limit);

    const result = await mypokemonService.get(offset, limit);
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

const catchPokemon = (req, res, next) => {
  try {
    const random = randomBoolean();

    if (random) {
      res.status(200).json({
        message: "Gotcha, you got new pokemon.",
        data: true,
      });
    } else {
      res.status(400).json({
        message: "Opsss, you miss it, try again!",
        data: false,
      });
    }
  } catch (e) {
    next(e);
  }
};

const create = async (req, res, next) => {
  try {
    const body = req.body;
    const result = await mypokemonService.create(body);

    res.status(201).json({
      message: "Sucessfully create.",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const body = req.body;
    const uid = req.params.uid;

    const getFibonacciNumber = fibonacci(body.count_update);
    let nickname = "";

    if (body.count_update > 0) {
      const splitNick = body.nickname.split("-");
      splitNick.splice(-1, 1, getFibonacciNumber);
      nickname = splitNick.join("-");
    } else {
      nickname += `${body.nickname}-${getFibonacciNumber}`;
    }

    const newBody = {
      ...body,
      nickname,
      count_update: body.count_update + 1,
    };

    const result = await mypokemonService.update(uid, newBody);
    res.status(200).json({
      message: "Successfully rename.",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const randomNumber = Math.floor(Math.random() * 1000);
    const isPrimeNumber = isPrime(randomNumber);

    const data = {
      number: randomNumber,
      isPrimeNumber,
    };

    if (isPrimeNumber) {
      await mypokemonService.remove(req.params.uid);
      res.status(200).json({
        message: "Successfully release.",
        data,
      });
    } else {
      res.status(400).json({
        message: "Unsuccessfully release, try again!",
        data,
      });
    }
  } catch (e) {
    next(e);
  }
};

export default {
  get,
  catchPokemon,
  create,
  update,
  remove,
};
