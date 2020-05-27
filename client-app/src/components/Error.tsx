import React, { FC, useCallback } from "react";
import SnackbarError from "./errorIndicators/SnackbarError";
import {
    isModal,
    getErrorMessage,
    isError,
    errorSlice,
} from "../store/error/errorSlice";
import { useSelector, useDispatch } from "react-redux";
import ModalError from "./errorIndicators/ModalError";

const Error: FC = () => {
    const showModal = useSelector(isModal);
    const errorMessage = useSelector(getErrorMessage);
    const showError = useSelector(isError);
    const dispatch = useDispatch();

    const handleClose = useCallback(() => {
        dispatch(errorSlice.actions.hideError());
    }, []);

    return (
        <>
            <SnackbarError
                open={showError && !showModal}
                message={errorMessage}
                autoHideDuration={2000}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
                onClose={handleClose}
            />
            <ModalError open={showError && showModal} onClose={handleClose}>
                {errorMessage}
            </ModalError>
        </>
    );
};

export default Error;
