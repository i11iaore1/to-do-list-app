import { ProfileSVG } from "../blocks/SVGs";
import { ButtonShowOptions } from "../blocks/buttons";

import "./styles/myProfile.css";

function HistoryRow({ description, status, date }) {
  return (
    <tr className="w-full table-fixed odd:bg-lt even:bg-ls leading-none">
      <td className="p-[var(--half-gap)] [@media(min-width:32em)]:whitespace-nowrap [@media(min-width:32em)]:overflow-hidden text-ellipsis">
        {description}
      </td>
      <td className="p-[var(--half-gap)] text-center">{status}</td>
      <td className="p-[var(--half-gap)] text-center">{date}</td>
    </tr>
  );
}

const historyRowObjectList = [
  {
    description:
      "выгулять собаку выгулять собаку выгулять собаку выгулять собаку ",
    status: "done",
    date: "02.02.2025",
  },
  {
    description: "выгулять собаку",
    status: "expired",
    date: "02.02.2025",
  },
  {
    description: "выгулять собаку",
    status: "done",
    date: "02.02.2025",
  },
  {
    description: "выгулять собаку",
    status: "done",
    date: "02.02.2025",
  },
  {
    description: "выгулять собаку",
    status: "done",
    date: "02.02.2025",
  },
  {
    description: "выгулять собаку",
    status: "done",
    date: "02.02.2025",
  },
  {
    description: "выгулять собаку",
    status: "done",
    date: "02.02.2025",
  },
  {
    description: "выгулять собаку",
    status: "done",
    date: "02.02.2025",
  },
  {
    description: "выгулять собаку",
    status: "done",
    date: "02.02.2025",
  },
  {
    description: "выгулять собаку",
    status: "done",
    date: "02.02.2025",
  },
  {
    description: "выгулять собаку",
    status: "done",
    date: "02.02.2025",
  },
];

function HistoryTable() {
  return (
    <div className="relative w-full max-h-[50vh] flex-1 overflow-auto rounded-[var(--gap)] text-[length:var(--normal-font-size)]">
      <table className="w-full table-fixed">
        <thead className="sticky top-0 inset-x-0 bg-lf text-lt font-bold ">
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
                description={historyRowObject.description}
                status={historyRowObject.status}
                date={historyRowObject.date}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function MyProfileTabContent() {
  return (
    <div className="p-[var(--gap)]">
      <div className="m-auto flex flex-col max-w-[1000px]  gap-y-[var(--gap)] p-[var(--gap)] bg-ls rounded-[var(--gap)] border-[length:var(--border-width)] border-solid border-lf">
        <div className="relative flex flex-row gap-x-[var(--gap)]">
          <div className="flex justify-center items-center bg-lf h-[30vw] max-h-[200px] min-h-[100px] aspect-square rounded-[50%] text-lt">
            <ProfileSVG additionalStyles={"h-[80%] w-auto"} />
          </div>
          <div className="flex-1 flex flex-col gap-y-[var(--gap)] px-[var(--gap)] leading-none">
            <div className="text-lf text-[length:var(--bigger-font-size)] font-bold leading-normal">
              User name
            </div>
            <div className="text-lf text-[length:var(--normal-font-size)]">
              Email
            </div>
            <div className="text-lf text-[length:var(--normal-font-size)]">
              Sex
            </div>
            <div className="text-lf text-[length:var(--normal-font-size)]">
              Birth date
            </div>
          </div>
          <div className="relative top-0 right-0 h-[var(--diameter)]">
            <ButtonShowOptions
              onClick={() => {
                console.log("show options");
              }}
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-y-[var(--gap)] tablet:flex-row tablet:gap-x-[var(--radius)] bg-lt rounded-[var(--gap)] border-[length:var(--border-width)] border-solid border-lf overflow-hidden">
          <div className="flex flex-col gap-y-[var(--gap)] p-[var(--gap)] pb-0 tablet:pb-[var(--gap)] tablet:pr-0 leading-none">
            <div className="text-la text-[length:var(--normal-font-size)]">
              5 Completed tasks
            </div>
            <div className="text-la text-[length:var(--normal-font-size)]">
              3 Unompleted tasks
            </div>
            <div className="text-la text-[length:var(--normal-font-size)]">
              60% Completion rate
            </div>
          </div>
          <div className="flex-1 flex w-full flex-col gap-y-[var(--gap)] px-[var(--gap)] pb-[var(--gap)] tablet:pl-0 tablet:py-[var(--gap)] tablet:pr-[var(--gap)]">
            <div className="text-center text-la text-[length:var(--normal-font-size)] font-bold leading-none">
              Task history
            </div>
            <HistoryTable />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfileTabContent;
