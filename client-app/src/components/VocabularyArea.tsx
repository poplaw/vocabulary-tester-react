import React, { FC, useState, TextareaHTMLAttributes } from "react";
import Hex2Rgb from "../utils/Hex2Rgb";
import {
    Grid,
    GridProps,
    Paper,
    makeStyles,
    Grow,
    Theme,
} from "@material-ui/core";

type VocabularyAreaProps =
    | GridProps
    | TextareaHTMLAttributes<HTMLTextAreaElement>;

const useStyles = makeStyles((theme: Theme) => {
    const color = theme.palette.background.paper;
    const [r, g, b] = Hex2Rgb(color);

    return {
        root: {
            width: "100%",
            height: "100%",
            padding: "20px 10px",
            backdropFilter: "blur(5px)",
            backgroundColor: `rgba(${r}, ${g}, ${b}, 0.1)`,
        },
        textArea: {
            font: "inherit",
            width: "inherit",
            height: "inherit",
            outline: "none",
            resize: "none",
            textAlign: "center",
            background: "transparent",
            border: "none",
            color: "inherit",
        },
    };
});

const VocabularyArea: FC<VocabularyAreaProps> = ({
    lg,
    md,
    sm,
    xl,
    xs,
    ...props
}) => {
    const classes = useStyles();
    return (
        <Grid item lg={lg} md={md} sm={sm} xl={xl} xs={xs}>
            <Grow in={true}>
                <Paper className={classes.root}>
                    <textarea
                        placeholder="Paste here your material to memorize..."
                        className={classes.textArea}
                        {...props}
                    ></textarea>
                </Paper>
            </Grow>
        </Grid>
    );
};

export default VocabularyArea;
