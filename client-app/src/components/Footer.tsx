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
        bottom: 0,
        borderRadius: "20px 20px",
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
            {appName} by Piotr Popławski @{year}
        </Typography>
    );
};

const Footer: FC = () => {
    const classes = useStyles();

    return (
        <Fade in={true} timeout={400}>
            <AppBar className={classes.footer} position="static">
                <Toolbar>
                    <AppName className={classes.appName} />
                </Toolbar>
            </AppBar>
        </Fade>
    );
};

export default Footer;
