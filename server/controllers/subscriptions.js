const subscriptionRouter = require("express").Router();
const Subscription = require("../models/subscription");

subscriptionRouter.post("/", async (req, res, next) => {
  try {
    const { email } = req.body;

    const subscriber = new Subscription({
      email
    });

    await subscriber.save();

    res.status(201).json(subscriber);
  } catch (e) {
    next(e);
  }
});

module.exports = subscriptionRouter;
