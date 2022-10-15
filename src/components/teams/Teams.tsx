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
    <div className="clearfix w-100">
      {teamsList &&
        teamsList
          .filter((t) => checkExist(t))
          .map((item, i, arr) => {
            return (
              <Link
                key={i}
                to={`/team/${item}`}
                className="float-start"
                style={{ marginRight: i < arr.length - 1 ? "1rem" : 0 }}
              >
                <TeamName>
                  <TeamAvatar imageLink={"/image/team.jpg"} />
                  {item ? item : "Not Available"}
                </TeamName>
              </Link>
            );
          })}
    </div>
  );
};
export default Teams;
