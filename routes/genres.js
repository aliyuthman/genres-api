const express = require("express");
const router = express.Router()

// const Joi = require("joi");


const genres = [
  {
    id: 1,
    name: "Action",
    description:
      "Movies and shows filled with thrilling adventures and intense sequences.",
  },
  {
    id: 2,
    name: "Comedy",
    description: "Entertainment that aims to amuse and provoke laughter.",
  },
  {
    id: 3,
    name: "Drama",
    description:
      "Emotional and impactful storytelling that explores human experiences.",
  },
  {
    id: 4,
    name: "Science Fiction",
    description:
      "Speculative fiction that often involves futuristic concepts and advanced technology.",
  },
  {
    id: 5,
    name: "Fantasy",
    description:
      "Imaginary worlds, magical elements, and fantastical creatures.",
  },
];


// get all genres
router.get("/", (req, res) => {
  res.send(genres);
});

// Get single genres
router.get("/:id", (req, res) => {
  const params = parseInt(req.params.id);

  const genre = genres.find((genreObj) => genreObj.id === params);
  if (!genre) return res.status(404).send("Oops! Genre can't be found");

  res.send(genre);
});

//post genres
router.post("/", () => {});

//post single genre
router.post("/:id", () => {});

//update a course
router.put("/:id", () => {});

//delete a course
router.delete("/:id", () => {});



module.exports = router
