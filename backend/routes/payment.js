// routes/payment.js
const express = require("express");
const Stripe = require("stripe");
const router = express.Router();



router.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;
  
  
  
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "rub", // или "usd", в зависимости от нужной валюты
      payment_method_types: ["card"],
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Stripe error", error);
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;