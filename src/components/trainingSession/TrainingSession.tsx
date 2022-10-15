import { ProfileResponse } from "../../API";
import SortableTableModified from "../sortTableModified/SortableTableModified";

const TrainingSession = ({
  trainingList,
}: {
  trainingList: ProfileResponse["trainingSessions"];
}) => {
  return (
    <SortableTableModified
      data={trainingList}
      header={[
        { key: "sessionName", label: "Session Name" },
        { key: "sessionStart", label: "Session Start" },
        { key: "sessionStop", label: "Session Stop" },
        { key: "teamName", label: "Team Name" },
        { key: "duration", label: "Duration" },
      ]}
      link="session"
      linkList={["sessionName"]}
    />
  );
};
export default TrainingSession;
