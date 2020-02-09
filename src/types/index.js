import PropTypes from 'prop-types';

const { string, number, array, arrayOf, shape } = PropTypes;

const DecadeCount = shape({
    decade: number,
    count: number
});

const Artist = shape({
    name: string,
    id: string,
});

const Taste = shape({
    danceability: number,
    valence: number,
    acousticness: number,
    energy: number,
})

export const Genre = shape({
    label: string,
    count: number,
})

export const User = shape({
  display_name: string,
  id: string,
  decadeCounts: arrayOf(DecadeCount),
  topArtists: arrayOf(Artist),
  genreCounts: array,
  taste: Taste
})
