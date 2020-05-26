import React, { FC, useState } from "react";
import { Grid, GridProps, Paper, makeStyles } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { dictionarySlice } from "../store/dictionary/dictionarySlice";
import DictionaryEntry from "../utils/DictionaryEntry";

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
    const dispatch = useDispatch();

    const [text, setText] = useState<string>("");

    return (
        <Grid item lg={lg} md={md} sm={sm} xl={xl} xs={xs}>
            <Paper className={classes.root}>
                <textarea
                    value={text}
                    placeholder="Paste here your material to memorize..."
                    className={classes.textArea}
                    onChange={(e): void => {
                        setText(e.target.value);
                        dispatch(dictionarySlice.actions.clear());
                        e.target.value.split("\n").map((row: string) => {
                            const pairArray: string[] = row.split(" - ");

                            if (pairArray.length > 1) {
                                const pair: DictionaryEntry = {
                                    first: pairArray[0],
                                    second: pairArray[1],
                                };
                                dispatch(dictionarySlice.actions.set(pair));
                            }
                        });
                    }}
                ></textarea>
            </Paper>
        </Grid>
    );
};

export default VocabularyArea;
