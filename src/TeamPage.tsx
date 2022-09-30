import { useEffect, useState } from "react";

import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Table } from "react-bootstrap";
import Slider from "./components/Slider";
import apiMethods, { PlayerList, ProfileResponse } from "./API";
import GraphContainer from "./components/graphContainer/GraphContainer";
import Header from "./components/header/Header";
import TrainingSession from "./components/trainingSession/TrainingSession";
import SortableTable from "./components/sortTable/SortableTable";
import data from "./components/sortTable/data.json";
import TableA from "./components/table2/Table";

const SliderProps = {
  zoomFactor: 30, // How much the image should zoom on hover in percent
  slideMargin: 10, // Margin on each side of slides
  maxVisibleSlides: 5,
  pageTransition: 500, // Transition time when flipping pages
};
export interface StatsInterface {
  players: {
    name: string;
    velocity: number;
    accumulativeSpeed: number;
    sprint: number;
    highDistance: number;
  }[];
}
const TeamPage: React.FC<{ player: ProfileResponse }> = ({
  player,
}: {
  player: ProfileResponse;
}) => {
  const [playerList, setPlayerList] = useState(null as PlayerList | null);
  const [playerNames, setPlayerNames] = useState([] as string[]);
  const [teamSession, setTeamSession] = useState(
    null as ProfileResponse["trainingSessions"] | null
  );
  const [error, setError] = useState("");
  // const [isDialogOpen, setIsDialogOpen] = useState(false);
  // const [activePlayer, setActivePlayer] = useState<PlayerList>();

  // const handleDialogOpen = (players: PlayerList) => {
  //   setIsDialogOpen(true);
  //   setActivePlayer(players);
  // };
  const { teamName } = useParams();

  const stats = {
    players: [
      {
        name: "Exon",
        velocity: 95.873504,
        accumulativeSpeed: 53.451225,
        sprint: 68.543404,
        highDistance: 73.815111,
      },
      {
        name: "Nolan",
        velocity: 42.425079,
        accumulativeSpeed: 82.613942,
        sprint: 17.304824,
        highDistance: 62.971031,
      },
      {
        name: "T Mac",
        velocity: 35.735305,
        accumulativeSpeed: 75.41648,
        sprint: 90.586585,
        highDistance: 76.169279,
      },
      {
        name: "Warren",
        velocity: 61.164792,
        accumulativeSpeed: 94.613926,
        sprint: 58.679664,
        highDistance: 59.274107,
      },
    ],
  };

  useEffect(() => {
    apiMethods
      .getTeam(teamName)
      .then((team) => {
        setPlayerList(team);
        setPlayerNames(
          Array.from(
            team.players.map(function (r) {
              return r.name;
            })
          )
        );
      })
      .catch((e) => {
        console.error(e);
        setError(e.response.data.error);
      });
    if (teamName) {
      apiMethods
        .getTrainingSession(
          player.role === "player" ? [player.name] : undefined,
          [teamName],
          []
        )
        .then((session) => setTeamSession(session));
    }
  }, [teamName, player.name, player.role]);

  if (playerList && playerList.players.length < 1) return <div>Loading </div>;

  return (
    <>
      {teamName && (
        <Col>
          <Header content={teamName} />
        </Col>
      )}
      {playerList ? (
        <>
          <Container fluid>
            <Row>
              <Col md={{ span: 7, offset: 2 }}>
                <h2>Player List</h2>
              </Col>
            </Row>
            <Row>
              <Col>
                <Slider {...SliderProps}>
                  {playerList &&
                    playerList.players.map((p) =>
                      player.role !== "player" ? (
                        <Link to={`/player/${p.username}`}>
                          <div key={p.name}>
                            <img
                              src="https://st.depositphotos.com/2101611/3925/v/600/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg"
                              alt="xd"
                            />
                            <>{p.name}</>
                          </div>
                        </Link>
                      ) : (
                        <div key={p.name}>
                          <img
                            src="https://st.depositphotos.com/2101611/3925/v/600/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg"
                            alt="xd"
                          />
                          <>{p.name}</>
                        </div>
                      )
                    )}
                </Slider>
              </Col>
            </Row>
          </Container>
          <Table responsive bordered className="justify-content-md-center">
            <Row className="col-md-8 offset-md-1">
              {teamName && playerNames && (
                <GraphContainer teamReq={[teamName]} isComposed={true} />
              )}
            </Row>
            <Row className="col-md-8 offset-md-1">
              {teamName && playerNames && (
                <GraphContainer teamReq={[teamName]} nameReq={playerNames} />
              )}
            </Row>
            <Row className="col-md-10 offset-md-1">
              {teamSession && <TrainingSession trainingList={teamSession} />}
            </Row>
          </Table>
          <Table>
            <Row>
              <SortableTable data={data} />
            </Row>
            <Row>
              <Col md={{ span: 7, offset: 2 }}>
                <TableA stats={stats} />
              </Col>
            </Row>
          </Table>
        </>
      ) : (
        <>{error}</>
      )}
    </>
  );
};
export default TeamPage;
