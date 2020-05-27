import React, { FC, useCallback, useEffect } from "react";
import {
    DialogProps,
    Dialog,
    DialogTitle,
    makeStyles,
    DialogContent,
    Typography,
    DialogActions,
    Button,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles(() => ({
    paper: {
        backgroundColor: red[500],
        minWidth: "300px",
    },
}));

const ModalError: FC<DialogProps> = ({ ...props }) => {
    const classes = useStyles();

    const handleClose = useCallback(
        (e): void => props.onClose(e, "backdropClick"),
        []
    );

    return (
        <Dialog classes={classes} {...props}>
            <DialogTitle id="error-dialog-title">Error</DialogTitle>
            <DialogContent>
                <Typography variant="body1" component="h6">
                    {props.children}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>OK</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalError;
