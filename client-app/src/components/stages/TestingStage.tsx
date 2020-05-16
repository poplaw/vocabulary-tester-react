import React, { FC } from "react";
import { Grid, Hidden, Slide } from "@material-ui/core";
import TestProgressBar from "../TestProgressBar";
import TestInput from "../TestInput";
import TestedPair, { Variant } from "../TestedPair";

const TestingStage: FC = () => {
    return (
        <>
            <Slide in={true} direction="down">
                <TestProgressBar value={10} max={100} />
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
                            testedString="hello"
                            solution=""
                            variant={Variant.ExpectingAnswer}
                        />
                    </Grid>
                    <Grid item>
                        <TestInput />
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
