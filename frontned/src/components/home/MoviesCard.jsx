import MovieSingleCard from './MovieSingleCard';

const MoviesCard = ({ movies }) => {
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {movies.map((item) => (
        <MovieSingleCard key={item._id} movie={item} />
      ))}
    </div>
  );
};

export default MoviesCard;
