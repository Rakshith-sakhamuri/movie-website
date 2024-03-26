import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';

const MoviesTable = ({ movies }) => {
  return (
    <table className='w-full border-separate border-spacing-2'>
      <thead>
        <tr>
          <th className='border border-slate-600 rounded-md'>No</th>
          <th className='border border-slate-600 rounded-md'>Title</th>
          <th className='border border-slate-600 rounded-md max-md:hidden'>
            Lanugage
          </th>
          <th className='border border-slate-600 rounded-md max-md:hidden'>
            Release Year
          </th>
          <th className='border border-slate-600 rounded-md max-md:hidden'>
            Director
          </th>
          <th className='border border-slate-600 rounded-md max-md:hidden'>
            Rating
          </th>
          <th className='border border-slate-600 rounded-md'>Operations</th>
        </tr>
      </thead>
      <tbody>
        {movies.map((movie, index) => (
          <tr key={movie._id} className='h-8'>
            <td className='border border-slate-700 rounded-md text-center'>
              {index + 1}
            </td>
            <td className='border border-slate-700 rounded-md text-center'>
              {movie.title}
            </td>
            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
              {movie.language}
            </td>
            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
              {movie.releaseYear}
            </td>
            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
              {movie.director}
            </td>
            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
              {movie.rating}
            </td>
            <td className='border border-slate-700 rounded-md text-center'>
              <div className='flex justify-center gap-x-4'>
                <Link to={`/movies/details/${movie._id}`}>
                  <BsInfoCircle className='text-2xl text-green-800' />
                </Link>
                <Link to={`/movies/edit/${movie._id}`}>
                  <AiOutlineEdit className='text-2xl text-yellow-600' />
                </Link>
                <Link to={`/movies/delete/${movie._id}`}>
                  <MdOutlineDelete className='text-2xl text-red-600' />
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MoviesTable;
