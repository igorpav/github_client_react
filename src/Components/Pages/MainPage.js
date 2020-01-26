import React from "react";
import {makeStyles} from "@material-ui/core";
import NavTabs from "../NavTabs";


const useStyles = makeStyles(theme => ({
    mainSection: {
        display: "flex",
        justifyContent: "center",
        padding: "10px 0"
    },
    content: {
        minWidth: "90vw",
        height: 700
    },
    test: {
        cursor: "pointer"
    }
}));

const MainPage = () => {
    const classes = useStyles();
    return (
        <div className={classes.mainSection}>
            <div className={classes.content}>
                <NavTabs/>
            </div>
        </div>
)
};

export default MainPage;
