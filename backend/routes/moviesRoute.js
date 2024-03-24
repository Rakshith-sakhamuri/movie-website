import express from 'express';
import { Movie } from '../models/movieModel.js';


const router = express.Router();

// Route for Save a new Movie
router.post('/', async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.language ||
      !request.body.releaseYear ||
      !request.body.director ||
      !request.body.rating
    ) {
      return response.status(400).send({
        message: 'Send all required fields',
      });
    }
    const newMovie = {
      title: request.body.title,
      language: request.body.language,
      releaseYear: request.body.releaseYear,
      director: request.body.director,
      rating: request.body.rating,
    };

    const movie = await Movie.create(newMovie);

    return response.status(201).send(movie);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});
router.get('/', async (request, response) => {
  try {
    const { title, language, director, rating } = request.query;
    const filter = {};

    // Modify releaseYear filter to handle the range
    const { min, max } = request.query.releaseYear || {};
    if (min && max) {
      filter.releaseYear = { $gte: parseInt(min, 10), $lte: parseInt(max, 10) };
    } else if (min) {
      filter.releaseYear = { $gte: parseInt(min, 10) };
    } else if (max) {
      filter.releaseYear = { $lte: parseInt(max, 10) };
    }

    // Add title, language, director, and rating filters if provided
    if (title) {
      filter.title = { $regex: new RegExp(title, 'i') };
    }
    if (language) {
      filter.language = { $regex: new RegExp(language, 'i') };
    }
    if (director) {
      filter.director = { $regex: new RegExp(director, 'i') };
    }

    if(rating) {
      filter.rating = {$gte: parseFloat(rating, 10)}
    }

    const movies = await Movie.find(filter);

    return response.status(200).json({
      count: movies.length,
      data: movies,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});


// Route for Get One Movie from database by id
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const movie = await Movie.findById(id);

    return response.status(200).json(movie);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Update a Movie
router.put('/:id', async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.language ||
      !request.body.releaseYear ||
      !request.body.director ||
      !request.body.rating
    ) {
      return response.status(400).send({
        message: 'Send all required fields',
      });
    }

    const { id } = request.params;

    const result = await Movie.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: 'Movie not found' });
    }

    return response.status(200).send({ message: 'Movie updated successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Delete a movie
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Movie.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: 'Movie not found' });
    }

    return response.status(200).send({ message: 'Movie deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
