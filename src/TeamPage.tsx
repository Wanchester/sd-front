import { useEffect, useState } from "react";

import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Table } from "react-bootstrap";
import { LoadingSpinner } from "./components/loadingSpinner/LoadingSpinner";
import Slider from "./components/Slider";
import apiMethods, { PlayerList, ProfileResponse } from "./API";
import GraphContainer from "./components/graphContainer/GraphContainer";
import Header from "./components/header/Header";
import TrainingSession from "./components/trainingSession/TrainingSession";

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
const TeamPage: React.FC<{ user: ProfileResponse }> = ({
  user,
}: {
  user: ProfileResponse;
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
          user.role === "player" ? [user.name] : undefined,
          [teamName],
          []
        )
        .then((session) => setTeamSession(session));
    }
  }, [teamName, user.name, user.role]);

  if (playerList && playerList.players.length < 1) return <div>Loading </div>;

  return (
    <Container fluid>
      {playerList && playerNames ? (
        <>
          {teamName && (
            <Col>
              <Header content={teamName} userRole={user.role} />
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
                          user.role !== "player" ? (
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
                    <GraphContainer
                      teamReq={[teamName]}
                      nameReq={playerNames}
                    />
                  )}
                </Row>
                <Row className="col-md-10 offset-md-1">
                  {teamSession && (
                    <TrainingSession trainingList={teamSession} />
                  )}
                </Row>
              </Table>
            </>
          ) : (
            <>{error}</>
          )}
        </>
      ) : (
        <LoadingSpinner />
      )}
    </Container>
  );
};
export default TeamPage;
