import React, { FC, TextareaHTMLAttributes } from "react";
import Hex2Rgb from "../utils/Hex2Rgb";
import { Grid, GridProps, Grow, makeStyles, Paper, Theme } from "@material-ui/core";

type VocabularyAreaProps = GridProps & {
    textAreaProps: TextareaHTMLAttributes<HTMLTextAreaElement>;
};

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
    textAreaProps,
    ...props
}) => {
    const classes = useStyles();
    return (
        <Grid {...props}>
            <Grow in={true}>
                <Paper className={classes.root}>
                    <textarea
                        placeholder="Paste here your material to memorize..."
                        className={classes.textArea}
                        {...textAreaProps}
                    ></textarea>
                </Paper>
            </Grow>
        </Grid>
    );
};

export default VocabularyArea;
