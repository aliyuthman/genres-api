const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Joi = require("joi");

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    phone: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },

    isGold: {
      type: Boolean,
      default: false,
    },
  })
);

// get all genres
router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("name");
  res.send(customers);
});

// Get single genres
router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) return res.status(404).send("Oops! Genre can't be found");

  res.send(customer);
});

//post genres

// posting to collection of courses thus, we are using plural
router.post("/", async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.message);

  let customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold
  });

  customer = await customer.save();
  res.send(customer);
});

//post single genre
router.post("/:id", () => {});

//update a course
router.put("/:id", async (req, res) => {
  // const { error, value } = validateGenre(req.body.name);

  // if (error) return res.status(400).send(error.message);

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
    },
    { new: true }
  );

  if (!customer) {
    res.status(404).send("No course exist with this id: " + params);
    return;
  }

  res.send(customer);
});

//delete a course
router.delete("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndDelete(req.params.id);
  if (!customer) {
    res.status(404).send("No course exist with this id: " + params);
    return;
  }

  res.send(customer);
});

const validateCustomer = (customer) => {
  // console.log(genre);

  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    phone: Joi.string().min(5).max(50).required(),
    isGold: Joi.boolean()
  });

  // return 0;
  return schema.validate({ name: customer.name, phone: customer.description });
};

module.exports = router;
