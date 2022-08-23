import { useEffect, useState } from "react";

import { useParams, Link } from "react-router-dom";
import apiMethods, { PlayerList } from "./API";
import { Container, Row, Col } from "react-bootstrap";
import Slider from "./components/Slider";

const SliderProps = {
  zoomFactor: 30, // How much the image should zoom on hover in percent
  slideMargin: 10, // Margin on each side of slides
  maxVisibleSlides: 5,
  pageTransition: 500, // Transition time when flipping pages
};
const TeamPage: React.FC = () => {
  const [playerList, setPlayerList] = useState({
    players: [
      {
        name: "Exon",
        username: "p_exon",
      },
      {
        name: "Nolan",
        username: "p_nolan",
      },
      {
        name: "T Mac",
        username: "p_tmac",
      },
      {
        name: "Warren",
        username: "p_warren",
      },
    ],
  } as PlayerList);
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
              playerList.players.map((p) => (
                <Link to={`/player/${p.username}`}>
                  <div key={p.name}>
                    <img
                      src="https://st.depositphotos.com/2101611/3925/v/600/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg"
                      alt="xd"
                    />
                    <>{p.name}</>
                  </div>
                </Link>
              ))}
          </Slider>
        </Col>
      </Row>
    </Container>
  );
};
export default TeamPage;
