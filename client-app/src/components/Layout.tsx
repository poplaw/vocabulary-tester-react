import React, { FC } from "react";
import { Helmet } from "react-helmet";
import {
    CssBaseline,
    Grid,
    useTheme,
    createMuiTheme,
    ThemeProvider,
} from "@material-ui/core";
import Topbar from "./Topbar";
import Footer from "./Footer";
import { grey, teal } from "@material-ui/core/colors";
import {
    getState,
    ApplicationState,
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

const Layout: FC = ({ children }) => {
    const appState = useSelector(getState);

    return (
        <ThemeProvider theme={darkTheme}>
            <Helmet>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"
                />
            </Helmet>
            <CssBaseline />
            <Error />
            <Grid
                style={{ height: "100vh" }}
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
