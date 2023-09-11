import React, { FC, useEffect } from "react";
import {
    Grid,
    List,
    ListItem,
    ListItemText,
    makeStyles,
    Theme,
    Typography,
    TypographyProps,
} from "@material-ui/core";
import PieChart from "../PieChart";
import { PieChartSeries } from "../charts/PieChart";
import { green, red } from "@material-ui/core/colors";
import { useDispatch, useSelector } from "react-redux";
import { getFailed, getPassed } from "../../store/currentTest/currentTestSlice";
import {
    applicationSlice,
    ApplicationState,
} from "../../store/application/applicationSlice";
import GoBackButton from "../GoBackButton";
import { getAnswer } from "../../store/dictionary/dictionarySlice";

const useStyles = makeStyles((theme: Theme) => ({
    passed: {
        color: green[500],
    },
    failed: {
        color: red[500],
    },
    root: {
        textTransform: "uppercase",
        letterSpacing: theme.spacing(1),
    },
}));

enum ResultCaptionType {
    Passed,
    Failed,
}

type ResultCaptionProps = {
    type: ResultCaptionType;
    value: number;
} & TypographyProps;

const ResultCaption: FC<ResultCaptionProps> = ({
    value,
    type,
    children,
    ...props
}) => {
    const { root, passed, failed } = useStyles();

    let className = "";

    switch (type) {
        case ResultCaptionType.Passed:
            className = passed;
            break;

        case ResultCaptionType.Failed:
            className = failed;
            break;
    }

    return (
        <Typography
            component="span"
            variant="h4"
            className={`${root} ${className}`}
            {...props}
        >
            {children}
            :&nbsp;
            {value}
        </Typography>
    );
};

interface ResultsInfoProps {
    correct: string[];
    failed: string[];
}

const ResultsInfo: FC<ResultsInfoProps> = ({ correct, failed }) => {
    const data: PieChartSeries[] = [
        new PieChartSeries(green[500], correct.length, "Passed"),
        new PieChartSeries(red[500], failed.length, "Failed"),
    ];

    const dictionary = useSelector(getAnswer);

    return (
        <Grid
            container
            item
            direction="row"
            alignItems="center"
            justify="space-evenly"
        >
            <Grid
                item
                sm={4}
                container
                alignItems={"center"}
                direction={"column"}
                style={{
                    overflowY: "scroll",
                    maxHeight: "100vh",
                    paddingTop: "100px",
                    paddingBottom: "100px",
                }}
            >
                <ResultCaption
                    type={ResultCaptionType.Failed}
                    value={failed.length}
                >
                    Failed
                </ResultCaption>
                <List>
                    {failed.map((word, index) => (
                        <ListItem key={index}>
                            <ListItemText
                                primary={word}
                                secondary={dictionary[word]}
                            />
                        </ListItem>
                    ))}
                </List>
            </Grid>
            <Grid item alignItems={"center"} direction={"column"}>
                <PieChart
                    margin={{ left: 10, right: 10, top: 10, bottom: 10 }}
                    data={data}
                    onCurrentSelectionChange={null}
                />
            </Grid>
            <Grid
                item
                sm={4}
                alignItems={"center"}
                direction={"column"}
                style={{
                    overflowY: "scroll",
                    maxHeight: "100vh",
                    paddingTop: "100px",
                    paddingBottom: "100px",
                }}
            >
                <ResultCaption
                    type={ResultCaptionType.Passed}
                    value={correct.length}
                >
                    Passed
                </ResultCaption>
                <List>
                    {correct.map((word, index) => (
                        <ListItem key={index}>
                            <ListItemText
                                primary={word}
                                secondary={dictionary[word]}
                            />
                        </ListItem>
                    ))}
                </List>
            </Grid>
        </Grid>
    );
};

const TestResultsStage: FC = () => {
    const passed = useSelector(getPassed);
    const failed = useSelector(getFailed);

    const dispatch = useDispatch();

    useEffect(() => {
        const eventHandler = e => {
            if (e.which === 13) {
                dispatch(
                    applicationSlice.actions.testStage(
                        ApplicationState.DictionarySelection
                    )
                );
            }
        };

        window.addEventListener("keypress", eventHandler);

        return (): void => window.removeEventListener("keypress", eventHandler);
    }, []);

    return (
        <Grid
            container
            item
            alignItems="center"
            justify="center"
            style={{ height: "100%" }}
        >
            <GoBackButton />
            <Grid item style={{ width: "100%" }}>
                <ResultsInfo correct={passed} failed={failed} />
            </Grid>
        </Grid>
    );
};

export default TestResultsStage;
