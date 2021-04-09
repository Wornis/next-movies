import React from 'react';
import Layout from '../../../layouts';
import MediaList from '../../../components/MediaList';
import axios from '../../../utils/Axios';

export default function MoviesPage({ allMovies, totalPages }) {
  return (
    <Layout>
      <MediaList allMedia={allMovies} type="movies" totalPages={totalPages} />
    </Layout>
  );
}

export async function getStaticProps({ params: { id } }) {
  const getMovieData = async movieId => {
    try {
      const { data } = await axios(`/movie/${movieId}`);
      const movie = { ...data };
      if (movie.poster_path) {
        movie.image_path = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;
      }
      return { data: movie };
    } catch (e) {
      return { data: {} };
    }
  };
  const { data: movies } = await axios('/movie/changes');
  const movieIds = movies.results
    .slice(id * 10 - 10, id * 10)
    .map(movie => movie.id);
  const data = await Promise.all(movieIds.map(getMovieData));
  const allMovies = data.filter(({ adult }) => !adult);
  return {
    props: {
      allMovies: allMovies.map(movie => movie.data),
      totalPages: parseInt(movies.results.length / 10, 10) - 20,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const { data: movies } = await axios('/movie/changes');
  const allMovies = movies.results.filter(({ adult }) => !adult);
  const totalMovies = parseInt(allMovies.length / 10, 10);
  return {
    paths: Array.from(Array(totalMovies).keys()).map(id => ({
      params: { id: id.toString() },
    })),
    fallback: false,
  };
}
