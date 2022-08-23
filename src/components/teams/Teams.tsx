import { Table } from "react-bootstrap";
import { TeamName } from "./Teams.styles";
import TeamAvatar from "./TeamAvatar";
import { Link } from "react-router-dom";

const Teams = ({ teamsList }: { teamsList: string[] }) => {
  return (
    <Table>
      <tbody>
        {teamsList &&
          teamsList.map((item, i) => {
            return (
              <Link to={`/team/${item}`}>
                <td key={i}>
                  <tr>
                    <TeamName>
                      <TeamAvatar imageLink={"image/team.jpg"} />
                      {item ? item : "Not Available"}
                    </TeamName>
                  </tr>
                </td>
              </Link>
            );
          })}
      </tbody>
    </Table>
  );
};
export default Teams;
