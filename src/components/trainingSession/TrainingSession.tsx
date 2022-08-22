import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { ProfileResponse } from "../../API";

const TrainingSession = ({ userList }: { userList: ProfileResponse }) => {
  return (
    <Table responsive bordered variant="dark" className="table-condensed mb-0">
      <thead>
        <td>Session Name</td>
        <td>Session Start</td>
        <td>Session Stop</td>
        <td>Team Name</td>
        <td>Session Duration</td>
      </thead>
      {userList.trainingSessions &&
        userList.trainingSessions.map((session) => {
          return (
            <>
              <tbody>
                <Link
                  to={`/session/${encodeURIComponent(session.sessionName)}/${
                    session.teamName
                  }`}
                >
                  <td>{session.sessionName}</td>
                </Link>
                <td>{session.sessionStart}</td>
                <td>{session.sessionStop}</td>
                <Link to={`/team/${session.teamName}`}>
                  <td>{session.teamName}</td>
                </Link>
                <td>{session.duration}</td>
              </tbody>
            </>
          );
        })}
    </Table>
  );
};
export default TrainingSession;
