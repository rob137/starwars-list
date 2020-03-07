import React from 'react';
import { createClient, Provider, useQuery } from 'urql';

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
  const [result] = useQuery({
    query: getAllFilms,
  });

  if (result.fetching) return <div>'Loading...'</div>;
  if (result.error) return <div>'Oh no!'</div>;
  const { allFilms } = result.data;
  return (
    <ul>
      {allFilms.map((film: any, key: number) => (
        <li key={key}>
          {film.title} - {new Date(film.releaseDate).getUTCFullYear()}
        </li>
      ))}
    </ul>
  );
};
