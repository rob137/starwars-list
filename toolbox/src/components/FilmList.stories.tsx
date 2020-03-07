import React, { useState } from 'react';
import { createClient, Provider, useQuery } from 'urql';
import loadingGif from './loading.gif';
import errorGif from './error.gif';

type Sorter = 'title' | 'releaseDate' | '';

interface Film {
  title: string;
  releaseDate: string;
}

const client = createClient({
  url: 'https://cors-anywhere.herokuapp.com/swapi.graph.cool',
});

export default {
  title: 'Film List',
};

const getAllFilms = `
query GetAllFilms
  {
    allFilms {
      title
      releaseDate
    }
  }
`;

export const Default = () => {
  return (
    <Provider value={client}>
      <FilmListComponent />
    </Provider>
  );
};

const FilmListComponent = () => {
  const [episode, setEpisode] = useState('');
  const [sorter, setSorter] = useState<Sorter>('');
  const [order, setOrder] = useState('');
  const [result] = useQuery({
    query: getAllFilms,
  });

  if (result.fetching)
    return (
      <div className="p-6 text-gray-700 flex items-center flex-col ">
        <img src={loadingGif} alt="loading" />
        Loading...
      </div>
    );
  if (result.error)
    return (
      <div className="p-6 text-gray-700 flex items-center text-center flex-col">
        <img src={errorGif} alt="error" />
        Encountered an error loading the films! Please try again later.
      </div>
    );

  const { allFilms } = result.data;
  const filteredFilms = episode
    ? allFilms.filter((film: Film) =>
        film.title.toLowerCase().includes(episode.toLowerCase()),
      )
    : allFilms;

  if (sorter && order) {
    filteredFilms.sort((a: Film, b: Film) => {
      if (order === 'ascending') {
        return a[sorter] < b[sorter] ? -1 : 1;
      } else {
        return a[sorter] > b[sorter] ? -1 : 1;
      }
    });
  }

  return (
    <div className="p-6 text-gray-700">
      <input
        type="text"
        className="mr-2 bg-gray-200 rounded-sm p-1 w-2/5"
        placeholder="Filter by film name"
        onChange={(e) => setEpisode(e.target.value)}
      />
      <select
        className="mr-2 p-1 bg-gray-100 cursor-pointer"
        onChange={(e) => setSorter(e.target.value as Sorter)}
      >
        <option value="">--Sort films by--</option>
        <option value="title">Title</option>
        <option value="releaseDate">Release date</option>
      </select>
      <select
        className="mr-2 p-1 bg-gray-100 cursor-pointer"
        onChange={(e) => setOrder(e.target.value)}
      >
        <option value="">--Order by--</option>
        <option value="ascending">Ascending</option>
        <option value="descending">Descending</option>
      </select>
      <ul className="mt-4">
        {filteredFilms.map((film: Film, key: number) => (
          <li key={key}>
            {film.title} -{' '}
            <span className="italic">
              {new Date(film.releaseDate).getUTCFullYear()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
