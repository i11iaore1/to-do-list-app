import { useState } from "react";
import { ButtonComplete, ButtonShowOptions, ButtonDropDown } from "./buttons";

function DateDash({ date }) {
  return (
    <div className="flex flex-row gap-x-[var(--gap)] w-full justify-center items-center mb-[var(--gap)] text-accent text-[length:var(--smaller-font-size)] font-bold leading-none">
      <div className="flex-1 border-b-[length:var(--border-width)] border-dashed border-accent"></div>
      <p>{date}</p>
      <div className="flex-1 border-b-[length:var(--border-width)] border-dashed border-accent"></div>
    </div>
  );
}

function TimeDash({ time }) {
  return (
    <div className="flex flex-row gap-x-[var(--gap)] w-full justify-center items-center mb-[var(--gap)] text-fd text-[length:var(--smaller-font-size)] font-bold leading-none">
      <div className="flex-1 border-b-[length:var(--border-width)] border-dashed border-fd"></div>
      <p>{time}</p>
      <div className="flex-1 border-b-[length:var(--border-width)] border-dashed border-fd"></div>
    </div>
  );
}

function Card({
  name,
  description,
  completeButtonFunction,
  deleteButtonFunction,
  editButtonFunction,
}) {
  const [isDropped, setIsDropped] = useState(false);

  function handleClick() {
    setIsDropped(!isDropped);
  }

  return (
    <div className="flex flex-col mb-[var(--gap)]">
      <div className="flex flex-col w-full rounded-[var(--gap)] border-[length:var(--border-width)] border-solid border-first bg-st p-[var(--gap)]">
        <div className="flex flex-row gap-x-[var(--gap)] h-[var(--diameter)]">
          <ButtonComplete
            additionalStyles={"aspect-square h-full "}
            onClick={completeButtonFunction}
            tooltip="Complete task"
          />
          <div className="flex-1 content-center m-0 overflow-hidden whitespace-nowrap text-first">
            <p className="w-fit max-w-full m-0 text-[length:var(--bigger-font-size)] font-bold">
              {name}
            </p>
          </div>
          <ButtonShowOptions
            options={[
              {
                optionName: "Edit",
                optionFunction: editButtonFunction,
              },
              {
                optionName: "Delete",
                optionFunction: deleteButtonFunction,
              },
            ]}
          />
        </div>
        {description && (
          <p
            className={
              "overflow-y-auto break-words m-0 mt-[var(--gap)] p-[var(--gap)] rounded-[var(--gap)] border-[length:var(--border-width)] border-solid border-first bg-ts text-accent text-[length:var(--normal-font-size)]" +
              (isDropped ? "" : " hidden")
            }
          >
            {description}
          </p>
        )}
      </div>
      {description && (
        <ButtonDropDown onClick={handleClick} isDropped={isDropped} />
      )}
    </div>
  );
}

export function CardList({
  cardObjectList,
  handleComplete,
  handleDelete,
  handleEdit,
}) {
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
              name={cardObject.name}
              description={cardObject.description}
              completeButtonFunction={() => handleComplete(cardObject.id)}
              deleteButtonFunction={() => handleDelete(cardObject.id)}
              editButtonFunction={() => handleEdit(cardObject.id)}
            />
          </div>
        );
      })}
    </div>
  );
}

export function ChecboxSection({ ref }) {
  return (
    <label className="flex flex-row w-fit relative gap-x-[var(--gap)] mt-[var(--gap)] h-[var(--radius)] text-[length:var(--normal-font-size)] cursor-pointer select-none">
      <input
        ref={ref}
        type="checkbox"
        className="peer appearance-none inline-grid place-content-center h-full aspect-square bg-third checked:bg-first border-solid border-[length:var(--border-width)] border-first rounded-[var(--gap)] p-[var(--half-gap)] "
      />
      <div className="absolute h-full aspect-square flex justify-center items-center peer-checked:after:content-['✓'] text-ta font-bold" />
      <span className="flex w-fit items-center text-fa">Remember me</span>
    </label>
  );
}
