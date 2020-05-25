import Margin from "../charts/utils/Margin";
import {
    PieChart,
    PieChartSeriesNullObject,
    PieChartSeries,
} from "../charts/PieChart";

import React, { FC, useState, useEffect, useRef, useCallback } from "react";
import ReactResizeDetector from "react-resize-detector";
import numeral from "numeral";

import { makeStyles } from "@material-ui/core/styles";
import { CSSProperties } from "@material-ui/core/styles/withStyles";

const useStyles = makeStyles(theme => ({
    svg: {
        "& text": {
            fontSize: "16px",
            fill: theme.palette.text.primary,
        },
    },
}));

interface PieChartProps {
    margin: Margin;
    data: PieChartSeries[];
    style: CSSProperties;
    valueFieldFormatting: string;
    onCurrentSelectionChange: any;
}

const PieChartComponent: FC<PieChartProps> = ({
    margin = {
        bottom: 30,
        top: 30,
        left: 30,
        right: 30,
    },
    ...props
}) => {
    const classes = useStyles();

    const chartArea = useRef<SVGGElement>(null);

    const [size, setSize] = useState(400);
    const chart = useRef<PieChart>(new PieChart(size, margin));

    useEffect(() => {
        chart.current.onSelectionChange = (e: PieChartSeries) =>
            setCurrentSelection(e);
    }, []);

    const [currentSelection, setCurrentSelection] = useState<PieChartSeries>(
        new PieChartSeriesNullObject()
    );

    useEffect(() => {
        if (chartArea.current === null || props.data.length === 0) return;

        chart.current.setData(props.data);

        chart.current.render(chartArea.current);
    }, [props.data]);

    useEffect(() => {
        if (chartArea.current === null) return;

        chart.current.setSize(size);
        chart.current.render(chartArea.current, true);
    }, [size]);

    const onCurrentSelectionChange = useCallback(
        props.onCurrentSelectionChange,
        [props.onCurrentSelectionChange]
    );

    useEffect(() => {
        onCurrentSelectionChange && onCurrentSelectionChange(currentSelection);
    }, [onCurrentSelectionChange, currentSelection]);

    // useEffect(() => {}, [path]);

    return (
        <div style={props.style}>
            <ReactResizeDetector
                handleHeight
                handleWidth
                onResize={w => {
                    setSize(w);
                }}
            />
            <svg className={classes.svg} width={"99%"} height={size}>
                <g
                    transform={`translate(${size / 2}, ${size / 2})`}
                    ref={chartArea}
                ></g>
                <g transform={`translate(${size / 2}, ${size / 2})`}>
                    <text textAnchor="middle" dy="-0.5em">
                        {currentSelection.getCaption()}
                    </text>
                    <text textAnchor="middle" dy="0.5em">
                        {currentSelection.getCaption() !== "" &&
                            numeral(currentSelection.getValue()).format(
                                props.valueFieldFormatting
                            )}
                    </text>
                </g>
            </svg>
        </div>
    );
};

export default PieChartComponent;
