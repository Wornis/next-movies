import React from 'react';
import axios from '../../../utils/Axios';
import MediaDetails from '../../../components/MediaDetails';

export default function MoviesDetails({ data }) {
  return <MediaDetails data={data} />;
}

export async function getStaticProps({ params: { id } }) {
  try {
    const { data } = await axios(`/movie/${id}`);
    const movie = { ...data };
    if (movie.poster_path) {
      movie.image_path = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;
    }
    return {
      props: { data: movie },
      revalidate: 86400,
    };
  } catch (e) {
    return {
      props: { data: {} },
      revalidate: 86400,
    };
  }
}

export async function getStaticPaths() {
  const { data } = await axios('/movie/changes');
  return {
    paths: data.results.map(({ id }) => ({
      params: { id: id.toString() },
    })),
    fallback: false,
  };
}
