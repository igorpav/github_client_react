import React, {useState} from "react";
import {Button, makeStyles, TextField } from "@material-ui/core";
import RepositoryPageCard from "../Pages/RepositoryPageCard";
import {useLazyQuery, useMutation} from "@apollo/react-hooks";
import REPOS_QUERY from "../Graphql/repos";
import { ADD_STAR_REPOS, REMOVE_STAR_REPOS }from "../Mutations/Star";
import CircularProgress from "@material-ui/core/CircularProgress";
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  cards: {
    maxWidth: "fit-content",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around"
  },
  content: {
    width: "100%"
  },
  title: {
    margin: theme.spacing(1, 0, 2),
  },
  elementList: {
    margin: "10px 0",
    width: "100%"
  },
  searchButton: {
    margin: 8
  },
}));

const RepositorySearch = () => {
  const classes = useStyles();
  const [input, setInput] = useState("");
  const [getData, {loading, error, data}] = useLazyQuery(REPOS_QUERY);

  const [addStar] = useMutation(ADD_STAR_REPOS,
    {
      refetchQueries: [{query: REPOS_QUERY, variables: {title: input}}]
    });
  const [removeStar] = useMutation(REMOVE_STAR_REPOS,
    {
      refetchQueries: [{query: REPOS_QUERY, variables: {title: input}}]
    });

  return (
    <div className={classes.root}>
      <TextField 
        label="Repository name" 
        value={input} 
        onChange={(e) => (setInput(e.target.value))}
      />
      <Button variant="contained" color="primary" className={classes.searchButton}
              onClick={() => (getData({variables: {title: input}}))}>
        <SearchIcon/> 
      </Button>
      {error && (
        <h5>Not found</h5>
      )}
      {loading && (
        <CircularProgress/>
      )}
      {data && (
        <div className={classes.cards}>
          {data.search.nodes.map((node) => (
            <RepositoryPageCard repo={node} key={node.id} addStar={addStar} removeStar={removeStar}/>
          ))}
        </div>
      )}
    </div>
  )
};

export default RepositorySearch;
