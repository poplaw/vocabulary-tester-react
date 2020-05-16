import React, { FC, useState, forwardRef } from "react";
import {
    TextField,
    makeStyles,
    FormControl,
    InputLabel,
    Input,
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

const TestInput: FC = () => {
    const classes = useStyles();

    const [value, setValue] = useState<string>("");

    return (
        <Input
            value={value}
            onChange={e => setValue(e.target.value)}
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
        />

        // <AutosizeInput value={value} onChange={e => setValue(e.target.value)} />
    );
};

export default TestInput;
