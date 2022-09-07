import React, { useEffect, useState } from "react";
import { Nav, Tab, Row, Col, Container } from "react-bootstrap";
import BaseChart from "../charts/BaseChart";
import apiMethods, { StatisticData } from "../../API";

const GraphContainer = () => {
  const [data, setData] = useState(null as StatisticData | null);
  const [fields, setFields] = useState(null as string[] | null);
  const [selectedField, setSelectedField] = useState(null as string | null);
  useEffect(() => {
    apiMethods.getLineGraphStatistic().then((d) => {
      setData(d);
      setFields(
        Array.from(
          new Set(
            Object.values(d).reduce(
              (prev, curr) => [...prev, ...Object.keys(curr)],
              [] as string[]
            )
          )
        )
      );
    });
  }, []);
  useEffect(() => {
    if (fields) {
      setSelectedField(fields[0]);
    }
  }, [fields]);
  return (
    <Container className="responsive h-100 w-100">
      <Tab.Container id="left-tabs-example">
        <Row>
          {data && fields && (
            <>
              <Col sm={3} md={3} lg={3} xl={3}>
                <Nav
                  variant="pills"
                  className="flex-column"
                  defaultActiveKey={fields[0]}
                >
                  <Nav.Item>
                    <>
                      {fields &&
                        fields.map((value) => {
                          <Nav.Link
                            eventKey={value}
                            onClick={() => {
                              setSelectedField(value);
                            }}
                          >
                            {value}
                          </Nav.Link>;
                        })}
                    </>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={9} md={9} lg={9} xl={9}>
                <Tab.Content className="h-50 d-inline-block">
                  {selectedField && (
                    <Tab.Pane
                      eventKey={selectedField}
                      className="pb-1 postition-relative h-100 w-100"
                    >
                      {data && selectedField ? (
                        <BaseChart
                          data={Object.fromEntries(
                            Object.entries(data).map((entry) => [
                              entry[0],
                              entry[1][selectedField],
                            ])
                          )}
                        />
                      ) : (
                        <></>
                      )}
                    </Tab.Pane>
                  )}
                </Tab.Content>
              </Col>
            </>
          )}
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default GraphContainer;
