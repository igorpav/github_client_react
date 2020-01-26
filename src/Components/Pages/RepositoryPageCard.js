import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Star, StarBorder} from "@material-ui/icons";
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  Link
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    card: {
        display: 'flex',
        margin: 16,
        boxSizing: "border-box",
    },
    name: {
        margin: 30,
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        width: 200
    },
    media: {
        height: 240,
      },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 151,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    playIcon: {
        height: 38,
        width: 3,
    },
}));

export default function RepositoryPage({repo, addStar, removeStar}) {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <div className={classes.details}>
            <CardMedia
                className={classes.media}
                image={repo.owner.avatarUrl}
            />
                <CardContent className={classes.content}>
                    <Typography className={classes.name} component="h5" variant="h5">
                        <Link href={repo.url} target="_blank"> {repo.name} </Link>
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Login:<Link href={repo.owner.url} target="_blank"> {repo.owner.login} </Link>
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                        Description: {repo.description}
                    </Typography>
                </CardContent>
                <div className={classes.controls}>
                    {!repo.viewerHasStarred ?
                        <IconButton aria-label="previous" onClick={() => (addStar({variables: {id: repo.id}}))}>
                            <StarBorder/>
                        </IconButton> :
                        <IconButton aria-label="previous" onClick={() => (removeStar({variables: {id: repo.id}}))}>
                            <Star/>
                        </IconButton>
                    }
                </div>
            </div>
            
        </Card>
    );
}
