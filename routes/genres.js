const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Joi = require("joi");

const Genre = mongoose.model(
  "Genre",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    description: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
  })
);

// get all genres
router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

// Get single genres
router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre) return res.status(404).send("Oops! Genre can't be found");

  res.send(genre);
});

//post genres

// posting to collection of courses thus, we are using plural
router.post("/", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.message);

  let genre = new Genre({
    name: req.body.name,
    description: req.body.description,
  });

  genre = await genre.save();
  res.send(genre);
});

//post single genre
router.post("/:id", () => {});

//update a course
router.put("/:id", async (req, res) => {
  // const { error, value } = validateGenre(req.body.name);

  // if (error) return res.status(400).send(error.message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
    },
    { new: true }
  );

  if (!genre) {
    res.status(404).send("No course exist with this id: " + params);
    return;
  }

  res.send(genre);
});

//delete a course
router.delete("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);
  if (!genre) {
    res.status(404).send("No course exist with this id: " + params);
    return;
  }

  res.send(genre);
});

const validateGenre = (genre) => {
  // console.log(genre);

  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    description: Joi.string().min(5).max(50).required(),
  });

  // return 0;
  return schema.validate({ name: genre.name, description: genre.description });
};

module.exports = router;
