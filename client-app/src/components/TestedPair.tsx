import React, { FC } from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import { green, red } from "@material-ui/core/colors";

export enum Variant {
    ExpectingAnswer,
    AnswerCorrect,
    AnswerWrong,
}

interface TestedPairProps {
    testedString: string;
    solution: string;
    variant: Variant;
}

const useStyles = makeStyles(() => ({
    normal: {
        color: "inherit",
    },
    correct: {
        color: green[500],
    },
    wrong: {
        color: red[500],
    },
}));

const initVariantsStyles = (): Map<Variant, string> => {
    const variantStyles = new Map<Variant, string>();
    variantStyles.set(Variant.ExpectingAnswer, "normal");
    variantStyles.set(Variant.AnswerCorrect, "correct");
    variantStyles.set(Variant.AnswerWrong, "wrong");
    return variantStyles;
};

const variantToClassMap: Map<Variant, string> = initVariantsStyles();

const TestedPair: FC<TestedPairProps> = ({
    testedString,
    solution,
    variant,
}) => {
    const classes = useStyles();

    const selectedClass: string =
        classes[variantToClassMap.get(variant) || "normal"];

    return (
        <Grid
            container
            item
            direction="row"
            alignItems="center"
            justify="center"
            style={{ maxWidth: "90vw" }}
        >
            <Grid item>
                <Typography
                    component="span"
                    variant="h3"
                    className={selectedClass}
                >
                    {testedString}
                </Typography>
                <Typography
                    component="span"
                    variant="h3"
                    className={selectedClass}
                >
                    &nbsp;-&nbsp;
                </Typography>
                {variant != Variant.ExpectingAnswer && (
                    <Typography
                        component="span"
                        variant="h3"
                        className={selectedClass}
                    >
                        {solution}
                    </Typography>
                )}
            </Grid>
        </Grid>
    );
};

export default TestedPair;
