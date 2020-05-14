import React, { FC, ReactElement } from "react";

import {
    Toolbar,
    AppBar,
    Button,
    makeStyles,
    SvgIconProps,
    Grid,
    Hidden,
} from "@material-ui/core";
import { Clear, ArrowRight } from "@material-ui/icons";
import TotalPairsInfo from "./TotalParisInfo";

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

interface TopbarButtonProps {
    icon: ReactElement<SvgIconProps>;
}

const TopbarButton: FC<TopbarButtonProps> = ({ children, icon }) => (
    <Button endIcon={icon}>{children}</Button>
);

const ClearAllButton: FC = () => (
    <TopbarButton icon={<Clear />}>Clear</TopbarButton>
);

const GoButton: FC = () => (
    <TopbarButton icon={<ArrowRight />}>Go</TopbarButton>
);

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
                            total={0}
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
