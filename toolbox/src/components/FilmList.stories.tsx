import React from 'react';

export default {
  title: 'Film List',
};

export const Default = () => {
  // this is where you should put urql Provider
  return <FilmListComponent />;
};

const FilmListComponent = () => {
  // this is where you should put urql useQuery
  return <div>Edit me to see changes in the storybook!</div>;
};
