import { useState } from "react";
import { ButtonAdd, ButtonClose } from "../blocks/buttons";
import { Overlay } from "../blocks/base";
import { Panel, CardList } from "../blocks/secondary";

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
          <div className="flex flex-row max-h-[var(--bigger-radius)] rounded-t-[50%] bg-ls">
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
      taskName: "TASK_NAME1",
      taskDescription: "",
      date: "02.12.2024",
      time: "11:30",
    },
    {
      id: "3",
      taskName: "TASK_NAME2",
      taskDescription: "TASK_DESCRIPTION2",
      date: "02.12.2024",
      time: "11:31",
    },
    {
      id: "4",
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
        buttonSearchToolTip={"Find task"}
        ButtonAddFunction={showOverlay}
        buttonAddToolTip={"Create task"}
      />
      <CardList cardObjectList={cardObjectList} />
    </>
  );
}

export default MyTasksTabContent;
