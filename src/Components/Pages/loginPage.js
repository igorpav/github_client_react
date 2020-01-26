import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import {Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import VALIDATION_QUERY from "../Graphql/validation";
import {useLazyQuery} from "@apollo/react-hooks";
//import logo from '../iconHub.png';

const AUTH_TOKEN = 'auth-token';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxwidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '700px',
    justifyContent: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LoginPage({login}) {
  //let history = useHistory();
  const classes = useStyles();
  const [token, setToken] = useState("");
  const [error, setError] = useState(false);
  const [getData] = useLazyQuery(VALIDATION_QUERY, {
    onCompleted: () => {
      setError(false);
      login(token);
      //history.push(``);
      window.location.reload();
    },
    onError: () => {
      setError(true);
      localStorage.removeItem(AUTH_TOKEN);
    }
  });

  const validation = () => {
    localStorage.setItem(AUTH_TOKEN, token);
    getData();
  };

  return (
    <Grid container component="main" maxWidth="xs" className={classes.root}>
      <CssBaseline />
      <div className={classes.paper} content="center">
        {/* <img src={logo} alt="github_client"></img> */}
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <TextField
            onChange={(e) => setToken(e.target.value)}
            value={token}
            error={error}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="token"
            label="Token from github"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button fullWidth variant="contained" color="black" className={classes.submit}
                  onClick={validation}>
            Sign In
          </Button>
      </div>
    </Grid>
  );
}

