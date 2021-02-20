import React from 'react';
import {
  makeStyles,
  CircularProgress,
} from "@material-ui/core";

// ---------------------------------- styles ------------------------------------- //
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
    marginTop: 100,
  },
}));

// --------------------------- Spinner for loading screen ------------------------------------- //
const Spinner = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress variant="determinate" style={{color:'#365261'}} />
    </div>
  );
}

export default Spinner;
