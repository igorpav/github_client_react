import React from 'react';
import {
  makeStyles,
  List,
  ListItem,
  ListItemText,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Grid,
  Typography,
  Card,
  CircularProgress,
  Link,
} from '@material-ui/core';
import GET_VIEWER_INFO from "./Graphql/viewer";
import {Query} from "@apollo/react-components";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: 25,
  },
  content: {
    width: "100%"
  },
  title: {
    margin: theme.spacing(1, 0, 2),
    fontSize: 25,
  },
  elementList: {
    margin: "10px 0",
    width: "100%"
  }
}));

export default function ViewerRepositories() {
  const classes = useStyles();
  const [secondary, setSecondary] = React.useState(false);

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Typography variant="h4" className={classes.title}>
            Repositories
          </Typography>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={secondary}
                  onChange={event => setSecondary(event.target.checked)}
                  value="secondary"
                  color="primary"
                />
              }
              label="Add description"
            />
          </FormGroup>
          <List>
            <Query query={GET_VIEWER_INFO}>
              {({data: viewer, loading}) => {
                if (loading || !viewer) {
                  return <CircularProgress/>;
                }
                return (
                  <>
                    {viewer.viewer.repositories.edges.map((repo) => (
                      <Card className={classes.elementList} key={repo.node.id}>
                        <ListItem>
                          <ListItemText
                            href={repo.node.url}
                            primary={<Link href={repo.node.url}>{repo.node.name}</Link>}
                            secondary={secondary ? repo.node.description : null}
                          />
                        </ListItem>
                      </Card>
                    ))}
                  </>
                )
              }}
            </Query>
          </List>
        </Grid>
      </Grid>
    </div>
  );
}
