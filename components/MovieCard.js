import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles(theme => ({
  root: {
    width: 345,
    height: 406,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    cursor: 'pointer',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

export default function MovieCard({
  imageUrl,
  title,
  date,
  vote,
  onClick,
  overview,
  isLiked,
  onLike,
  onUnlike,
}) {
  const classes = useStyles();
  const iconOutColor = isLiked ? 'secondary' : 'primary';
  return (
    <div>
      <Card className={classes.root}>
        <CardHeader
          action={
            <IconButton
              onClick={() => (isLiked ? onUnlike() : onLike())}
              color={iconOutColor}
              aria-label="add an alarm"
            >
              {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          }
          title={title}
          subheader={`${date} - ${vote}`}
        />
        <CardMedia
          onClick={onClick}
          className={classes.media}
          image={imageUrl}
          title="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {overview}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
