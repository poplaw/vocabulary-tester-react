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

const darkTheme = createMuiTheme({
    palette: {
        type: "dark",
        primary: teal,
        secondary: grey,
    },
});

const Layout: FC = ({ children }) => (
    <ThemeProvider theme={darkTheme}>
        <Helmet>
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
            />
        </Helmet>
        <CssBaseline />
        <Grid
            style={{ height: "100vh" }}
            container
            direction="column"
            alignItems="stretch"
            justify="space-between"
        >
            <Topbar />
            <Grid item style={{ flex: 1 }}>
                {children}
            </Grid>
            <Grid item>
                <Footer />
            </Grid>
        </Grid>
    </ThemeProvider>
);

export default Layout;
