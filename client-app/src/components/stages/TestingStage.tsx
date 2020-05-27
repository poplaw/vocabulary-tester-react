import React, {
    FC,
    useState,
    useRef,
    useEffect,
    useLayoutEffect,
    useCallback,
} from "react";
import {
    Grid,
    Hidden,
    Slide,
    Button,
    IconButton,
    makeStyles,
    Theme,
    IconButtonProps,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
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
import { RootState } from "../../store";

const useStyles = makeStyles((theme: Theme) => ({
    closeTestButton: {
        position: "absolute",
        right: theme.spacing(1),
        top: theme.spacing(4),
    },
}));

const CloseTestButton: FC<IconButtonProps> = ({ ...props }) => {
    const classes = useStyles();
    return (
        <IconButton className={classes.closeTestButton} {...props}>
            <Close />
        </IconButton>
    );
};

const TestingStage: FC = () => {
    const passed = useSelector(getAmountOfPassed);
    const failed = useSelector(getAmountOfFailed);
    const total = useSelector(getDictionarySize);
    const testedString = useSelector(getTestedKey);
    const answer = useSelector(
        (state: RootState) => state.dictionary[testedString]
    );
    const [variant, setVariant] = useState<Variant>(Variant.ExpectingAnswer);
    const [value, setValue] = useState<string>("");
    const dispatch = useDispatch();
    const testInputRef = useRef<HTMLInputElement>();

    const quit = useCallback(() => {
        dispatch(currentTestSlice.actions.clean());
        dispatch(
            applicationSlice.actions.testStage(
                ApplicationState.DictionarySelection
            )
        );
    }, []);

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
                        <TestProgressBar value={passed + failed} max={total} />
                    </Slide>
                </Grid>

                <Grid
                    container
                    item
                    xs={12}
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    <Hidden smDown>
                        <CloseTestButton onClick={(): void => quit()} />
                    </Hidden>
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
