import { MouseEventHandler, useCallback, useState } from "react";
import JSONData from "./data.json";
// import { Container, Row, Button, Col } from "react-bootstrap";
import { NavS } from "./SortableTable.Styles";
import Table from "react-bootstrap/Table";

type Data = typeof JSONData;

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

  const sortedData = JSONData.sort((a, b) => {
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

function SortableTable({ data }: { data: Data }) {
  const [sortKey, setSortKey] = useState<SortKeys>("last_name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("ascn");

  const headers: { key: SortKeys; label: string }[] = [
    { key: "id", label: "ID" },
    { key: "first_name", label: "First name" },
    { key: "last_name", label: "Last name" },
    { key: "Velocity", label: "Velocity" },
    { key: "Height", label: "Height" },
    { key: "Distance", label: "Distance" },
  ];

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
            {headers.map((row) => {
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
          {sortedData().map((person) => {
            return (
              <tr key={person.id}>
                <td>{person.id}</td>
                <td>{person.first_name}</td>
                <td>{person.last_name}</td>
                <td>{person.Velocity}</td>
                <td>{person.Height}</td>
                <td>{person.Distance}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </NavS>
  );
}

export default SortableTable;
