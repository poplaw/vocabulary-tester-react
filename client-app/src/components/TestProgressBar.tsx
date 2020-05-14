import React, {
    FC,
    useCallback,
    ForwardRefRenderFunction,
    forwardRef,
    ForwardRefExoticComponent,
} from "react";
import { LinearProgress, makeStyles, Typography } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { CSSProperties } from "@material-ui/core/styles/withStyles";

const barHeight = 30;

const useStyles = makeStyles(() => ({
    root: {
        position: "relative",
    },
    bar: {
        height: `${barHeight}px`,

        backgroundColor: green[800],
    },
    bar1: {
        backgroundColor: green[500],
        borderRadius: `0px ${barHeight / 2}px ${barHeight / 2}px 0px`,
    },
    caption: {
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
    },
}));

interface TestProgressBarProps {
    value: number;
    max: number;
    style?: CSSProperties;
}

const TestProgressBar: ForwardRefExoticComponent<TestProgressBarProps> = forwardRef<
    Element,
    TestProgressBarProps
>(({ value, max, style }, ref) => {
    const classes = useStyles();

    const normalizedValue = useCallback(() => (value / max) * 100, [
        value,
        max,
    ]);

    return (
        <div className={classes.root} ref={ref}>
            <LinearProgress
                className={classes.bar}
                classes={{
                    bar1Determinate: classes.bar1,
                }}
                variant="determinate"
                value={normalizedValue()}
            />
            <Typography
                className={classes.caption}
                component="span"
                variant="h6"
            >
                {value} / {max}
            </Typography>
        </div>
    );
});

export default TestProgressBar;
