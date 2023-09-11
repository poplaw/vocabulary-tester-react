import React, { FC, useEffect, useRef, useState } from "react";
import { Grid, Hidden, Slide } from "@material-ui/core";
import TestProgressBar from "../TestProgressBar";
import TestInput from "../TestInput";
import TestedPair, { Variant } from "../TestedPair";
import {
    currentTestSlice,
    getFailed,
    getPassed,
    getTestedKey,
} from "../../store/currentTest/currentTestSlice";
import { useDispatch, useSelector } from "react-redux";
import { getDictionarySize } from "../../store/dictionary/dictionarySlice";
import {
    applicationSlice,
    ApplicationState,
} from "../../store/application/applicationSlice";
import { RootState } from "../../store";
import GoBackButton from "../GoBackButton";

const TestingStage: FC = () => {
    const passed = useSelector(getPassed);
    const failed = useSelector(getFailed);
    const total = useSelector(getDictionarySize);
    const testedString = useSelector(getTestedKey);
    const answer = useSelector(
        (state: RootState) => state.dictionary[testedString]
    );
    const [variant, setVariant] = useState<Variant>(Variant.ExpectingAnswer);
    const [value, setValue] = useState<string>("");
    const dispatch = useDispatch();
    const testInputRef = useRef<HTMLInputElement>();

    useEffect(() => {
        if (testInputRef.current) {
            testInputRef.current.focus();
        }
    }, []);

    return (
        <>
            <Grid container style={{ height: "100%", position: "relative" }}>
                <Grid sm={12}>
                    <Slide in={true} direction="down">
                        <TestProgressBar
                            value={passed.length + failed.length}
                            max={total}
                        />
                    </Slide>
                </Grid>

                <GoBackButton />
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
                            ref={testInputRef}
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
                                        if (
                                            passed.length + failed.length <
                                            total
                                        ) {
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
