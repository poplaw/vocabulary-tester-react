import React, { FC } from "react";
import { Grid, GridProps, Paper, makeStyles } from "@material-ui/core";

type VocabularyAreaProps = GridProps;

const useStyles = makeStyles(() => ({
    root: {
        width: "100%",
        height: "100%",
        padding: "20px 10px",
    },
    textArea: {
        font: "inherit",
        width: "inherit",
        height: "inherit",
        outline: "none",
        resize: "none",
        textAlign: "center",
        background: "inherit",
        border: "none",
        color: "inherit",
    },
}));

const VocabularyArea: FC<VocabularyAreaProps> = ({ lg, md, sm, xl, xs }) => {
    const classes = useStyles();

    return (
        <Grid item lg={lg} md={md} sm={sm} xl={xl} xs={xs}>
            <Paper className={classes.root}>
                <textarea
                    placeholder="Paste here your material to memorize..."
                    className={classes.textArea}
                ></textarea>
            </Paper>
        </Grid>
    );
};

export default VocabularyArea;
