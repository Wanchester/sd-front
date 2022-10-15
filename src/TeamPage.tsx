import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
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

  if (playerList && playerList.players.length < 1) {
    return <div>No statistics.</div>;
  }

  return (
    <Container>
      {playerList && playerNames ? (
        <>
          {teamName && <Header content={teamName} userRole={user.role} />}
          {playerList ? (
            <>
              <Row>
                <Col className="mb-2">
                  <h2>Player List</h2>
                </Col>
              </Row>
              <Slider {...SliderProps}>
                {playerList &&
                  playerList.players.map((p, i) =>
                    user.role !== "player" ? (
                      <Link key={i} to={`/player/${p.username}`}>
                        <div>
                          <img src="/image/player.jpg" alt="player's avatar" />
                          <>{p.name}</>
                        </div>
                      </Link>
                    ) : (
                      <div key={i}>
                        <img src="/image/player.jpg" alt="player's avatar" />
                        <>{p.name}</>
                      </div>
                    )
                  )}
              </Slider>
              <Row className="g-0">
                <Col xs={12} className="py-4">
                  <h3 className="mb-3">All-time Performance</h3>
                  {teamName && playerNames && (
                    <GraphContainer teamReq={[teamName]} isComposed={true} />
                  )}
                </Col>
                <Col xs={12} className="py-4">
                  <h3 className="mb-3">Player Performance</h3>
                  {teamName && playerNames && (
                    <GraphContainer
                      teamReq={[teamName]}
                      nameReq={playerNames}
                    />
                  )}
                </Col>
                <Col xs={12} className="py-4">
                  {teamSession && (
                    <TrainingSession trainingList={teamSession} />
                  )}
                </Col>
              </Row>
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
