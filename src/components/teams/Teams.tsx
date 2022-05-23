import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import { TeamName } from "./Teams.styles";
import TestImage from "./teamage/test.jpg";
import TeamAvatar from "./TeamAvatar";
const Teams = ({ teamsList }: { teamsList: any }) => {
  const [isEdit, setEdit] = useState(true);
  return (
    <Table>
      <tbody>
        {teamsList &&
          Object.keys(teamsList.team).map((key, i) => {
            return (
              <tr key={i}>
                <td>
                  <TeamName>
                    <TeamAvatar imageLink={TestImage} />
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