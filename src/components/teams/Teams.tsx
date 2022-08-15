import Table from "react-bootstrap/Table";
import { TeamName } from "./Teams.styles";

import React from "react";
import TeamAvatar from "./TeamAvatar";
import { Link } from "react-router-dom";
const Teams = ({ teamsList }: { teamsList: any }) => {
  return (
    <Table>
      <tbody>
        {teamsList &&
          Object.keys(teamsList.team).map((key, i) => {
            return (
              <Link to={`/team/${teamsList.team[key]}`}>
                <td key={i}>
                  <tr>
                    <TeamName>
                      <TeamAvatar imageLink={"image/test.jpg"} />
                      {teamsList.team[key]
                        ? teamsList.team[key]
                        : "Not Available"}
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
