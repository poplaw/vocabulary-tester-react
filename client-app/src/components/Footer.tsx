import React, { FC } from "react";
import {
    Toolbar,
    AppBar,
    makeStyles,
    Typography,
    Slide,
    Zoom,
    Fade,
    Grow,
} from "@material-ui/core";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import { connect, useSelector } from "react-redux";
import { getApplicationName } from "../store/application/applicationSlice";

const useStyles = makeStyles(() => ({
    footer: {
        top: "auto",
        bottom: 50,
        right: 50,
        borderRadius: "20px 20px",
        position: "absolute",
    },
    appName: {
        marginLeft: "auto",
        marginRight: "auto",
        letterSpacing: "2px",
        textTransform: "uppercase",
    },
}));

interface AppNameProps {
    style?: CSSProperties;
    className?: string;
}

const AppName: FC<AppNameProps> = ({ style, className }) => {
    const year = new Date().getFullYear();
    const appName = useSelector(getApplicationName);

    return (
        <Typography style={style} className={className}>
            {appName}
        </Typography>
    );
};

interface FooterProps {
    style?: CSSProperties;
}

const Footer: FC<FooterProps> = ({ style }) => {
    const classes = useStyles();

    return (
        <Fade in={true} timeout={400}>
            <div style={style} className={classes.footer}>
                <AppName className={classes.appName} />
                <Typography variant="body1" align="right">
                    2020
                </Typography>
            </div>
        </Fade>
    );
};

export default Footer;
