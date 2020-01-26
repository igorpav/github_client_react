import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Button, Typography} from "@material-ui/core";
import ViewerRepositories from "../ViewerRepositories";
import HelpIcon from '@material-ui/icons/Help';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

const useStyles = makeStyles(theme => ({
  avatar: {
    borderRadius: "3%",
    width: 200,  
  },
  title: {
    fontSize: 20,
  },
  description: {
    fontSize: 15,
    fontWeight:700,
  },
}));

export default function ProfilePage({data, entity}) {
  const classes = useStyles();
 
  const info = data[entity];
  const [extended, switchExtended] = useState(false);
  
  return (
    <div>
      <div>
        <img src={info.avatarUrl} alt="Avatar" className={classes.avatar}/>
      </div>
      <div className={classes.name}>
        <h3 className={classes.title}>{info.name}</h3>
        <a href={info.url}>
          <h4>{info.login}</h4>
        </a>
      </div>
      {extended && 
      <>
        <Typography variant="body2" component="p" className={classes.description}> 
          {info.bio}
        </Typography>
        <Typography variant="body2" component="p" className={classes.description}> 
          {info.description}
        </Typography>
        <Typography variant="subtitle2" component="h4" className={classes.description}> 
          {info.company}
        </Typography>
        <Typography variant="caption" color="textSecondary" component="h6" className={classes.description}> 
          {info.email}
        </Typography>
      </>
      }
      <div>
        <div>
          <Button className={classes.moreButton} variant="contained" color="primary"
                  onClick={() => (switchExtended(!extended))}>
            {extended ? <HelpIcon/> :<HelpOutlineIcon/>}
          </Button>
        </div>
        {info.isViewer &&
        <ViewerRepositories/>
        }
      </div> 
    </div>
  );
}
