import React from 'react';
import {
  makeStyles,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";


// ---------------------------------- styles ------------------------------------- //
const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 300,
    height: '95%',
    margin: 10,
    padding: 0,
  },
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  media: {
    height: 140,
  },
  title: {
    textAlign: "center",
    paddingBottom: 55,
    paddingTop: 45,
    fontFamily: "Castoro, serif",
  },
}));


// ----------------------------- Card for Article --------------------------------- //
const ArticleCard = ({ articleResults }) => {
  const classes = useStyles();

  return (
    <div className={classes.cardContainer}>
      {articleResults.map((article, i) => (
        <div>
        <Card className={classes.root} key={`articleCard_${i}`}>
        <CardActionArea key={`cardActionArea_${i}`} href={article.url} target="_blank">
          <CardMedia
            className={classes.media}
            image={article.multimedia[0].url}
            title="Thumbnail"
            key={`cardMedia_${i}`}
          />
          <CardContent key={`cardContent_${i}`}>
            <Typography gutterBottom variant="h6" component="h2" key={`title_${i}`}>
              {article.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" key={`abstract_${i}`}>
              {article.abstract}
            </Typography>
            <br />
            <Typography variant="body2" color="textSecondary" component="p" style={{fontSize:12}} key={`byline_${i}`}>
              {article.byline}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      </div>
      ))}
    </div>
  )
};

export default ArticleCard;