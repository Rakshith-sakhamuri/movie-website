import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';

const FilterPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');

  const [titleFilter, setTitleFilter] = useState('');
  const [languageFilter, setLanguageFilter] = useState('');
  const [releaseYearFilter, setReleaseYearFilter] = useState({
    min: '',
    max: '',
  });
  const [directorFilter, setDirectorFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');

  useEffect(() => {
    setLoading(true);
    const filters = {
      title: titleFilter,
      language: languageFilter,
      releaseYear: releaseYearFilter,
      director: directorFilter,
      rating: ratingFilter,
    };
  
    const filteredFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== '' && value !== null)
    );
  
    axios
      .get(import.meta.env.VITE_API_URL+'/books', {
        params: filteredFilters,
      })
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [titleFilter, languageFilter, releaseYearFilter, directorFilter, ratingFilter]);
  

  return (
    <div className='p-4'>
      <div className='flex justify-center items-center gap-x-4'>
        <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'>
          <Link to='/'>
            Clear Filters
          </Link>
        </button>
      </div>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Movies List</h1>
        <Link to='/books/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>
      
      <div className='flex justify-between space-x-4'>
        <div className='flex flex-col'>
          <label className='text-lg text-gray-500'>Filter by Rating</label>
          <input
            type='text'
            value={ratingFilter}
            onChange={(e) => setRatingFilter(parseFloat(e.target.value) || '')}
            className='border-2 border-gray-500 px-4 py-2 w-full'
            step='any' // Add this line
          />
        </div>

        <div className='flex flex-col'>
          <label className='text-lg text-gray-500'>Filter by Language</label>
          <input
            type='text'
            value={languageFilter}
            onChange={(e) => setLanguageFilter(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
      </div>

      <div className='flex justify-between space-x-4 mt-4'>
        
        <div className='flex flex-col'>
          <label className='text-lg text-gray-500'>Filter by Release Year (Range)</label>
          <div className='flex space-x-2'>
            <input
              type='text'
              placeholder='Min Year'
              value={releaseYearFilter.min}
              onChange={(e) => setReleaseYearFilter({ ...releaseYearFilter, min: e.target.value })}
              className='border-2 border-gray-500 px-4 py-2'
            />
            <input
              type='text'
              placeholder='Max Year'
              value={releaseYearFilter.max}
              onChange={(e) => setReleaseYearFilter({ ...releaseYearFilter, max: e.target.value })}
              className='border-2 border-gray-500 px-4 py-2'
            />
          </div>
        </div>

        <div className='flex flex-col'>
          <label className='text-lg text-gray-500'>Filter by Director</label>
          <input
            type='text'
            value={directorFilter}
            onChange={(e) => setDirectorFilter(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>

        
      </div>

      {loading ? (
        <Spinner />
      ) : showType === 'table' ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default FilterPage;
