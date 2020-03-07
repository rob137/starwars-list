import React, { useState } from 'react';
import { createClient, Provider, useQuery } from 'urql';

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
  const [order, setOrder] = useState('ascending');
  const [result] = useQuery({
    query: getAllFilms,
  });

  if (result.fetching) return <div>'loading...'</div>;
  if (result.error) return <div>'Oh no!'</div>;

  const { allFilms } = result.data;
  const filteredFilms = episode
    ? allFilms.filter((film: any) => film.title.toLowerCase().includes(episode.toLowerCase()))
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
    <div>
      <input
        type="text"
        placeholder="Filter by film name"
        onChange={(e) => setEpisode(e.target.value)}
      />
      <select onChange={(e) => setSorter(e.target.value as Sorter)}>
        <option value="">--Sort films by--</option>
        <option value="title">Title</option>
        <option value="releaseDate">Release date</option>
      </select>
      <select onChange={(e) => setOrder(e.target.value)}>
        <option value="">--Order by--</option>
        <option value="ascending">Ascending</option>
        <option value="descending">Descending</option>
      </select>
      <ul>
        {filteredFilms.map((film: any, key: number) => (
          <li key={key}>
            {film.title} - {new Date(film.releaseDate).getUTCFullYear()}
          </li>
        ))}
      </ul>
    </div>
  );
};
