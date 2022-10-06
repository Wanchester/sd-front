import { MouseEventHandler, useCallback, useState } from "react";
import { ProfileResponse } from "../../API";
import { NavS } from "./SortableTableModified.Styles";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
type Data = ProfileResponse["trainingSessions"];

type SortKeys = keyof Data[0];

type SortOrder = "ascn" | "desc";

function sortData({
  tableData,
  sortKey,
  reverse,
}: {
  tableData: Data;
  sortKey: SortKeys;
  reverse: boolean;
}) {
  if (!sortKey) return tableData;

  const sortedData = tableData.sort((a, b) => {
    return a[sortKey] > b[sortKey] ? 1 : -1;
  });

  if (reverse) {
    return sortedData.reverse();
  }

  return sortedData;
}

function SortButton({
  sortOrder,
  columnKey,
  sortKey,
  onClick,
}: {
  sortOrder: SortOrder;
  columnKey: SortKeys;
  sortKey: SortKeys;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      onClick={onClick}
      className={`${
        sortKey === columnKey && sortOrder === "desc"
          ? "sort-button sort-reverse"
          : "sort-button"
      }`}
    >
      ▲
    </button>
  );
}

function SortableTableModified({
  data,
  header,
}: {
  data: Data;
  header: { key: SortKeys; label: string }[];
}) {
  const [sortKey, setSortKey] = useState<SortKeys>("sessionName");
  const [sortOrder, setSortOrder] = useState<SortOrder>("ascn");

  const sortedData = useCallback(
    () => sortData({ tableData: data, sortKey, reverse: sortOrder === "desc" }),
    [data, sortKey, sortOrder]
  );

  function changeSort(key: SortKeys) {
    setSortOrder(sortOrder === "ascn" ? "desc" : "ascn");

    setSortKey(key);
  }

  return (
    <NavS>
      <Table className="table table-dark table-striped">
        <thead>
          <tr>
            {header.map((row) => {
              return (
                <td key={row.key}>
                  {row.label}{" "}
                  <SortButton
                    columnKey={row.key}
                    onClick={() => changeSort(row.key)}
                    {...{
                      sortOrder,
                      sortKey,
                    }}
                  />
                </td>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sortedData().map((session) => {
            return (
              <tr key={session.sessionName}>
                <td>
                  <Link
                    to={`/session/${encodeURIComponent(session.sessionName)}`}
                  >
                    {session.sessionName}
                  </Link>
                </td>
                <td>{session.sessionStart}</td>
                <td>{session.sessionStop}</td>
                <td>
                  <Link to={`/team/${session.teamName}`}>
                    {session.teamName}
                  </Link>
                </td>
                <td>{session.duration}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </NavS>
  );
}

export default SortableTableModified;
