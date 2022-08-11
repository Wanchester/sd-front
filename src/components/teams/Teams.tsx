import Table from "react-bootstrap/Table";
import { TeamName } from "./Teams.styles";
const Teams = ({ teamsList }: { teamsList: any }) => {
  return (
    <Table>
      <tbody>
        {teamsList &&
          Object.keys(teamsList.team).map((key, i) => {
            return (
              <tr key={i}>
                <td>
                  <TeamName>
                    {/* <TeamAvatar imageLink={TestImage} /> */}
                    {teamsList.team[key]
                      ? teamsList.team[key]
                      : "Not Available"}
                  </TeamName>
                </td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
};
export default Teams;
