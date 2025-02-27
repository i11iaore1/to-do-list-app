import { useState } from "react";
import {
  ButtonAdd,
  ButtonComplete,
  ButtonShowOptions,
  ButtonDropDown,
  ButtonClose,
} from "../blocks/buttons";
import { Overlay } from "../blocks/base";
import { Panel } from "../blocks/secondary";

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

function Card({ taskName, taskDescription }) {
  const [dropState, setDropState] = useState(false);

  function handleClick() {
    setDropState(!dropState);
  }

  return (
    <div
      className={
        dropState
          ? "relative flex mb-[var(--list-gap)]"
          : "folded relative flex mb-[var(--list-gap)]"
      }
    >
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
        <p className="overflow-y-auto break-words m-0 mt-[var(--gap)] p-[var(--gap)] rounded-[var(--gap)] border-[length:var(--border-width)] border-solid border-lf bg-lt text-la text-[length:var(--normal-font-size)]">
          {taskDescription}
        </p>
      </div>
      <ButtonDropDown onClick={handleClick} />
    </div>
  );
}

function CardList({ cardObjectList }) {
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
          <>
            {!isSameDate && <DateDash date={cardObject.date} />}
            {!isSameTime && (
              <TimeDash
                // key={cardObject.date + "_" + cardObject.time}
                time={cardObject.time}
              />
            )}
            <Card
              key={cardObject.id}
              taskName={cardObject.taskName}
              taskDescription={cardObject.taskDescription}
            />
          </>
        );
      })}
    </div>
  );
}

function DialogueWindow({ isShown, hideOverlay }) {
  return (
    <Overlay
      isShown={isShown}
      hideOverlay={hideOverlay}
      content={
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex flex-col max-h-full w-full max-w-[25em] flex-shrink"
        >
          <div className="flex flex-row max-h-[var(--list-gap)] rounded-t-[50%] bg-ls">
            <p className="flex flex-1 min-w-0 w-0 justify-center items-center flex-grow  p-[var(--gap)] rounded-tl-[var(--gap)] border-[length:var(--border-width)] border-b-0 border-r-0 border-solid border-lf bg-ls text-lf text-[length:var(--bigger-font-size)] font-bold">
              TASK CREATION
            </p>
            <ButtonClose onClick={hideOverlay} />
          </div>
          <div className="flex flex-col overflow-y-auto gap-y-[var(--gap)] p-[var(--gap)] rounded-b-[var(--gap)] border-[length:var(--border-width)] border-t-0 border-solid border-lf bg-ls">
            <input type="text" placeholder="Name" className="input w-full" />
            <textarea
              rows="3"
              placeholder="Description"
              className="input w-full resize-none flex-shrink-0"
            />
            <div className="flex flex-row gap-x-[var(--gap)]">
              <input type="time" className="input flex-1" />
              <input type="date" className="input flex-1" />
            </div>
            <ButtonAdd onClick={() => console.log("Add pressed")} />
          </div>
        </div>
      }
    />
  );
}

function MyTasksTabContent() {
  const cardObjectList = [
    {
      id: "1",
      taskName: "TASK_NAME1",
      taskDescription: "TASK_DESCRIPTION1",
      date: "02.12.2024",
      time: "11:30",
    },
    {
      id: "2",
      taskName: "TASK_NAME2",
      taskDescription: "TASK_DESCRIPTION2",
      date: "02.12.2024",
      time: "11:31",
    },
    {
      id: "3",
      taskName: "TASK_NAME3",
      taskDescription: "TASK_DESCRIPTION3",
      date: "02.13.2024",
      time: "11:31",
    },
  ];

  const [overlayState, setOverlayState] = useState(false);

  function showOverlay() {
    setOverlayState(true);
  }

  function hideOverlay() {
    setOverlayState(false);
  }

  return (
    <>
      <DialogueWindow isShown={overlayState} hideOverlay={hideOverlay} />
      <Panel
        ButtonSearchFunction={() => console.log("Search pressed")}
        ButtonAddFunction={showOverlay}
      />
      <CardList cardObjectList={cardObjectList} />
    </>
  );
}

export default MyTasksTabContent;
