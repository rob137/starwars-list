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
  const [result] = useQuery({
    query: getAllFilms,
  });

  if (result.fetching) return <div>'Loading...'</div>;
  if (result.error) return <div>'Oh no!'</div>;
  const { allFilms } = result.data;
  let filteredFilms = allFilms;
  if (episode) {
    filteredFilms = allFilms.filter((film: any) =>
      film.title.includes(episode),
    );
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Filter by film name"
        onChange={(e) => setEpisode(e.target.value)}
      />
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
