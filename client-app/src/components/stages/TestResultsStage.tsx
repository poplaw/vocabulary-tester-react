import React, { FC } from "react";
import {
    Grid,
    Typography,
    TypographyProps,
    makeStyles,
    Theme,
} from "@material-ui/core";
import PieChart from "../PieChart";
import { PieChartSeries } from "../charts/PieChart";
import { green, red } from "@material-ui/core/colors";

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
    correct: number;
    failed: number;
}

const ResultsInfo: FC<ResultsInfoProps> = ({ correct, failed }) => {
    const data: PieChartSeries[] = [
        new PieChartSeries(green[500], correct, "Passed"),
        new PieChartSeries(red[500], failed, "Failed"),
    ];

    return (
        <Grid
            container
            item
            direction="row"
            alignItems="center"
            justify="space-evenly"
        >
            <Grid item>
                <ResultCaption type={ResultCaptionType.Failed} value={failed}>
                    Failed
                </ResultCaption>
            </Grid>
            <Grid item>
                <PieChart
                    margin={{ left: 10, right: 10, top: 10, bottom: 10 }}
                    data={data}
                    onCurrentSelectionChange={null}
                />
            </Grid>
            <Grid item>
                <ResultCaption type={ResultCaptionType.Passed} value={correct}>
                    Passed
                </ResultCaption>
            </Grid>
        </Grid>
    );
};

const TestResultsStage: FC = () => {
    return (
        <Grid
            container
            item
            alignItems="center"
            justify="center"
            style={{ height: "100%" }}
        >
            <Grid item style={{ width: "100%" }}>
                <ResultsInfo correct={10} failed={5} />
            </Grid>
        </Grid>
    );
};

export default TestResultsStage;
