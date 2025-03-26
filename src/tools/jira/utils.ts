import { Status, StatusIDMap } from "../../types/jira/responses.js";

export const getStatusId = (status: Status) => {
  if (!(status in StatusIDMap)) return StatusIDMap["In Progress"];
  return StatusIDMap[status];
};
