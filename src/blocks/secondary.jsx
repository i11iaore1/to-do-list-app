import { useState } from "react";
import {
  ButtonSearch,
  ButtonAdd,
  ButtonComplete,
  ButtonShowOptions,
  ButtonDropDown,
} from "./buttons";

export function Panel({
  ButtonSearchFunction,
  buttonSearchToolTip,
  ButtonAddFunction,
  buttonAddToolTip,
}) {
  return (
    <div className="sticky top-[var(--diameter)] inset-x-0 z-40 flex flex-row gap-x-[var(--gap)] p-[var(--gap)] mb-[var(--gap)] border-b-[length:var(--border-width)] border-solid border-lf bg-ls">
      <div className="flex flex-row flex-1">
        <input
          type="text"
          placeholder="Search"
          className="input border-r-0 rounded-r-[0] flex-1"
        />
        <ButtonSearch
          onClick={ButtonSearchFunction}
          tooltip={buttonSearchToolTip}
        />
      </div>
      <ButtonAdd onClick={ButtonAddFunction} tooltip={buttonAddToolTip} />
    </div>
  );
}

function DateDash({ date }) {
  return (
    <div className="flex flex-row gap-x-[var(--gap)] w-full justify-center items-center mb-[var(--gap)] text-la text-[length:var(--smaller-font-size)] font-bold leading-none">
      <div className="flex-1 border-b-[length:var(--border-width)] border-dashed border-la"></div>
      <p>{date}</p>
      <div className="flex-1 border-b-[length:var(--border-width)] border-dashed border-la"></div>
    </div>
  );
}

function TimeDash({ time }) {
  return (
    <div className="flex flex-row gap-x-[var(--gap)] w-full justify-center items-center mb-[var(--gap)] px-[var(--radius)] text-lf text-[length:var(--smaller-font-size)] font-bold leading-none">
      <div className="flex-1 border-b-[length:var(--border-width)] border-dashed border-lf"></div>
      <p>{time}</p>
      <div className="flex-1 border-b-[length:var(--border-width)] border-dashed border-lf"></div>
    </div>
  );
}

function Card({ taskName, taskDescription = "" }) {
  const [isDropped, setIsDropped] = useState(false);

  function handleClick() {
    setIsDropped(!isDropped);
  }

  return (
    <div className="relative flex flex-col mb-[var(--gap)]">
      <div className="relative flex flex-col overflow-hidden w-full rounded-[var(--gap)] border-[length:var(--border-width)] border-solid border-lf bg-ls p-[var(--gap)]">
        <div className="flex flex-row gap-x-[var(--gap)] h-[var(--diameter)]">
          <ButtonComplete onClick={() => console.log("Complete pressed")} />
          <div className="flex-1 content-center m-0 overflow-hidden whitespace-nowrap text-lf">
            <p className="w-fit max-w-full m-0 text-[length:var(--bigger-font-size)] font-bold">
              {taskName}
            </p>
          </div>
          <ButtonShowOptions onClick={() => console.log("Show pressed")} />
        </div>
        {taskDescription && (
          <p
            className={
              "overflow-y-auto break-words m-0 mt-[var(--gap)] p-[var(--gap)] rounded-[var(--gap)] border-[length:var(--border-width)] border-solid border-lf bg-lt text-la text-[length:var(--normal-font-size)]" +
              (isDropped ? "" : " hidden")
            }
          >
            {taskDescription}
          </p>
        )}
      </div>
      {taskDescription && (
        <ButtonDropDown onClick={handleClick} isDropped={isDropped} />
      )}
    </div>
  );
}

export function CardList({ cardObjectList }) {
  let currentDate = null;
  let currentTime = null;

  return (
    <div className="flex flex-col px-[var(--gap)]">
      {cardObjectList.map((cardObject) => {
        const isSameDate = currentDate == cardObject.date;
        currentDate = cardObject.date;

        const isSameTime = currentTime == cardObject.time && isSameDate;
        currentTime = cardObject.time;

        return (
          <div key={cardObject.id}>
            {!isSameDate && <DateDash date={cardObject.date} />}
            {!isSameTime && <TimeDash time={cardObject.time} />}
            <Card
              taskName={cardObject.taskName}
              taskDescription={cardObject.taskDescription}
            />
          </div>
        );
      })}
    </div>
  );
}

export function ChecboxSection() {
  return (
    <label className="flex flex-row w-fit relative gap-x-[var(--gap)] mt-[var(--gap)] h-[var(--radius)] text-[length:var(--normal-font-size)] cursor-pointer select-none">
      <input
        type="checkbox"
        className="peer appearance-none inline-grid place-content-center h-full aspect-square bg-lt checked:bg-lf border-solid border-[length:var(--border-width)] border-lf rounded-[var(--gap)] p-[var(--half-gap)] transition"
      />
      <div className="absolute h-full aspect-square flex justify-center items-center peer-checked:after:content-['✔'] text-lt font-bold" />
      <span className="flex w-fit items-center text-lf">Remember me</span>
    </label>
  );
}
