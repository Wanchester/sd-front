import react from "react";
import { useParams } from "react-router-dom";
const TeamPage = () => {
  const { teamName } = useParams();
  return <h1>{teamName}</h1>;
};
export default TeamPage;
