import randomColor from "randomcolor";
import { Container } from "react-bootstrap";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
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
  aspect?: number;

  /**
   * Flip the direction of the axes.
   * Default to `false`.
   */
  flip?: boolean;

  /**
   * A list of graphs, each of which can be a line or a bar graph.
   * Default to `[]`.
   */
  graphs?: {
    /**
     * Whether to curve the lines between points.
     * Default to `false`.
     */
    curved?: boolean;

    /**
     * Data of the graph. Default to `{}`.
     *
     * Keys of the object are subjects. Each subject corresponds to an array
     * of an array of two values, which are X and Y coordinates, respectively.
     */
    data?: Record<string, [string, number][]>;

    /**
     * Type of the graph. Default to `line`.
     */
    type?: "bar" | "line";
  }[];

  /**
   * Whether to sort all categories on the X-axis.
   * Default to `false`.
   */
  sortXAxis?: boolean;
}

export default function BaseChart(props: ChartProps) {
  const aspect = props.aspect || 4 / 3;
  const flip = props.flip || false;
  const graphs = (props.graphs ?? []).map((graph) => ({
    curved: false,
    data: {},
    type: "line",
    ...graph,
  }));
  const sortXAxis = props.sortXAxis || false;

  const data = Object.values(
    graphs
      .map((graph, index) =>
        Object.values(
          Object.entries(graph.data ?? {})
            .reduce(
              (prev, curr) => [
                ...prev,
                ...curr[1].map((v) => ({
                  x: v[0],
                  [`${index}|${curr[0]}`]: v[1],
                })),
              ],
              [] as Record<string, string | number>[]
            )
            .reduce((prev, curr) => {
              prev[curr.x] = { ...prev[curr.x], ...curr };
              return prev;
            }, {} as Record<string, Record<string, string | number>>)
        )
      )
      .reduce((prev, curr) => {
        curr.forEach((value) => {
          prev[value.x] = { ...prev[value.x], ...value };
        });
        return prev;
      }, {} as Record<string, Record<string, string | number>>)
  );

  if (sortXAxis) {
    data.sort((a, b) => String(a.x).localeCompare(b.x as string));
  }

  return (
    <Container style={{ background: "#fffdfa" }}>
      <ResponsiveContainer aspect={aspect}>
        <ComposedChart
          data={data}
          margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
          layout={flip ? "vertical" : "horizontal"}
        >
          {flip ? (
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
          {Array.from(
            new Set(
              data.reduce(
                (prev, curr) => [
                  ...prev,
                  ...Object.keys(curr).filter((key) => key !== "x"),
                ],
                [] as string[]
              )
            )
          ).map((line, index) => {
            const graphIndex = parseInt(line.split("|")[0]);
            const name = line.split("|").slice(1).join("|");

            return graphs[graphIndex].type === "bar" ? (
              <Bar
                key={index}
                name={name}
                dataKey={line}
                fill={randomColor({ luminosity: "dark" })}
                fillOpacity={0.5}
              />
            ) : (
              <Line
                key={index}
                type={graphs[graphIndex].curved ? "monotone" : "linear"}
                name={name}
                dataKey={line}
                stroke={randomColor({ luminosity: "dark" })}
                strokeWidth={2}
                connectNulls={true}
              />
            );
          })}
        </ComposedChart>
      </ResponsiveContainer>
    </Container>
  );
}
