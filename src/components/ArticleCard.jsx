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
  text: {
    fontFamily: "Benne, serif",
  },
}));


// ----------------------------- Card for Article --------------------------------- //
const ArticleCard = ({ articleResults }) => {
  const classes = useStyles();

  return (
    <div className={classes.cardContainer} key={`cardContainer`}>
      {articleResults.map((article, i) => (
        <div key={`article_${i}`}>
        <Card className={classes.root} key={`articleCard_${i}`}>
        <CardActionArea key={`cardActionArea_${i}`} href={article.url} target="_blank" rel='noreferrer'>
          {
            article.multimedia
            ? 
            <CardMedia
            className={classes.media}
            image={article.multimedia[0].url}
            title="Thumbnail"
            key={`cardMedia_${i}`}
            />
            : 
            <CardMedia
            className={classes.media}
            image={'https://cdn-images-1.medium.com/max/1200/1*QUlYX1snC5csKT-E6Bmxvw.jpeg'}
            title="Thumbnail"
            key={`cardMedia_${i}`}
            />
          }

          <CardContent key={`cardContent_${i}`}>
            <Typography className={classes.text} gutterBottom variant="h6" component="h2" key={`title_${i}`}>
              {article.title}
            </Typography>
            <Typography className={classes.text} variant="body2" color="textSecondary" component="p" style={{fontSize:16}} key={`abstract_${i}`}>
              {article.abstract}
            </Typography>
            <br />
            <Typography className={classes.text} variant="body2" color="textSecondary" component="p" style={{fontSize:13}} key={`byline_${i}`}>
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