import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowMovie = () => {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(import.meta.env.VITE_API_URL+`/movies/${id}`)
      .then((response) => {
        setMovie(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>View Movie details</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Id</span>
            <span>{movie._id}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Title</span>
            <span>{movie.title}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Language</span>
            <span>{movie.language}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Release Year</span>
            <span>{movie.releaseYear}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Create Time</span>
            <span>{new Date(movie.createdAt).toString()}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Last Update Time</span>
            <span>{new Date(movie.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowMovie;
