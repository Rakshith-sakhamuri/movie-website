import express from 'express';
import { Book } from '../models/movieModel.js';


const router = express.Router();

// Route for Save a new Book
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
    const newBook = {
      title: request.body.title,
      language: request.body.language,
      releaseYear: request.body.releaseYear,
      director: request.body.director,
      rating: request.body.rating,
    };

    const book = await Book.create(newBook);

    return response.status(201).send(book);
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
      filter.rating = {$gte: parseInt(rating, 10)}
    }

    const books = await Book.find(filter);

    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});


// Route for Get One Book from database by id
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const book = await Book.findById(id);

    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Update a Book
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

    const result = await Book.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: 'Book not found' });
    }

    return response.status(200).send({ message: 'Book updated successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Delete a book
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: 'Book not found' });
    }

    return response.status(200).send({ message: 'Book deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
