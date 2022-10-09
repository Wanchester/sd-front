import { MouseEventHandler, useCallback, useState } from "react";
import { NavS } from "./SortableTableModified.Styles";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

type Data = Record<string, string | number>[];

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

export interface TableData {
  data: Data;
  header: { key: SortKeys; label: string }[];
  link?: string;
  linkList?: string[];
}

const SortableTableModified = (props: TableData) => {
  const [sortKey, setSortKey] = useState<SortKeys>(Object.keys(props.data)[0]);
  const [sortOrder, setSortOrder] = useState<SortOrder>("ascn");
  const sortedData = useCallback(
    () =>
      sortData({
        tableData: props.data,
        sortKey,
        reverse: sortOrder === "desc",
      }),
    [props.data, sortKey, sortOrder]
  );

  function changeSort(key: SortKeys) {
    setSortOrder(sortOrder === "ascn" ? "desc" : "ascn");
    setSortKey(key);
  }
  console.log(props.data);
  return (
    <NavS>
      <Table className="table table-dark table-striped">
        <thead>
          <tr>
            {props.header.map((row) => {
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
              <tr key={Object.keys(session)[0]}>
                <>
                  {Object.keys(session).map((key) => {
                    if (
                      props.link &&
                      props.linkList &&
                      props.linkList.includes(key)
                    ) {
                      return (
                        <td>
                          <Link
                            to={`/${props.link}/${encodeURIComponent(
                              session[key]
                            )}`}
                          >
                            {session[key]}
                          </Link>
                        </td>
                      );
                    } else {
                      return <td>{session[key]}</td>;
                    }
                  })}
                </>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </NavS>
  );
};

export default SortableTableModified;