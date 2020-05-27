import React, { FC } from "react";
import PropTypes, { checkPropTypes } from "prop-types";
import { Typography } from "@material-ui/core";
import { CSSProperties } from "@material-ui/core/styles/withStyles";

interface TotalPairsInfoProps {
    total: number;
    style?: CSSProperties;
    className?: string;
}

const TotalPairsInfo: FC<TotalPairsInfoProps> = ({
    total,
    style,
    className,
}) => (
    <Typography className={className} style={style}>
        Total Pairs: {total}
    </Typography>
);

export default TotalPairsInfo;
