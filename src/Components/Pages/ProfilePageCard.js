import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ViewerRepositories from "../ViewerRepositories";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import { FOLLOW_USER, UNFOLLOW_USER } from "../Mutations/follow";
import GET_USER_INFO from "../Graphql/user";
import {useMutation} from "@apollo/react-hooks";
import HelpIcon from '@material-ui/icons/Help';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

const useStyles = makeStyles({
  card: {
    marginTop: 100,
    maxWidth: 345,
  },
  media: {
    height: 240,
  },
  followCard: {
    marginLeft: 150,
  },
  moreCard: {
    marginLeft: 20,
  },
  login: {
    marginTop: 10,
  },
  repos: {
    
  }
});

export default function ProfilePageTest({data, entity}) {
  const classes = useStyles();

  const info = data[entity];
  const [extended, switchExtended] = useState(false);
  const [follow] = useMutation(FOLLOW_USER,
    {
      refetchQueries: [{query: GET_USER_INFO, variables: {login: info.login}}]
    });
  const [unfollow] = useMutation(UNFOLLOW_USER,
    {
      refetchQueries: [{query: GET_USER_INFO, variables: {login: info.login}}]
    });

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={info.avatarUrl}
          title="Avatar"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            <h3>{info.name}</h3>
            <Typography className={classes.login}>
            <a href={info.url} type="_blank">
                <h4>{info.login}</h4>
            </a>
            </Typography>
          </Typography>
          {extended &&
            <>
              <Typography variant="body2" component="p">
                {info.bio}
              </Typography>
              <Typography variant="body2" component="p">
                {info.description}
              </Typography>
              <Typography variant="subtitle2" component="h4">
                {info.company}
              </Typography>
              <Typography variant="overline" component="h5">
                {info.location}
              </Typography>
              <Typography variant="caption" color="textSecondary" component="h6">
                {info.email}
              </Typography>
            </>
            }
        </CardContent>
      </CardActionArea>
      <CardActions>
      <div>
        <div>
            <Button variant="contained" color="primary" className={classes.moreCard}
                onClick={() => (switchExtended(!extended))}>
            {extended ? <HelpIcon/> : <HelpOutlineIcon/>}
            </Button>
            {!info.isViewer &&
            <Button variant="contained"  color="primary" className={classes.followCard}
                    onClick={() => (info.viewerIsFollowing ?
                        unfollow({variables: {userId: info.id}})
                        :
                        follow({variables: {userId: info.id}}))}>
                {info.viewerIsFollowing ? <PersonAddDisabledIcon/> : <PersonAddIcon/>}
            </Button>
            }
        </div>
          <div className={classes.repos}>
            {info.isViewer &&
            <ViewerRepositories/>
            }
          </div>
      </div>
      </CardActions>
    </Card>
  );
}