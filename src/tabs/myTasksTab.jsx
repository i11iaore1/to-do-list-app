import { useState } from "react";
import { ButtonAdd, ButtonClose, ButtonComplete } from "../blocks/buttons";
import { Overlay } from "../blocks/base";
import { Panel, CardList } from "../blocks/secondary";

function TaskCreationDialogueWindow({ isShown, hide, createTask }) {
  function buttonCreateFunction() {
    const taskName = document
      .getElementById("taskNameInputCreate")
      .value.trim();
    const taskDescription = document.getElementById(
      "taskDescriptionInputCreate"
    ).value;

    const [year, month, day] = document
      .getElementById("dateInputCreate")
      .value.split("-");
    const date = `${day}.${month}.${year}`;
    const time = document.getElementById("timeInputCreate").value;

    if (taskName && date && time) {
      createTask({
        taskName: taskName,
        taskDescription: taskDescription,
        date: date,
        time: time,
      });
    } else {
      alert("Please fill in all required fields: Name, Date, and Time.");
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
          <div className="flex flex-row max-h-[var(--bigger-radius)] rounded-t-[50%] bg-ls">
            <p className="flex flex-1 min-w-0 w-0 justify-center items-center flex-grow  p-[var(--gap)] rounded-tl-[var(--gap)] border-[length:var(--border-width)] border-b-0 border-r-0 border-solid border-lf bg-ls text-lf text-[length:var(--bigger-font-size)] font-bold">
              TASK EDITION
            </p>
            <ButtonClose onClick={hide} />
          </div>
          <div className="flex flex-col overflow-y-auto gap-y-[var(--gap)] p-[var(--gap)] rounded-b-[var(--gap)] border-[length:var(--border-width)] border-t-0 border-solid border-lf bg-ls">
            <input
              id="taskNameInputCreate"
              type="text"
              placeholder="Name"
              className="input w-full"
            />
            <textarea
              id="taskDescriptionInputCreate"
              rows="3"
              placeholder="Description"
              className="input w-full resize-none flex-shrink-0"
            />
            <div className="flex flex-row gap-x-[var(--gap)]">
              <input
                id="timeInputCreate"
                type="time"
                className="input flex-1"
              />
              <input
                id="dateInputCreate"
                type="date"
                className="input flex-1"
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

function TaskEditionDialogueWindow({
  isShown,
  hide,
  cardObject,
  applyChanges,
}) {
  function buttonApplyFunction() {
    const taskName = document.getElementById("taskNameInputEdit").value.trim();
    const taskDescription = document.getElementById(
      "taskDescriptionInputEdit"
    ).value;

    const [year, month, day] = document
      .getElementById("dateInputEdit")
      .value.split("-");
    const date = `${day}.${month}.${year}`;
    const time = document.getElementById("timeInputEdit").value;

    if (taskName && date && time) {
      applyChanges({
        id: cardObject.id,
        taskName: taskName,
        taskDescription: taskDescription,
        date: date,
        time: time,
      });
    } else {
      alert("Please fill in all required fields: Name, Date, and Time.");
    }
  }

  let dateInputValue = null;

  if (cardObject) {
    const [day, month, year] = cardObject.date.split(".");
    dateInputValue = `${year}-${month}-${day}`;
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
          <div className="flex flex-row max-h-[var(--bigger-radius)] rounded-t-[50%] bg-ls">
            <p className="flex flex-1 min-w-0 w-0 justify-center items-center flex-grow  p-[var(--gap)] rounded-tl-[var(--gap)] border-[length:var(--border-width)] border-b-0 border-r-0 border-solid border-lf bg-ls text-lf text-[length:var(--bigger-font-size)] font-bold">
              TASK EDITION
            </p>
            <ButtonClose onClick={hide} />
          </div>
          <div className="flex flex-col overflow-y-auto gap-y-[var(--gap)] p-[var(--gap)] rounded-b-[var(--gap)] border-[length:var(--border-width)] border-t-0 border-solid border-lf bg-ls">
            <input
              id="taskNameInputEdit"
              type="text"
              placeholder="Name"
              className="input w-full"
              defaultValue={cardObject ? cardObject.taskName : ""}
            />
            <textarea
              id="taskDescriptionInputEdit"
              rows="3"
              placeholder="Description"
              className="input w-full resize-none flex-shrink-0"
              defaultValue={cardObject ? cardObject.taskDescription : ""}
            />
            <div className="flex flex-row gap-x-[var(--gap)]">
              <input
                id="timeInputEdit"
                type="time"
                className="input flex-1"
                defaultValue={cardObject ? cardObject.time : ""}
              />
              <input
                id="dateInputEdit"
                type="date"
                className="input flex-1"
                defaultValue={cardObject ? dateInputValue : ""}
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

function MyTasksTabContent() {
  const [cardObjectList, setCardObjectList] = useState([
    {
      id: "1",
      taskName: "TASK_NAME1",
      taskDescription:
        "TASK_DESCRIPTION1 TASK_DESCRIPTION1 TASK_DESCRIPTION1 TASK_DESCRIPTION1 TASK_DESCRIPTION1 TASK_DESCRIPTION1 TASK_DESCRIPTION1 TASK_DESCRIPTION1 TASK_DESCRIPTION1 TASK_DESCRIPTION1 TASK_DESCRIPTION1 TASK_DESCRIPTION1 TASK_DESCRIPTION1 TASK_DESCRIPTION1 TASK_DESCRIPTION1 TASK_DESCRIPTION1 TASK_DESCRIPTION1 TASK_DESCRIPTION1 TASK_DESCRIPTION1 TASK_DESCRIPTION1 TASK_DESCRIPTION1 TASK_DESCRIPTION1 TASK_DESCRIPTION1 TASK_DESCRIPTION1",
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
  ]);

  // useEffect(() => {
  //   const sortedList = [...cardObjectList].sort((a, b) => {
  //     const dateA = new Date(a.date.split(".").reverse().join("-") + "T" + a.time);
  //     const dateB = new Date(b.date.split(".").reverse().join("-") + "T" + b.time);

  //     return dateA - dateB;
  //   });

  // }, [cardObjectList])

  const [isCreationWindowShown, setIsCreationWindowShown] = useState(false);

  const [isEditionWindowShown, setIsEditionWindowShown] = useState(false);

  const [editedCardObject, setEditedCardObject] = useState(null);

  function handleDelete(id) {
    setCardObjectList(
      cardObjectList.filter((cardObject) => cardObject.id !== id)
    );
  }

  function handleEdit(id) {
    setEditedCardObject(
      cardObjectList.find((cardObject) => cardObject.id === id)
    );
    setIsEditionWindowShown(true);
  }

  function applyChanges(newCardObject) {
    const id = newCardObject.id;
    setCardObjectList((prevCardObjectList) =>
      prevCardObjectList.map((cardObject) =>
        cardObject.id === id ? newCardObject : cardObject
      )
    );
    setIsEditionWindowShown(false);
  }

  function createTask(newCardObject) {
    let maxId = cardObjectList.length
      ? Math.max(...cardObjectList.map((item) => Number(item.id)))
      : 0;
    setCardObjectList([
      ...cardObjectList,
      { ...newCardObject, id: (maxId + 1).toString() },
    ]);
    setIsCreationWindowShown(false);
  }

  return (
    <>
      <TaskEditionDialogueWindow
        isShown={isEditionWindowShown}
        hide={() => setIsEditionWindowShown(false)}
        applyChanges={applyChanges}
        cardObject={editedCardObject}
      />
      <TaskCreationDialogueWindow
        isShown={isCreationWindowShown}
        hide={() => setIsCreationWindowShown(false)}
        createTask={createTask}
      />
      <Panel
        buttonSearchFunction={() => console.log("Search pressed")}
        buttonSearchToolTip={"Find task"}
        buttonAddFunction={() => setIsCreationWindowShown(true)}
        buttonAddToolTip={"Create task"}
      />
      <CardList
        cardObjectList={cardObjectList}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </>
  );
}

export default MyTasksTabContent;
