import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiMethods, { TrainingSession } from "./API";
const SessionPage = () => {
  const { sessionName, team } = useParams();
  const [trainingSession, setTrainingSession] = useState(
    null as TrainingSession | null
  );
  useEffect(() => {
    if (sessionName && team)
      apiMethods
        .getTrainingSession(sessionName, team)
        .then((session) => {
          setTrainingSession(session);
        })
        .catch((e) => {
          console.log(e);
        });
  }, [sessionName, team]);
  return (
    <>
      {trainingSession && (
        <>
          <h1>{trainingSession.sessionName}</h1>
          <h2>{trainingSession.sessionStart}</h2>
          <h2>{trainingSession.sessionStop}</h2>
          <h2>{trainingSession.teamName}</h2>
          <h2>{trainingSession.duration}</h2>
        </>
      )}
    </>
  );
};
export default SessionPage;
