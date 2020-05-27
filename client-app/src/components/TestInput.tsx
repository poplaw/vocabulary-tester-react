import React, {
    FC,
    useState,
    forwardRef,
    ForwardRefExoticComponent,
} from "react";
import {
    TextField,
    makeStyles,
    FormControl,
    InputLabel,
    Input,
    InputProps,
} from "@material-ui/core";
import AutosizeInput from "react-input-autosize";

const useStyles = makeStyles(() => ({
    root: {
        width: "auto",
    },
    autosizeComponent: {
        "& > input": {
            outline: "none",
            background: "inherit",
            border: "none",
            color: "inherit",
            minWidth: "2em",
            textAlign: "center",
            fontSize: "1em",
        },
    },
}));

const TestInput: ForwardRefExoticComponent<InputProps> = forwardRef<
    Element,
    InputProps
>(({ ...props }, ref) => {
    const classes = useStyles();

    return (
        <Input
            classes={{
                input: classes.autosizeComponent,
            }}
            style={{
                fontSize: "2.5em",
            }}
            autoComplete="off"
            name="textmask"
            id="ffff"
            inputComponent={AutosizeInput}
            inputRef={ref}
            {...props}
        />

        // <AutosizeInput value={value} onChange={e => setValue(e.target.value)} />
    );
});

TestInput.displayName = "TestInput";

export default TestInput;
