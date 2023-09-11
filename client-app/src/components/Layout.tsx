import React, { FC } from "react";
import { Helmet } from "react-helmet";
import {
    createMuiTheme,
    CssBaseline,
    Grid,
    makeStyles,
    ThemeProvider,
} from "@material-ui/core";
import Topbar from "./Topbar";
import Footer from "./Footer";
import prismImg from "../images/prism.png";
import { grey, teal } from "@material-ui/core/colors";
import {
    ApplicationState,
    getApplicationName,
    getState,
} from "../store/application/applicationSlice";
import { useSelector } from "react-redux";
import Error from "./Error";

const darkTheme = createMuiTheme({
    palette: {
        type: "dark",
        primary: teal,
        secondary: grey,
    },
});

const useStyles = makeStyles(() => ({
    grid: {
        height: "100vh",
        backgroundImage: `url("${prismImg}")`,
    },
}));

const Layout: FC = ({ children }) => {
    const appState = useSelector(getState);
    const styles = useStyles();
    const appName = useSelector(getApplicationName);

    return (
        <ThemeProvider theme={darkTheme}>
            <Helmet>
                <title>{appName}</title>
            </Helmet>
            <CssBaseline />
            <Error />
            <Grid
                className={styles.grid}
                container
                direction="column"
                alignItems="stretch"
                justify="space-between"
            >
                {appState === ApplicationState.DictionarySelection && (
                    <Topbar />
                )}
                <Grid item style={{ flex: 1 }}>
                    {children}
                </Grid>
                <Grid item>
                    <Footer />
                </Grid>
            </Grid>
        </ThemeProvider>
    );
};

export default Layout;
