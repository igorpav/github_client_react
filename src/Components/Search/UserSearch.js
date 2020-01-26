import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Grid, TextField, Button} from '@material-ui/core';
import {useLazyQuery} from "@apollo/react-hooks";
import ProfilePageTest from "../Pages/ProfilePageCard";
import CircularProgress from "@material-ui/core/CircularProgress";
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      display: "flex"
    },
    page: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      width: "100%"
    }
    ,
    title: {
      margin: theme.spacing(1, 0, 2),
    }
    ,
    elementList: {
      margin: "10px 0",
      width:
        "100%"
    }
    ,
    searchButton: {
      margin: 8
    }
  }))
;

export default function SearchTab({query, title, entityName, initialInput}) {
  const classes = useStyles();
  const [getData, {loading, error, data}] = useLazyQuery(query);
  const [input, setInput] = useState(initialInput);

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} className={classes.page}>
          <div className={classes.search}>
            <TextField 
              id="outlined-basic" 
              label="User login" 
              value={input} 
              onChange={(e) => (setInput(e.target.value))}
            />
            <Button variant="contained" color="primary" className={classes.searchButton}
                    onClick={() => (getData({variables: {login: input}}))}>
              <SearchIcon/> 
            </Button>
          </div>
          {error && (
            <h5>Not found</h5>
          )}
          {loading && (
            <CircularProgress />
          )}
          {data && (
            <ProfilePageTest data={data} entity={entityName} />
          )}
        </Grid>
      </Grid>
    </div>
  );
}
