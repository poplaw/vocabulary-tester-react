import React, { FC } from "react";
import { Helmet } from "react-helmet";

const Layout: FC = ({ children }) => (
    <>
        <Helmet>
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
            />
        </Helmet>
        {children}
    </>
);

export default Layout;
