import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MainContent from './MainContent.jsx';
import { articleCategories } from '../sources/Categories.js'


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  text: {
    color: '#365261',
    fontFamily: "Benne, serif",
  },
}));

export default function SideBar() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [articleResults, setArticleResults] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

// Fetch Home page data on page load 
  useEffect(() => {
    getArticles('home')
  }, []);

// Fetching top stories from New York times API depending on category clicked
  const getArticles = (category) => {
    category = category.toLowerCase()
    setLoading(true)
    fetch(`https://api.nytimes.com/svc/topstories/v2/${category}.json?${process.env.REACT_APP_API_KEY}`)
    .then(response => response.json())
    .then(data => {
      setArticleResults(data.results)
      setLoading(false)
      })
      .catch(e => {
        setLoading(false)
        setError('Fetch failed')
      }) 

    if (loading) {
      return <p>loading...</p>
    }

    if (error) {
      return <p>ERROR: {error}</p>
    }
  }
  
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className={classes.text} style={{backgroundColor:'#fff'}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" noWrap className={classes.text}>
            Nuuly News
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <Typography variant="h5" className={classes.text}>
            Top Stories
        </Typography>
        <List>
          {articleCategories.map((text, i) => (
            <ListItem button key={`articleCard_${i}`} onClick={() => getArticles(text)}>
              <ListItemText className={classes.text} primary={text} key={`articleCard_text_${i}`} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <MainContent 
        open={open} 
        articleResults={articleResults}
        articleCategories={articleCategories}
      />
    </div>
  );
}