import React, { FC, useCallback } from "react";
import { SnackbarProps, Snackbar, IconButton, Slide } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";

const SnackbarError: FC<SnackbarProps> = ({ ...props }) => {
    const handleClose = useCallback(
        (e): void => props.onClose(e, "clickaway"),
        []
    );

    return (
        <Snackbar
            TransitionComponent={Slide}
            action={
                <>
                    <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={handleClose}
                    >
                        <Close fontSize="small" />
                    </IconButton>
                </>
            }
            {...props}
        >
            <Alert severity="error" onClose={handleClose} variant="filled">
                {props.message}
            </Alert>
        </Snackbar>
    );
};

export default SnackbarError;
