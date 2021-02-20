import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import {
  makeStyles,
  useTheme,
  Drawer,
  CssBaseline,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { articleCategories } from '../sources/Categories.js'
import MainContent from './MainContent.jsx';
import Spinner from './Spinner.jsx';

// ---------------------------------- styles ------------------------------------- //
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
    fontFamily: 'Benne, serif',
  },
  title: {
    color: '#365261',
    fontFamily: 'Benne, serif',
    cursor: 'pointer',
  }
}));

// ---------------------------------- Sidebar Menu ------------------------------------- //
const SideBar = () => {
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
  // If data is loading, display spinner
    if (loading) {
      return <Spinner />
    }
   // If data failed to load, display error message 
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
            cy-data='drawerButton'
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" noWrap className={classes.title} onClick={() => getArticles('home')} cy-data='homePageTitle'>
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
        <Typography variant="h5" className={classes.text} style={{marginTop:'10px', marginLeft:'10px'}}>
            Top Stories
        </Typography>
        <List>
          {articleCategories.map((text, i) => (
            <ListItem button key={`sidebarListItem_${i}`} onClick={() => getArticles(text)} cy-data='sideBarCategory'>
              <ListItemText className={classes.text} primary={text} key={`sideBarListItem_text_${i}`} cy-data='categoryText'/>
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

export default SideBar;