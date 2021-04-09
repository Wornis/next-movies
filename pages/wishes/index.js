import React from 'react';
import { useSelector } from 'react-redux';
import Layout from '../../layouts';
import MediaList from '../../components/MediaList';

export default function TvDetails() {
  const { movies, tv } = useSelector(state => state.user.wishList);
  return (
    <Layout>
      {!!movies.length && (
        <div>
          <span>Mes films</span>
          <MediaList allMedia={movies} type="movies" totalPages={1} />
        </div>
      )}
      {!!tv.length && (
        <div>
          <span>Mes séries</span>
          <MediaList allMedia={tv} type="tv" totalPages={1} />
        </div>
      )}
    </Layout>
  );
}
