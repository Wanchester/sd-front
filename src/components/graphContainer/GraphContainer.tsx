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
  }, []);
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
                <Tab.Content>
                  {selectedField && (
                    <BaseChart
                      data={Object.fromEntries(
                        Object.entries(data).map((entry) => [
                          entry[0],
                          entry[1][selectedField],
                        ])
                      )}
                    />
                  )}
                </Tab.Content>
              </Col>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default GraphContainer;
