import * as d3 from "d3";
import Margin from "./utils/Margin";
import styles from "../PieChart/PieChart.module.css";
import { PieArcDatum } from "d3";

export class PieChartSeries {
    private color: string;
    private value: number;
    private caption: string;

    constructor(color: string, value: number, caption: string) {
        this.color = color;
        this.value = value;
        this.caption = caption;
    }

    getCaption(): string {
        return this.caption;
    }

    getValue(): number {
        return this.value;
    }

    getColor(): string {
        return this.color;
    }
}

export class PieChartSeriesNullObject extends PieChartSeries {
    constructor() {
        super("", 0, "");
    }

    getCaption = (): string => "";
    getValue(): number {
        return 0;
    }
}

export class PieChart {
    size: number;
    margin: Margin;
    data?: PieChartSeries[];
    arc: d3.Arc<any, PieArcDatum<PieChartSeries>>;
    path: any;
    pieGenerator: d3.Pie<any, PieChartSeries>;
    onSelectionChange?: (selection: PieChartSeries) => void;

    constructor(size: number, margin: Margin) {
        this.size = size;
        this.margin = margin;
        this.arc = this.calculateArc();
        this.pieGenerator = this.calculatePieGenerator();
    }

    public setSize(size: number) {
        this.size = size;
        this.arc = this.calculateArc();
    }

    private calculateArc(): d3.Arc<any, PieArcDatum<PieChartSeries>> {
        const arc = d3
            .arc<PieArcDatum<PieChartSeries>>()
            .innerRadius(
                (this.size - this.margin.top - this.margin.bottom) / 3.3
            )
            .outerRadius(
                (this.size - this.margin.top - this.margin.bottom) / 2
            );

        return arc;
    }

    private calculatePieGenerator(): d3.Pie<any, PieChartSeries> {
        const pg = d3
            .pie<PieChartSeries>()
            .value(d => d.getValue())
            .sort(null);

        return pg;
    }

    setData(data: PieChartSeries[]): void {
        this.data = data;
    }

    render(context: SVGGElement, noTransition?: boolean): void {
        if (!this.data) return;

        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this;

        this.path = d3
            .select(context)
            .selectAll(".pieChartPath")
            .data(this.pieGenerator(this.data));

        this.path
            .exit()
            .transition("" + Math.random())
            .ease(d3.easeCubicInOut)
            .duration(500)
            .attrTween("d", function exitTween(d: PieChartSeries) {
                const end = Object.assign({}, this._current, {
                    startAngle: this._current.endAngle,
                });
                const i = d3.interpolate<d3.PieArcDatum<PieChartSeries>>(
                    d,
                    end
                );
                return function (t: number): string {
                    return self.arc(i(t));
                };
            })
            .remove();

        this.path
            .enter()
            .append("path")
            .each(function (d: PieArcDatum<PieChartSeries>) {
                this._current = Object.assign({}, d, {
                    startAngle: d.endAngle,
                });
            })
            .attr("class", `${styles.pieChartPath} pieChartPath`)
            .on("mousemove", (d: PieArcDatum<PieChartSeries>) => {
                this.onSelectionChange && this.onSelectionChange(d.data);
            })
            .on("mouseleave", () => {
                this.onSelectionChange &&
                    this.onSelectionChange(new PieChartSeriesNullObject());
            })
            .attr("fill", (d: PieArcDatum<PieChartSeries>) => d.data.getColor())
            .transition("" + Math.random())
            .ease(d3.easeCubicInOut)
            .duration(500)
            .attrTween("d", function arcTween(d: PieArcDatum<PieChartSeries>) {
                const originalEnd = d.endAngle;
                return (t: number): string => {
                    const angleInterpolation = d3.interpolate(
                        self.pieGenerator.startAngle()(),
                        self.pieGenerator.endAngle()()
                    );
                    const currentAngle = angleInterpolation(t);
                    if (currentAngle < d.startAngle) {
                        return "";
                    }

                    d.endAngle = Math.min(currentAngle, originalEnd);

                    return self.arc(d);
                };
            });

        this.path.merge(this.path);

        if (!noTransition) {
            this.path
                .transition("" + Math.random())
                .ease(d3.easeCubicInOut)
                .duration(500)
                .attrTween("d", function arcTween(
                    d: PieArcDatum<PieChartSeries>
                ) {
                    const i = d3.interpolate<d3.PieArcDatum<PieChartSeries>>(
                        this._current,
                        d
                    );
                    this._current = i(0);
                    return function (t: number): string {
                        return self.arc(i(t));
                    };
                });
        }
    }
}
