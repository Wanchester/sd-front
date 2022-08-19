import { useParams } from "react-router-dom";
const SessionPage = () => {
  const { sessionName } = useParams();
  return <h1>{sessionName}</h1>;
};
export default SessionPage;
