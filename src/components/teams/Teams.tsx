import { Table } from "react-bootstrap";
import { TeamName } from "./Teams.styles";
import TeamAvatar from "./TeamAvatar";
import { Link } from "react-router-dom";
import { ProfileResponse } from "../../API";

const Teams = ({
  teamsList,
  user,
}: {
  teamsList: string[];
  user: ProfileResponse;
}) => {
  const checkExist = (item: string) => {
    return user.teams.includes(item);
  };
  return (
    <Table>
      <tbody>
        {teamsList &&
          teamsList
            .filter((t) => checkExist(t))
            .map((item, i) => {
              return (
                <>
                  <Link to={`/team/${item}`}>
                    <td key={i}>
                      <tr>
                        <TeamName>
                          <TeamAvatar imageLink={"/image/team.jpg"} />
                          {item ? item : "Not Available"}
                        </TeamName>
                      </tr>
                    </td>
                  </Link>
                </>
              );
            })}
      </tbody>
    </Table>
  );
};
export default Teams;
