import React from "react";
import ViewerInfo from "./ViewerInfo";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  panel: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    marginTop: 30
  },
  userInfo: {
    marginRight: "50px"
  }
}));

const MyProfile = () => {
  const classes = useStyles();
  return (
    <div className={classes.panel}>
      <ViewerInfo className={classes.userInfo}/>
    </div>
  )
};

export default MyProfile;
