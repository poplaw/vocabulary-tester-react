import React, { FC, useState } from "react";
import { Grid, Hidden, Fade } from "@material-ui/core";
import VocabularyArea from "../VocabularyArea";
import DictionaryEntry from "../../utils/DictionaryEntry";
import { dictionarySlice } from "../../store/dictionary/dictionarySlice";
import { useDispatch, useSelector } from "react-redux";
import {
    getRawMaterial,
    currentTestSlice,
} from "../../store/currentTest/currentTestSlice";

const MaterialSelection: FC = () => {
    const rawMaterial = useSelector(getRawMaterial);
    const dispatch = useDispatch();

    return (
        <Grid container style={{ height: "100%" }}>
            <Hidden smDown>
                <Grid item sm={3}></Grid>
            </Hidden>
            <Fade in={true}>
                <VocabularyArea
                    md={6}
                    xs={12}
                    value={rawMaterial}
                    onChange={(e): void => {
                        dispatch(
                            currentTestSlice.actions.setRawMaterial(
                                e.target.value
                            )
                        );
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
                />
            </Fade>
            <Hidden smDown>
                <Grid item sm={3}></Grid>
            </Hidden>
        </Grid>
    );
};

export default MaterialSelection;
