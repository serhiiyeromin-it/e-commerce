// routes/payment.js
require("dotenv").config();

const express = require("express");
const Stripe = require("stripe");
const router = express.Router();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;
  
  
  
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "rub", // oder "usd", abhängig von der Währung, die Sie benötigen
      payment_method_types: ["card"],
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.log("Stripe key loaded:", process.env.STRIPE_SECRET_KEY);
    console.error("Stripe error", error);
    res.status(500).send({ error: error.message });
  }
});

console.log("Stripe key loaded:", process.env.STRIPE_SECRET_KEY);

module.exports = router;