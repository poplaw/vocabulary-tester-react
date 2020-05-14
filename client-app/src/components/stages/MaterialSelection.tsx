import React, { FC } from "react";
import { Grid, Hidden } from "@material-ui/core";
import VocabularyArea from "../VocabularyArea";

const MaterialSelection: FC = () => (
    <Grid container style={{ height: "100%" }}>
        <Hidden smDown>
            <Grid item sm={3}></Grid>
        </Hidden>
        <VocabularyArea md={6} xs={12} />
        <Hidden smDown>
            <Grid item sm={3}></Grid>
        </Hidden>
    </Grid>
);

export default MaterialSelection;
