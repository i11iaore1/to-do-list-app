import { useEffect, useState, useRef } from "react";
import {
  ButtonAdd,
  ButtonComplete,
  ButtonShowOptions,
  ButtonDropDown,
  ButtonClose,
} from "./buttons";
import { Overlay } from "./base";
import { SearchSVG, CrossSVG } from "./SVGs";

export function Panel({
  searchQuery,
  setSearchQuery,
  buttonAddFunction,
  buttonAddToolTip,
}) {
  const inputRef = useRef(null);

  return (
    <div className="sticky top-[var(--diameter)] inset-x-0 z-40 flex flex-row gap-x-[var(--gap)] p-[var(--gap)] mb-[var(--gap)] border-b-[length:var(--border-width)] border-solid border-first bg-second">
      <div className="flex flex-row flex-1">
        <div
          onClick={() => {
            inputRef.current.focus();
          }}
          className="flex p-[var(--gap)] items-center justify-center h-[var(--diameter)] w-[var(--diameter)] border-solid border-first bg-third text-placeholder border-[length:var(--border-width)] border-r-0 rounded-l-[var(--gap)]"
        >
          <SearchSVG additionalStyles="h-[var(--radius)]" />
        </div>
        <input
          ref={inputRef}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          placeholder="Search"
          className="input border-x-0 px-0 rounded-[0] flex-1"
        />
        <div
          onClick={() => {
            setSearchQuery("");
            inputRef.current.focus();
          }}
          className="flex p-[var(--gap)] items-center justify-center h-[var(--diameter)] w-[var(--diameter)] border-solid border-first bg-third text-placeholder border-[length:var(--border-width)] border-l-0 cursor:hover:text-fa rounded-r-[var(--gap)] active:!text-fa cursor-pointer"
        >
          <CrossSVG additionalStyles="h-[var(--radius)]" />
        </div>
      </div>
      <ButtonAdd onClick={buttonAddFunction} tooltip={buttonAddToolTip} />
    </div>
  );
}

export function TaskCreationDialogueWindow({ isShown, hide, createTask }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    if (isShown) {
      setFormData({
        name: "",
        description: "",
        date: "",
        time: "",
      });
    }
  }, [isShown]);

  function buttonCreateFunction() {
    const { name, description, date, time } = formData;

    if (name && date && time) {
      const taskDate = new Date(date + "T" + time);
      const now = new Date();

      if (taskDate < now) {
        console.log("Task date is in the past");
        return;
      }
      createTask({
        name: name,
        description: description,
        deadline: `${date}T${time}:00`,
      });
    } else {
      console.log("Please fill in all required fields: Name, Date, and Time.");
    }
  }

  return (
    <Overlay
      isShown={isShown}
      hideOverlay={hide}
      content={
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex flex-col max-h-full w-full max-w-[25em] flex-shrink"
        >
          <div className="flex flex-row max-h-[var(--bigger-radius)] rounded-t-[50%] bg-second">
            <p className="flex flex-1 min-w-0 w-0 justify-center items-center flex-grow  p-[var(--gap)] rounded-tl-[var(--gap)] border-[length:var(--border-width)] border-b-0 border-r-0 border-solid border-first bg-second text-fa text-[length:var(--bigger-font-size)] font-bold select-none">
              TASK CREATION
            </p>
            <ButtonClose onClick={hide} />
          </div>
          <div className="flex flex-col overflow-y-auto gap-y-[var(--gap)] p-[var(--gap)] rounded-b-[var(--gap)] border-[length:var(--border-width)] border-t-0 border-solid border-first bg-second">
            <input
              type="text"
              placeholder="Name"
              className="input w-full"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <textarea
              rows="3"
              placeholder="Description"
              className="input w-full resize-none flex-shrink-0"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
            <div className="flex flex-row gap-x-[var(--gap)]">
              <input
                type="time"
                className="input flex-1"
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
              />
              <input
                type="date"
                className="input flex-1"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />
            </div>
            <ButtonComplete
              additionalStyles={"h-[var(--diameter)] w-full "}
              onClick={buttonCreateFunction}
              tooltip="Apply changes"
            />
          </div>
        </div>
      }
    />
  );
}

export function TaskEditionDialogueWindow({
  isShown,
  hide,
  cardObject,
  applyChanges,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    if (isShown) {
      const [date, time] = cardObject.deadline.split("T");
      setName(cardObject.name);
      setDescription(cardObject.description);
      setDate(date);
      setTime(time.slice(0, 5));
    }
  }, [isShown]);

  function buttonApplyFunction() {
    if (name && date && time) {
      if (new Date(date + "T" + time) < new Date()) {
        console.log("Task date is in the past");
        return;
      }
      applyChanges({
        id: cardObject.id,
        name: name,
        description: description,
        deadline: `${date}T${time}:00`,
        state: cardObject.state,
      });
    } else {
      console.log("Please fill in all required fields: Name, Date, and Time.");
    }
  }

  return (
    <Overlay
      isShown={isShown}
      hideOverlay={hide}
      content={
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex flex-col max-h-full w-full max-w-[25em] flex-shrink"
        >
          <div className="flex flex-row max-h-[var(--bigger-radius)] rounded-t-[50%] bg-second">
            <p className="flex flex-1 min-w-0 w-0 justify-center items-center flex-grow  p-[var(--gap)] rounded-tl-[var(--gap)] border-[length:var(--border-width)] border-b-0 border-r-0 border-solid border-first bg-second text-fa text-[length:var(--bigger-font-size)] font-bold select-none">
              TASK EDITION
            </p>
            <ButtonClose onClick={hide} />
          </div>
          <div className="flex flex-col overflow-y-auto gap-y-[var(--gap)] p-[var(--gap)] rounded-b-[var(--gap)] border-[length:var(--border-width)] border-t-0 border-solid border-first bg-second">
            <input
              type="text"
              placeholder="Name"
              className="input w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <textarea
              rows="3"
              placeholder="Description"
              className="input w-full resize-none flex-shrink-0"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="flex flex-row gap-x-[var(--gap)]">
              <input
                type="time"
                className="input flex-1"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
              <input
                type="date"
                className="input flex-1"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <ButtonComplete
              additionalStyles={"h-[var(--diameter)] w-full "}
              onClick={buttonApplyFunction}
              tooltip="Apply changes"
            />
          </div>
        </div>
      }
    />
  );
}

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
      <p>{time.slice(0, 5)}</p>
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

  const now = new Date();
  const fullYear = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const date = now.getDate();
  const today = `${fullYear}-${month}-${date.toString().padStart(2, "0")}`;
  const tomorrow = `${fullYear}-${month}-${(date + 1)
    .toString()
    .padStart(2, "0")}`;

  // console.log("today ", today, "tomorrow ", tomorrow);

  return (
    <div className="flex flex-col px-[var(--gap)]">
      {cardObjectList.map((cardObject) => {
        const [date, time] = cardObject.deadline.split("T");

        const isSameDate = currentDate == date;
        currentDate = date;

        const isSameTime = currentTime == time && isSameDate;
        // console.log(
        //   "isSameTime ",
        //   isSameTime,
        //   "\nprevious time ",
        //   time,
        //   "\ncurrentTime ",
        //   currentTime
        // );
        currentTime = time;

        let dateDashLabel = null;
        if (today === date) {
          dateDashLabel = "Today";
        } else if (tomorrow === date) {
          dateDashLabel = "Tomorrow";
        } else {
          dateDashLabel = date.split("-").reverse().join(".");
        }
        return (
          <div key={cardObject.id}>
            {!isSameDate && <DateDash date={dateDashLabel} />}
            {!isSameTime && <TimeDash time={time} />}
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

export function RememberMeSection({ ref }) {
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

export function SexInputSection({ sex, setSex }) {
  return (
    <div className="flex items-center flex-row text-[length:var(--normal-font-size)] text-fa">
      <div className="m-[var(--gap)]">Sex:</div>
      <input
        type="radio"
        name="sex"
        id="sexRadio1"
        checked={sex === true}
        onChange={() => setSex(true)}
        className="hidden"
      />
      <label
        htmlFor="sexRadio1"
        className={
          "flex-1 flex justify-center p-[var(--gap)] select-none rounded-l-[var(--gap)] border-[length:var(--border-width)] border-r-0 border-solid border-first" +
          (sex === true
            ? " bg-first text-ta"
            : " bg-third cursor-pointer text-placeholder")
        }
      >
        male
      </label>
      <input
        type="radio"
        name="sex"
        id="sexRadio2"
        checked={sex === false}
        onChange={() => setSex(false)}
        className="hidden"
      />
      <label
        htmlFor="sexRadio2"
        className={
          "flex-1 flex justify-center p-[var(--gap)] select-none rounded-r-[var(--gap)] border-[length:var(--border-width)] border-l-0 border-solid border-first" +
          (sex === false
            ? " bg-first text-ta"
            : " bg-third cursor-pointer text-placeholder")
        }
      >
        female
      </label>
    </div>
  );
}
