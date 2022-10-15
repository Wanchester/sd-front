import { useEffect, useState } from "react";
import { Nav, Tab, Row, Col, Button } from "react-bootstrap";
import BaseChart, { ChartProps } from "../charts/BaseChart";
import apiMethods, {
  AggregateFunc,
  CombinationGraphResponse,
  StatisticData,
} from "../../API";
import { LoadingSpinner } from "../loadingSpinner/LoadingSpinner";

export interface GraphContainerProps {
  teamReq?: string[];
  nameReq?: string[];
  sessionReq?: string[];
  isComposed?: boolean;
  isLine?: boolean;
}

const GraphContainer = (props: GraphContainerProps) => {
  const [func, setFunc] = useState("mean" as AggregateFunc);
  const [{ data, fields, selectedField }, setState] = useState({
    data: null as CombinationGraphResponse | StatisticData | null,
    fields: null as string[] | null,
    selectedField: null as string | null,
  });

  useEffect(() => {
    setState({ data: null, fields, selectedField });

    if (props.isComposed) {
      apiMethods
        .getCombinationGraphStatistic(
          props.teamReq,
          props.nameReq,
          props.sessionReq,
          func
        )
        .then((d) => {
          const newFields = Array.from(
            new Set(
              [d.line, d.bar].reduce(
                (prev, curr) => [...prev, ...Object.keys(curr)],
                [] as string[]
              )
            )
          );
          setState({
            data: d,
            fields: newFields,
            selectedField: newFields[0] || null,
          });
        });
    } else {
      apiMethods
        .getLineGraphStatistic(
          props.teamReq || [],
          props.nameReq || [],
          props.sessionReq || [],
          func,
          props.isLine ? 1000 : undefined
        )
        .then((d) => {
          const newFields = Array.from(
            new Set(
              Object.values(d).reduce(
                (prev, curr) => [...prev, ...Object.keys(curr)],
                [] as string[]
              )
            )
          );
          setState({
            data: d,
            fields: newFields,
            selectedField: newFields[0] || null,
          });
        });
    }
    // eslint-disable-next-line
  }, [
    props.teamReq,
    props.nameReq,
    props.sessionReq,
    props.isComposed,
    props.isLine,
    func,
  ]);

  const processedData = (
    data && selectedField
      ? props.isComposed
        ? [
            {
              type: "bar",
              data: (data as CombinationGraphResponse).bar[
                selectedField
              ].reduce((prev, curr) => {
                if (!prev[selectedField]) {
                  prev[selectedField] = [];
                }
                prev[selectedField].push([curr[0], curr[1]]);
                return prev;
              }, {} as Record<string, [string, number][]>),
            },
            {
              type: "line",
              data: {
                Average: (data as CombinationGraphResponse).line[selectedField],
              },
            },
          ]
        : [
            {
              type: props.isLine ? "line" : "bar",
              data: Object.fromEntries(
                Object.entries(data as StatisticData).map((entry) => [
                  entry[0],
                  entry[1][selectedField],
                ])
              ),
            },
          ]
      : undefined
  ) as ChartProps["graphs"];

  return (
    <Tab.Container>
      <Row>
        {fields ? (
          <>
            <Col sm={3} md={3} lg={3} xl={3}>
              <Nav
                className="flex-column"
                variant="pills"
                onSelect={(field) =>
                  setState({ data, fields, selectedField: field })
                }
              >
                <>
                  {fields.map((value, index) => (
                    <Nav.Item key={index}>
                      <Nav.Link
                        eventKey={value}
                        active={value === selectedField}
                      >
                        {value}
                      </Nav.Link>
                    </Nav.Item>
                  ))}
                </>
              </Nav>
            </Col>
            <Col sm={9} md={9} lg={9} xl={9}>
              {processedData ? (
                props.isComposed ? (
                  <Tab.Content>
                    <BaseChart
                      graphs={processedData}
                      tooltipLabelFormatter={(value) =>
                        new Date(value).toLocaleString()
                      }
                      xAxisValueFormatter={(value) =>
                        new Date(value).toLocaleDateString()
                      }
                    />
                  </Tab.Content>
                ) : (
                  <Tab.Content>
                    <BaseChart
                      flip={props.isLine ? false : true}
                      graphs={processedData}
                      sortXAxis={true}
                      tooltipLabelFormatter={(value) =>
                        new Date(value).toLocaleString()
                      }
                      xAxisValueFormatter={(value) =>
                        new Date(value).toLocaleDateString()
                      }
                    />
                  </Tab.Content>
                )
              ) : (
                <LoadingSpinner
                  isComponent={true}
                  componentTitle={"Statistic Graph"}
                />
              )}
              <div className="d-flex align-items-center mt-2">
                <p className="mb-0 text-nowrap text-white">Metrics:</p>
                <div className="w-100 text-center">
                  <Button
                    className="me-1 me-sm-3"
                    size="sm"
                    type="button"
                    variant={func === "mean" ? "primary" : "light"}
                    onClick={() => {
                      if (func !== "mean") {
                        setFunc("mean");
                      }
                    }}
                  >
                    Average
                  </Button>
                  <Button
                    className="me-1 me-sm-3"
                    size="sm"
                    type="button"
                    variant={func === "min" ? "primary" : "light"}
                    onClick={() => {
                      if (func !== "min") {
                        setFunc("min");
                      }
                    }}
                  >
                    Minimum
                  </Button>
                  <Button
                    className="me-1 me-sm-3"
                    size="sm"
                    type="button"
                    variant={func === "max" ? "primary" : "light"}
                    onClick={() => {
                      if (func !== "max") {
                        setFunc("max");
                      }
                    }}
                  >
                    Maximum
                  </Button>
                </div>
              </div>
            </Col>
          </>
        ) : (
          <LoadingSpinner isComponent={true} componentTitle={"Data"} />
        )}
      </Row>
    </Tab.Container>
  );
};

export default GraphContainer;
