import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle, BiShow } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { useState } from 'react';
import MovieModal from './MovieModal';

const MovieSingleCard = ({ movie }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className='border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl'>
      <h2 className='absolute top-1 right-2 px-4 py-1 bg-red-300 rounded-lg'>
        {movie.publishYear}
      </h2>
      <div className='flex justify-start items-center gap-x-2'>
        <PiBookOpenTextLight className='text-red-300 text-2xl' />
        <h2 className='my-1'>{movie.title}</h2>
      </div>
      <div className='flex justify-start items-center gap-x-2'>
        <PiMOpenTextLight className='text-red-300 text-2xl' />
        <h2 className='my-1'>{movie.language}</h2>
      </div>
      <div className='flex justify-start items-center gap-x-2'>
        <BiUserCircle className='text-red-300 text-2xl' />
        <h2 className='my-1'>{movie.author}</h2>
      </div>
      <div className='flex justify-between items-center gap-x-2 mt-4 p-4'>
        <BiShow
          className='text-3xl text-blue-800 hover:text-black cursor-pointer'
          onClick={() => setShowModal(true)}
        />
        <Link to={`/movies/details/${movie._id}`}>
          <BsInfoCircle className='text-2xl text-green-800 hover:text-black' />
        </Link>
        <Link to={`/movies/edit/${movie._id}`}>
          <AiOutlineEdit className='text-2xl text-yellow-600 hover:text-black' />
        </Link>
        <Link to={`/movies/delete/${movie._id}`}>
          <MdOutlineDelete className='text-2xl text-red-600 hover:text-black' />
        </Link>
      </div>
      {showModal && (
        <MovieModal movie={movie} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default MovieSingleCard;
