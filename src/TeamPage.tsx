import { useEffect, useState } from "react";

import { useParams, Link } from "react-router-dom";
import apiMethods, { PlayerList, ProfileResponse } from "./API";
import { Container, Row, Col, Table } from "react-bootstrap";
import Slider from "./components/Slider";
import GraphContainer from "./components/graphContainer/GraphContainer";

const SliderProps = {
  zoomFactor: 30, // How much the image should zoom on hover in percent
  slideMargin: 10, // Margin on each side of slides
  maxVisibleSlides: 5,
  pageTransition: 500, // Transition time when flipping pages
};
const TeamPage: React.FC<{ player: ProfileResponse }> = ({
  player,
}: {
  player: ProfileResponse;
}) => {
  const [playerList, setPlayerList] = useState(null as PlayerList | null);
  // const [data, setData] = useState<PlayerList[]>([]);
  // const [isDialogOpen, setIsDialogOpen] = useState(false);
  // const [activePlayer, setActivePlayer] = useState<PlayerList>();

  // const handleDialogOpen = (players: PlayerList) => {
  //   setIsDialogOpen(true);
  //   setActivePlayer(players);
  // };
  const { teamName } = useParams();

  useEffect(() => {
    apiMethods.getTeam(teamName).then((team) => {
      setPlayerList(team);
    });
  }, [teamName]);
  if (playerList && playerList.players.length < 1) return <div>Loading </div>;

  return (
    <>
      {playerList ? (
        <>
          <Container fluid p-0>
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
          <Table responsive bordered>
            <GraphContainer />
          </Table>
        </>
      ) : (
        <>Loading...</>
      )}
    </>
  );
};
export default TeamPage;
