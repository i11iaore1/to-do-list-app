import { ProfileSVG } from "../blocks/SVGs";
import { ButtonShowOptions } from "../blocks/buttons";

import "./styles/myProfile.css";

function HistoryRow({ description, status, date }) {
  return (
    <tr className="w-full table-fixed odd:bg-third even:bg-second leading-none text-accent">
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
    <div className="p-[var(--gap)] bg-[linear-gradient(0deg,rgba(var(--third)),rgba(var(--first)))] min-h-[calc(100vh-var(--diameter))]">
      <div className="m-auto flex flex-col max-w-[1000px] gap-y-[var(--gap)] p-[var(--gap)] bg-second rounded-[var(--gap)] border-[length:var(--border-width)] border-solid border-first">
        <div className="relative flex flex-row gap-x-[var(--gap)]">
          <div className="flex-1 flex justify-center items-center flex-col [@media(min-width:32em)]:flex-row gap-x-[var(--gap)] gap-y-[var(--gap)]">
            <div className="flex justify-center items-center bg-first min-h-[100px] min-w-[100px] h-[30vw] w-[30vw] max-w-[200px] max-h-[200px] rounded-[50%] text-ta">
              <ProfileSVG additionalStyles={"h-[80%] w-auto"} />
            </div>
            <div className="flex-1 flex flex-col w-full gap-y-[var(--gap)] px-[var(--gap)] leading-none text-fa text-[length:var(--normal-font-size)]">
              <div className="text-[length:var(--bigger-font-size)] font-bold leading-normal text-center [@media(min-width:32em)]:text-left">
                Patrick Jane
              </div>
              <div className="flex flex-col tablet:flex-row gap-[var(--gap)]">
                <div className="font-bold select-none">Email:</div>
                <div className="flex-1">patrickjane@gmail.com</div>
              </div>
              <div className="flex flex-col tablet:flex-row gap-[var(--gap)]">
                <div className="font-bold select-none">Sex:</div>
                <div className="flex-1">male</div>
              </div>
              <div className="flex flex-col tablet:flex-row gap-[var(--gap)]">
                <div className="font-bold select-none">Birth date:</div>
                <div className="flex-1">21.12.2001</div>
              </div>
            </div>
          </div>
          <div className="relative top-0 right-0 h-[var(--diameter)] w-[var(--diameter)]">
            <ButtonShowOptions
              onClick={() => {
                console.log("show options");
              }}
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-y-[var(--gap)] tablet:flex-row tablet:gap-x-[var(--radius)] bg-third rounded-[var(--gap)] border-[length:var(--border-width)] border-solid border-first overflow-hidden">
          <div className="flex flex-col gap-y-[var(--gap)] p-[var(--gap)] pb-0 tablet:pb-[var(--gap)] tablet:pr-0 leading-none">
            <div className="text-accent text-[length:var(--normal-font-size)]">
              5 Completed tasks
            </div>
            <div className="text-accent text-[length:var(--normal-font-size)]">
              3 Unompleted tasks
            </div>
            <div className="text-accent text-[length:var(--normal-font-size)]">
              60% Completion rate
            </div>
          </div>
          <div className="flex-1 flex w-full flex-col gap-y-[var(--gap)] px-[var(--gap)] pb-[var(--gap)] tablet:pl-0 tablet:py-[var(--gap)] tablet:pr-[var(--gap)]">
            <div className="text-center text-accent text-[length:var(--normal-font-size)] font-bold leading-none">
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
