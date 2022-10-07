import { useEffect, useState } from "react";
import { Nav, Tab, Row, Col, Container, Spinner } from "react-bootstrap";
import BaseChart, { ChartProps } from "../charts/BaseChart";
import apiMethods, { CombinationGraphResponse, StatisticData } from "../../API";

export interface GraphContainerProps {
  teamReq?: string[];
  nameReq?: string[];
  sessionReq?: string[];
  isComposed?: boolean;
  isLine?: boolean;
}

const GraphContainer = (props: GraphContainerProps) => {
  const [data, setData] = useState(
    null as CombinationGraphResponse | StatisticData | null
  );
  const [fields, setFields] = useState(null as string[] | null);
  const [selectedField, setSelectedField] = useState(null as string | null);
  useEffect(() => {
    if (props.isComposed) {
      console.log(props.nameReq, props.sessionReq, props.teamReq);
      apiMethods
        .getCombinationGraphStatistic(
          props.teamReq || undefined,
          props.nameReq || undefined,
          props.sessionReq || undefined
        )
        .then((d) => {
          setData(d);
          const newFields = Array.from(
            new Set(
              [d.line, d.bar].reduce(
                (prev, curr) => [...prev, ...Object.keys(curr)],
                [] as string[]
              )
            )
          );
          setFields(newFields);
          setSelectedField(newFields[0] || null);
        });
    } else {
      apiMethods
        .getLineGraphStatistic(
          props.teamReq || [],
          props.nameReq || [],
          props.sessionReq || [],
          undefined,
          props.isLine ? 1000 : undefined
        )
        .then((d) => {
          setData(d);
          const newFields = Array.from(
            new Set(
              Object.values(d).reduce(
                (prev, curr) => [...prev, ...Object.keys(curr)],
                [] as string[]
              )
            )
          );
          setFields(newFields);
          setSelectedField(newFields[0] || null);
        });
    }
  }, [
    props.teamReq,
    props.nameReq,
    props.sessionReq,
    props.isComposed,
    props.isLine,
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
    <Container className="responsive h-100 w-100">
      <Tab.Container>
        <Row>
          {data && fields ? (
            <>
              <Col sm={3} md={3} lg={3} xl={3}>
                <Nav
                  className="flex-column"
                  variant="pills"
                  onSelect={(field) => setSelectedField(field)}
                >
                  <>
                    {fields.map((value, index) => (
                      <Nav.Item>
                        <Nav.Link
                          key={index}
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
                {props.isComposed ? (
                  //to be completed
                  <Tab.Content>
                    {selectedField && <BaseChart graphs={processedData} />}
                  </Tab.Content>
                ) : (
                  <Tab.Content>
                    {
                      <BaseChart
                        flip={props.isLine ? false : true}
                        graphs={processedData}
                        sortXAxis={true}
                      />
                    }
                  </Tab.Content>
                )}
              </Col>
            </>
          ) : (
            <Spinner animation="border" variant="light" />
          )}
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default GraphContainer;
