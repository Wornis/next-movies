import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { useRouter } from 'next/router';

const useStyles = makeStyles(() => ({
  cardRoot: {
    minWidth: 275,
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  backBtn: {
    marginBottom: 25,
    cursor: 'pointer',
  },
}));

const MediaDetails = ({ data }) => {
  const classes = useStyles();
  const router = useRouter();

  const genres = data.genres?.map(({ name }) => name).join(', ');
  return (
    <Card className={classes.cardRoot} variant="outlined">
      <CardContent className={classes.cardContent}>
        <div
          className={classes.backBtn}
          role="presentation"
          onClick={() => router.back()}
        >
          Click here to go back
        </div>
        <div>
          {data.image_path && (
            <img src={data.image_path} width={200} height={400} alt="" />
          )}
        </div>
        <div>Le titre du film: {data.title}</div>
        <div>La date de sortie du film {data.release_date}</div>
        {genres && <div>Genres: </div>}
        <div>Durée du film (mn): {data.runtime}</div>
        <div>Statut: {data.status}</div>
        <div>Langue d'origine: {data.original_language}</div>
        <br />
        <div>Synopsis: {data.overview}</div>
      </CardContent>
    </Card>
  );
};

export default MediaDetails;
