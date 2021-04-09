import React from 'react';
import Layout from '../../../layouts';
import MediaList from '../../../components/MediaList';
import axios from '../../../utils/Axios';

export default function MoviesPage({ allTv, totalPages }) {
  return (
    <Layout>
      <MediaList allMedia={allTv} type="tv" totalPages={totalPages} />
    </Layout>
  );
}

export async function getStaticProps({ params: { id } }) {
  const getTvData = async movieId => {
    try {
      const { data } = await axios(`/tv/${movieId}`);
      const tv = { ...data };
      if (tv.poster_path) {
        tv.image_path = `https://image.tmdb.org/t/p/original/${tv.poster_path}`;
      }
      return { data: tv };
    } catch (e) {
      return { data: {} };
    }
  };
  const { data: tv } = await axios('/tv/changes');
  const tvIds = tv.results.slice(id * 10 - 10, id * 10).map(mTv => mTv.id);
  const data = await Promise.all(tvIds.map(getTvData));
  const allTv = data.filter(({ adult }) => !adult);
  return {
    props: {
      allTv: allTv.map(v => v.data),
      totalPages: parseInt(tv.results.length / 10, 10) - 20,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const { data: tv } = await axios('/tv/changes');
  const allTv = tv.results.filter(({ adult }) => !adult);
  const totalPages = parseInt(allTv.length / 10, 10);
  return {
    paths: Array.from(Array(totalPages).keys()).map(id => ({
      params: { id: id.toString() },
    })),
    fallback: false,
  };
}
