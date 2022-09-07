import randomColor from "randomcolor";
import { Container } from "react-bootstrap";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export interface ChartProps {
  /**
   * The width / height ratio for drawing the charts.
   * Default to `4/3`.
   */
  aspect: number;

  /**
   * Whether to curve the lines between points.
   * Default to `false`.
   */
  curved: boolean;

  /**
   * Data of the graph. Default to `{}`.
   *
   * Keys of the object are subjects. Each subject corresponds to an array
   * of an array of two values, which are X and Y coordinates, respectively.
   */
  data: Record<string, [string, number][]>;

  /**
   * Type of the graph. Default to `line`.
   */
  type: "bar" | "barHorizontal" | "line";
}

export default function BaseChart(props: Partial<ChartProps>) {
  props = {
    aspect: 4 / 3,
    curved: false,
    data: {},
    type: "line",
    ...props,
  };

  const Chart = props.type === "line" ? LineChart : BarChart;

  return (
    <Container style={{ background: "#fffdfa" }}>
      <ResponsiveContainer aspect={props.aspect}>
        <Chart
          data={Object.values(
            Object.entries(props.data ?? {})
              .reduce(
                (prev, curr) => [
                  ...prev,
                  ...curr[1].map((v) => ({ x: v[0], [curr[0]]: v[1] })),
                ],
                [] as Record<string, string | number>[]
              )
              .reduce((prev, curr) => {
                prev[curr.x] = { ...prev[curr.x], ...curr };
                return prev;
              }, {} as Record<string, Record<string, string | number>>)
          )}
          margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
          layout={props.type === "barHorizontal" ? "vertical" : "horizontal"}
        >
          {props.type === "barHorizontal" ? (
            <>
              <XAxis type="number" />
              <YAxis dataKey="x" type="category" />
            </>
          ) : (
            <>
              <XAxis dataKey="x" />
              <YAxis />
            </>
          )}
          <Tooltip />
          <Legend verticalAlign="top" height={36} />
          <CartesianGrid stroke="#d3d3d3" strokeDasharray="5 5" />
          {Object.keys(props.data ?? {}).map((line, index) =>
            props.type === "line" ? (
              <Line
                key={index}
                type={props.curved ? "monotone" : "linear"}
                dataKey={line}
                stroke={randomColor({ luminosity: "dark" })}
                strokeWidth={2}
                connectNulls={true}
              />
            ) : (
              <Bar
                key={index}
                dataKey={line}
                fill={randomColor({ luminosity: "dark" })}
              />
            )
          )}
        </Chart>
      </ResponsiveContainer>
    </Container>
  );
}
