import Table from "react-bootstrap/Table";
import { Whatever3, Whatever1, Whatever2 } from "./Table2.styles";
import React from "react";
// import { Link } from "react-router-dom";
import { StatsInterface } from "../../TeamPage";

const TableA = ({ stats }: { stats: StatsInterface }) => {
  return (
    <Whatever2>
      <Table>
        <thead>
          <tr>
            <td>
              <Whatever3>Players</Whatever3>
            </td>
            <td>
              <Whatever3>Velocity</Whatever3>
            </td>
            <td>
              <Whatever3>Accumulative Speed</Whatever3>
            </td>
            <td>
              <Whatever3>Sprint</Whatever3>
            </td>
            <td>
              <Whatever3>High Distance</Whatever3>
            </td>
          </tr>
        </thead>
        <tbody>
          {stats.players.map((person) => {
            return (
              <tr key={person.name}>
                <Whatever3>
                  <td>
                    <Whatever3>{person.name}</Whatever3>
                  </td>
                </Whatever3>
                <td>
                  <Whatever1>{person.velocity}</Whatever1>
                </td>
                <td>
                  <Whatever1>{person.accumulativeSpeed}</Whatever1>
                </td>
                <td>
                  <Whatever1>{person.sprint}</Whatever1>
                </td>
                <td>
                  <Whatever1>{person.highDistance}</Whatever1>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Whatever2>
  );
};
export default TableA;
