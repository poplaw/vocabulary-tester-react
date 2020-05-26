import React, { FC, ReactElement } from "react";

import {
    Toolbar,
    AppBar,
    Button,
    makeStyles,
    SvgIconProps,
    Grid,
    Hidden,
    ButtonProps,
} from "@material-ui/core";

import {
    applicationSlice,
    ApplicationState,
} from "../store/application/applicationSlice";
import { Clear, ArrowRight } from "@material-ui/icons";
import TotalPairsInfo from "./TotalParisInfo";
import {
    getDictionarySize,
    dictionarySlice,
} from "../store/dictionary/dictionarySlice";
import { useSelector, useDispatch } from "react-redux";
import {
    shuffleNewTest,
    currentTestSlice,
} from "../store/currentTest/currentTestSlice";

const useStyles = makeStyles(() => ({
    totalPairsInfo: {
        letterSpacing: "2px",
        textTransform: "uppercase",
        textAlign: "center",
    },
    topbar: {
        // borderRadius: "20px 20px",
    },
}));

interface TopbarButtonProps extends ButtonProps {
    icon: ReactElement<SvgIconProps>;
}

const TopbarButton: FC<TopbarButtonProps> = ({ children, icon, ...props }) => (
    <Button endIcon={icon} {...props}>
        {children}
    </Button>
);

const ClearAllButton: FC = () => (
    <TopbarButton icon={<Clear />}>Clear</TopbarButton>
);

const GoButton: FC = () => {
    const dispatch = useDispatch();

    return (
        <TopbarButton
            icon={<ArrowRight />}
            onClick={() => {
                dispatch(shuffleNewTest());
                dispatch(
                    applicationSlice.actions.testStage(ApplicationState.Test)
                );
                dispatch(currentTestSlice.actions.fetchNext());
            }}
        >
            Go
        </TopbarButton>
    );
};

const Controls: FC = () => (
    <Grid item sm xs container justify="flex-end">
        <Grid item>
            <ClearAllButton />
        </Grid>
        <Grid item>
            <GoButton />
        </Grid>
    </Grid>
);

const Topbar: FC = () => {
    const classes = useStyles();
    const dictionarySize = useSelector(getDictionarySize);

    return (
        <AppBar position="sticky" className={classes.topbar}>
            <Toolbar>
                <Grid item container alignItems="center">
                    <Hidden xsDown>
                        <Grid item sm xs></Grid>
                    </Hidden>
                    <Grid item xs={12} sm={4}>
                        <TotalPairsInfo
                            className={classes.totalPairsInfo}
                            total={dictionarySize}
                        />
                    </Grid>
                    <Hidden xsDown>
                        <Controls />
                    </Hidden>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default Topbar;
