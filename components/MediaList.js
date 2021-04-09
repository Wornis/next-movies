import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import MovieCard from './MovieCard';

const useStyles = makeStyles(theme => ({
  rootPagination: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
  moviesList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 15,
  },
}));

const isMediaLiked = (wishList, idMedia) => {
  return wishList.find(({ id }) => id === idMedia);
};

export default function MediaList({ allMedia, type, totalPages }) {
  const router = useRouter();
  const wishList = useSelector(state => state.user.wishList);
  const dispatch = useDispatch();
  const classes = useStyles();
  return (
    <div className={classes.moviesList}>
      {allMedia.map(
        (
          { vote_average, title, release_date, id, image_path, overview },
          i,
        ) => (
          <MovieCard
            key={id}
            vote={vote_average}
            title={title}
            date={release_date}
            imageUrl={image_path}
            overview={overview}
            isLiked={isMediaLiked(wishList[type], id)}
            onClick={() => router.push({ pathname: `/${type}/${id}` })}
            onLike={() =>
              dispatch({
                type: 'user/addWish',
                payload: { mediaType: type, data: allMedia[i] },
              })
            }
            onUnlike={() =>
              dispatch({
                type: 'user/removeWish',
                payload: { mediaType: type, data: allMedia[i] },
              })
            }
          />
        ),
      )}
      <div className={classes.rootPagination}>
        <Pagination
          count={totalPages}
          color="primary"
          onChange={(e, page) =>
            router.push({ pathname: `/${type}/page/${page}` })
          }
        />
      </div>
    </div>
  );
}
