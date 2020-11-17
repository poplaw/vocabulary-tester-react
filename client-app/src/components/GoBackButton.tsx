import {
    IconButton,
    IconButtonProps,
    makeStyles,
    Theme,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import React, { FC, useCallback } from "react";
import {
    applicationSlice,
    ApplicationState,
} from "../store/application/applicationSlice";
import { currentTestSlice } from "../store/currentTest/currentTestSlice";

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

const GoBackButton: FC = () => {
    const dispatch = useDispatch();

    const quit = useCallback(() => {
        dispatch(currentTestSlice.actions.clean());
        dispatch(
            applicationSlice.actions.testStage(
                ApplicationState.DictionarySelection
            )
        );
    }, []);

    return <CloseTestButton onClick={(): void => quit()} />;
};

export default GoBackButton;
