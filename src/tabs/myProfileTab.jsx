import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { ProfileSVG } from "../blocks/SVGs";
import { ButtonShowOptions } from "../blocks/buttons";

import "./styles/myProfile.css";
import { ACCESS_TOKEN, REFRESH_TOKEN, USER_INFO } from "../constants";
import createApi from "../api";

function HistoryRow({ name, status, date }) {
  return (
    <tr className="w-full table-fixed odd:bg-third even:bg-second leading-none text-accent">
      <td className="p-[var(--half-gap)] [@media(min-width:32em)]:whitespace-nowrap [@media(min-width:32em)]:overflow-hidden text-ellipsis">
        {name}
      </td>
      <td className="p-[var(--half-gap)] text-center">{status}</td>
      <td className="p-[var(--half-gap)] text-center">{date}</td>
    </tr>
  );
}

function HistoryTable({ historyRowObjectList }) {
  return (
    <div className="relative w-full max-h-[50vh] flex-1 overflow-auto rounded-[var(--gap)] text-[length:var(--normal-font-size)]">
      <table data-testid="history-table" className="w-full table-fixed">
        <thead className="sticky top-0 inset-x-0 bg-first text-ta font-bold ">
          <tr>
            <th
              scope="col"
              className="py-[var(--gap)] px-[var(--half-gap)] w-[var(--description-column-width)]"
            >
              Description
            </th>
            <th
              scope="col"
              className="py-[var(--gap)] px-[var(--half-gap)] w-[var(--status-column-width)]"
            >
              Status
            </th>
            <th
              scope="col"
              className="py-[var(--gap)] px-[var(--half-gap)] w-[var(--date-column-width)]"
            >
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {historyRowObjectList.map((historyRowObject, index) => {
            return (
              <HistoryRow
                key={index}
                name={historyRowObject.name}
                status={historyRowObject.status}
                date={historyRowObject.date.split("-").reverse().join(".")}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function MyProfileTabContent() {
  const navigate = useNavigate();
  const { currentUser, userTasks, clearUser, storedAs } =
    useContext(UserContext);
  const [statistics, setStatistics] = useState(null);

  useEffect(() => {
    function calculateStatistics() {
      let done = 0;
      let expired = 0;
      let history = [];

      userTasks.forEach((task) => {
        if (task.state === 1) {
          done++;
          history.push({
            name: task.name,
            status: "done",
            date: task.deadline.split("T")[0],
          });
        } else {
          if (task.state === 2) {
            expired++;
            history.push({
              name: task.name,
              status: "expired",
              date: task.deadline.split("T")[0],
            });
          }
        }
      });

      const total = done + expired;
      if (total > 0) {
        // history = [...history].sort((a, b) => {
        //   const dateA = new Date(
        //     a.date.split(".").reverse().join("-") + "T" + a.time
        //   );
        //   const dateB = new Date(
        //     b.date.split(".").reverse().join("-") + "T" + b.time
        //   );
        //   return dateB - dateA;
        // });

        return {
          done: done,
          expired: expired,
          completionRate: Math.round((done * 100) / total),
          history: history,
        };
      } else {
        return null;
      }
    }

    if (userTasks) {
      setStatistics(calculateStatistics());
    }
  }, [userTasks]);

  function logOut() {
    clearUser();
    navigate("/");
  }

  async function handleDelete() {
    try {
      const api = createApi(storedAs);
      const response = await api.delete("/api/my-profile/");

      if (response.status === 204) {
        logOut();
      } else {
        // console.log("Couldn`t delete user in myProfileTab.jsx");
      }
    } catch (error) {
      // console.error("Error deleting user in myProfileTab.jsx: ", error);
    }
  }

  return (
    currentUser && (
      <div className="p-[var(--gap)] bg-[linear-gradient(0deg,rgba(var(--third)),rgba(var(--first)))] min-h-[calc(100vh-var(--diameter))]">
        <div className="m-auto flex flex-col max-w-[1000px] gap-y-[var(--gap)] p-[var(--gap)] bg-second rounded-[var(--gap)] border-[length:var(--border-width)] border-solid border-first">
          <div className="relative flex flex-row gap-x-[var(--gap)]">
            <div className="flex-1 flex justify-center items-center flex-col [@media(min-width:32em)]:flex-row gap-x-[var(--gap)] gap-y-[var(--gap)]">
              <div className="flex justify-center items-center bg-first min-h-[100px] min-w-[100px] h-[30vw] w-[30vw] max-w-[200px] max-h-[200px] rounded-[50%] text-ta">
                <ProfileSVG additionalStyles={"h-[80%] w-auto"} />
              </div>
              <div className="flex-1 flex flex-col w-full gap-y-[var(--gap)] px-[var(--gap)] leading-none text-fa text-[length:var(--normal-font-size)]">
                <div className="text-[length:var(--bigger-font-size)] font-bold leading-normal text-center [@media(min-width:32em)]:text-left" data-testid="username-text">
                  {currentUser.username}
                </div>
                <div className="flex flex-col tablet:flex-row gap-[var(--gap)]">
                  <div className="font-bold select-none">Email:</div>
                  <div className="flex-1" data-testid="email-text">{currentUser.email}</div>
                </div>
                <div className="flex flex-col tablet:flex-row gap-[var(--gap)]">
                  <div className="font-bold select-none">Sex:</div>
                  <div className="flex-1" data-testid="sex-text">
                    {currentUser.sex ? "male" : "female"}
                  </div>
                </div>
                <div className="flex flex-col tablet:flex-row gap-[var(--gap)]">
                  <div className="font-bold select-none">Birth date:</div>
                  <div className="flex-1" data-testid="birth-date-text">
                    {currentUser.birth_date.split("-").reverse().join(".")}
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute [@media(min-width:32em)]:relative top-0 right-0 h-[var(--diameter)] w-[var(--diameter)]">
              <ButtonShowOptions
                options={[
                  {
                    optionName: "Edit",
                    optionFunction: () => {
                      // console.log("edit pressed");
                    },
                  },
                  {
                    optionName: "Log out",
                    optionFunction: logOut,
                  },
                  {
                    optionName: "Delete",
                    optionFunction: handleDelete,
                  },
                ]}
              />
            </div>
          </div>
          {statistics ? (
            <div className="flex-1 flex flex-col gap-y-[var(--gap)] tablet:flex-row tablet:gap-x-[var(--radius)] bg-third rounded-[var(--gap)] border-[length:var(--border-width)] border-solid border-first overflow-hidden">
              <div className="flex flex-col gap-y-[var(--gap)] p-[var(--gap)] pb-0 tablet:pb-[var(--gap)] tablet:pr-0 leading-none">
                <div className="text-accent text-[length:var(--normal-font-size)]">
                  <span className="font-bold" data-testid="done-text">{statistics.done}</span> task(s)
                  done
                </div>
                <div className="text-accent text-[length:var(--normal-font-size)]">
                  <span className="font-bold" data-testid="expired-text">{statistics.expired}</span>{" "}
                  task(s) expired
                </div>
                <div className="text-accent text-[length:var(--normal-font-size)]">
                  <span className="font-bold" data-testid="completion-rate-text">
                    {statistics.completionRate}%
                  </span>{" "}
                  completion rate
                </div>
              </div>
              <div className="flex-1 flex w-full flex-col gap-y-[var(--gap)] px-[var(--gap)] pb-[var(--gap)] tablet:pl-0 tablet:py-[var(--gap)] tablet:pr-[var(--gap)]">
                <div className="text-center text-accent text-[length:var(--normal-font-size)] font-bold leading-none">
                  Task history
                </div>
                <HistoryTable historyRowObjectList={statistics.history} />
              </div>
            </div>
          ) : (
            <div className="p-[var(--gap)] text-fa text-[length:var(--bigger-font-size)] font-bold text-center">
              It seems you don't have a task history yet.
            </div>
          )}
        </div>
      </div>
    )
  );
}

export default MyProfileTabContent;
