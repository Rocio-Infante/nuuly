import React, { lazy, Suspense }from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Spinner from './Spinner.jsx';
const ArticleCard = lazy(() => import('./ArticleCard.jsx'))

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    marginTop: 64,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

const MainContent = ({ open, articleResults, articleCategories }) => {
  const classes = useStyles();

  return (
    <main
      className={clsx(classes.content, {
        [classes.contentShift]: open,
      })}
    >
      <div className={classes.drawerHeader} />
      <Suspense fallback={<Spinner/>}>
      <ArticleCard articleResults={articleResults} articleCategories={articleCategories}/>
      </Suspense>
    </main>
  )
};

export default MainContent;