import { Table, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ProfileResponse } from "../../API";

const TrainingSession = ({
  trainingList,
}: {
  trainingList: ProfileResponse["trainingSessions"];
}) => {
  return (
    <Table responsive bordered variant="dark" className="table-condensed mb-0">
      <Row>
        <Col xs={2} md={2} lg={2} xl={2}>
          Session Name
        </Col>
        <Col xs={3} md={3} lg={3} xl={3}>
          Session Start
        </Col>
        <Col xs={3} md={3} lg={3} xl={3}>
          Session Stop
        </Col>
        <Col xs={2} md={2} lg={2} xl={2}>
          Team Name
        </Col>
        <Col xs={2} md={2} lg={2} xl={2}>
          Session Duration
        </Col>
      </Row>
      {trainingList &&
        trainingList.map((session) => {
          return (
            <>
              <Row className="responsive">
                <Col xs={2} md={2} lg={2} xl={2}>
                  <Link
                    to={`/session/${encodeURIComponent(session.sessionName)}`}
                  >
                    {session.sessionName}
                  </Link>
                </Col>
                <Col xs={3} md={3} lg={3} xl={3}>
                  {session.sessionStart}
                </Col>
                <Col xs={3} md={3} lg={3} xl={3}>
                  {session.sessionStop}
                </Col>
                <Col xs={2} md={2} lg={2} xl={2}>
                  <Link to={`/team/${session.teamName}`}>
                    {session.teamName}
                  </Link>
                </Col>
                <Col xs={2} md={2} lg={2} xl={2}>
                  {session.duration}
                </Col>
              </Row>
            </>
          );
        })}
    </Table>
  );
};
export default TrainingSession;
