import React, { FC, useState } from "react";
import { Grid, Hidden, Slide } from "@material-ui/core";
import TestProgressBar from "../TestProgressBar";
import TestInput from "../TestInput";
import TestedPair, { Variant } from "../TestedPair";
import currentTest, {
    getAmountOfPassed,
    getAmountOfFailed,
    getTestedKey,
    currentTestSlice,
} from "../../store/currentTest/currentTestSlice";
import { useSelector, useDispatch } from "react-redux";
import {
    getDictionarySize,
    getAnswer,
} from "../../store/dictionary/dictionarySlice";
import {
    applicationSlice,
    ApplicationState,
} from "../../store/application/applicationSlice";

const TestingStage: FC = () => {
    const passed = useSelector(getAmountOfPassed);
    const failed = useSelector(getAmountOfFailed);
    const total = useSelector(getDictionarySize);
    const testedString = useSelector(getTestedKey);
    const answer = useSelector(state => state.dictionary[testedString]);
    const [variant, setVariant] = useState<Variant>(Variant.ExpectingAnswer);
    const [value, setValue] = useState<string>("");
    const dispatch = useDispatch();

    return (
        <>
            <Slide in={true} direction="down">
                <TestProgressBar value={passed + failed} max={total} />
            </Slide>
            <Grid container style={{ height: "100%" }}>
                <Hidden smDown>
                    <Grid item sm={3}></Grid>
                </Hidden>
                <Grid
                    container
                    item
                    xs={12}
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    <Grid item>
                        <TestedPair
                            testedString={testedString}
                            solution={answer}
                            variant={variant}
                        />
                    </Grid>
                    <Grid item>
                        <TestInput
                            value={value}
                            onChange={e => setValue(e.target.value)}
                            onKeyPress={e => {
                                if (e.which === 13) {
                                    if (variant === Variant.ExpectingAnswer) {
                                        if (value === answer) {
                                            setVariant(Variant.AnswerCorrect);
                                            dispatch(
                                                currentTestSlice.actions.pass(
                                                    testedString
                                                )
                                            );
                                        } else {
                                            setVariant(Variant.AnswerWrong);
                                            dispatch(
                                                currentTestSlice.actions.fail(
                                                    testedString
                                                )
                                            );
                                        }
                                    } else {
                                        setValue("");
                                        if (passed + failed < total) {
                                            setVariant(Variant.ExpectingAnswer);
                                            dispatch(
                                                currentTestSlice.actions.fetchNext()
                                            );
                                        } else {
                                            dispatch(
                                                applicationSlice.actions.testStage(
                                                    ApplicationState.TestResult
                                                )
                                            );
                                        }
                                    }
                                }
                            }}
                        />
                    </Grid>
                </Grid>
                <Hidden smDown>
                    <Grid item sm={3}></Grid>
                </Hidden>
            </Grid>
        </>
    );
};

export default TestingStage;
