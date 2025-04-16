import {
  REFRESH_TOKEN,
  ACCESS_TOKEN,
  USER_INFO,
  USER_TASKS,
  USER_GROUPS,
} from "../constants";

export function clearAuthorizationInfo(setters) {
  console.log("Clearing authorization info");
  localStorage.removeItem(REFRESH_TOKEN);
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(USER_INFO);
  localStorage.removeItem(USER_TASKS);
  localStorage.removeItem(USER_GROUPS);

  sessionStorage.removeItem(REFRESH_TOKEN);
  sessionStorage.removeItem(ACCESS_TOKEN);
  sessionStorage.removeItem(USER_INFO);
  sessionStorage.removeItem(USER_TASKS);
  sessionStorage.removeItem(USER_GROUPS);

  setters.toNull.forEach((setter) => setter(null));
  setters.toFalse.forEach((setter) => setter(false));
}
