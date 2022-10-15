import React, { ChangeEvent, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { Info, Context } from "./UserDescription.styles";
import { FaEdit } from "react-icons/fa";
import apiMethods, { ProfileResponse } from "../../API";
const UserDescription = ({
  userList,
  isPlayer,
}: {
  userList: ProfileResponse;
  isPlayer: boolean;
}) => {
  const [isEdit, setEdit] = useState(true);
  const [change, setChange] = useState({} as Partial<ProfileResponse>);

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setChange((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };
  const submitChange = () => {
    apiMethods.putPlayer(change).then(() => {
      setEdit(!isEdit);
      setChange({});
      window.location.reload();
    });
  };

  return (
    <>
      <Table
        responsive
        bordered
        variant="dark"
        className="table-condensed mb-2"
      >
        {userList &&
          Object.entries(userList).map((arr, i) => {
            return (
              <tbody key={i}>
                {arr[0] !== "teams" && arr[0] !== "trainingSessions" ? (
                  <tr>
                    <td>
                      <Context>{arr[0]}</Context>
                    </td>
                    <td>
                      {isEdit ? (
                        <Info>
                          {(arr[1] as string)
                            ? (arr[1] as string)
                            : "Not Available"}
                        </Info>
                      ) : (
                        <>
                          {arr[0] === "nationality" ||
                          arr[0] === "height" ||
                          arr[0] === "weight" ||
                          arr[0] === "dob" ? (
                            <input
                              className="w-100"
                              type="text"
                              id={arr[0]}
                              name={arr[0]}
                              defaultValue={arr[1] ?? ""}
                              onChange={handleChange}
                            />
                          ) : (
                            arr[1]
                          )}
                        </>
                      )}
                    </td>
                  </tr>
                ) : null}
              </tbody>
            );
          })}
      </Table>
      {isPlayer &&
        (isEdit ? (
          <Button
            className="d-inline-flex align-items-center"
            onClick={() => setEdit(!isEdit)}
          >
            <FaEdit className="me-2" /> Edit
          </Button>
        ) : (
          <Button onClick={() => submitChange()}>Save changes</Button>
        ))}
    </>
  );
};
export default UserDescription;
