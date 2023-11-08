import { ResponseError } from "../error/response-error.js";
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
    mypokemonService.prob50Percent();
    res.status(200).json({
      message: "Gotcha, you got new pokemon.",
    });
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

    const result = await mypokemonService.update(uid, body);
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
    await mypokemonService.remove(req.params.uid);
    res.status(200).json({
      message: "Successfully release.",
    });
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
