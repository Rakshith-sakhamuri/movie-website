import express from 'express';
import mongoose from 'mongoose';
import moviesRoute from './routes/moviesRoute.js';
import cors from 'cors';
import dotenv from 'dotenv'
dotenv.config();

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY 
app.use(cors());
app.get('/', (request, response) => {
  console.log(request);
  return response.status(234).send('Backend Home');
});

app.use('/movies', moviesRoute);
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
