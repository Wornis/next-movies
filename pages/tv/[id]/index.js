import React from 'react';
import axios from '../../../utils/Axios';
import MediaDetails from '../../../components/MediaDetails';

export default function TvDetails({ data }) {
  return <MediaDetails data={data} />;
}

export async function getStaticProps({ params: { id } }) {
  try {
    const { data } = await axios(`/tv/${id}`);
    const tv = { ...data };
    if (tv.poster_path) {
      tv.image_path = `https://image.tmdb.org/t/p/original/${tv.poster_path}`;
    }
    return {
      props: { data: tv },
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
  const { data } = await axios('/tv/changes');
  return {
    paths: data.results.map(({ id }) => ({
      params: { id: id.toString() },
    })),
    fallback: false,
  };
}
