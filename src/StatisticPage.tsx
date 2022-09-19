import Sidebar from "./components/Nav/Sidebar";
import { Container, Row, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import DropDownButton from "./components/dropDownButton/DropDownButton";
import GraphContainer from "./components/graphContainer/GraphContainer";
import Breadcrumbs from "./components/breadcrumbs/Breadcrumbs";
import { useState } from "react";
import { ProfileResponse } from "./API";

const StatisticPage = ({ player }: { player: ProfileResponse }) => {
  const { playerName } = useParams();
  const [teams, setTeams] = useState(player.teams);
  return (
    <>
      <Container fluid>
        <Row>
          <Sidebar />
        </Row>
      </Container>
      <Row className="flex-grow-1" sm={6} md={4} lg={3} xl={2}>
        <Breadcrumbs />
      </Row>
      <Table responsive bordered>
        <Row>
          {playerName && (
            <GraphContainer teamReq={teams} nameReq={[playerName]} />
          )}
        </Row>
        <Row sm={3} md={3} lg={3} xl={3}>
          <DropDownButton
            optionList={player.teams}
            setValue={(data: string[]) => {
              setTeams(data);
            }}
          />
        </Row>
      </Table>
    </>
  );
};

export default StatisticPage;
