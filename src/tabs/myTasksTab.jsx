import { useState, useEffect, useRef, useContext } from "react";
import { ButtonAdd, ButtonClose, ButtonComplete } from "../blocks/buttons";
import { Overlay } from "../blocks/base";
import { CardList } from "../blocks/secondary";
import { CrossSVG, SearchSVG } from "../blocks/SVGs";
import { UserContext } from "../App";

function TaskCreationDialogueWindow({ isShown, hide, createTask }) {
  const [formData, setFormData] = useState({
    taskName: "",
    taskDescription: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    if (isShown) {
      setFormData({
        taskName: "",
        taskDescription: "",
        date: "",
        time: "",
      });
    }
  }, [isShown]);

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
          <div className="flex flex-row max-h-[var(--bigger-radius)] rounded-t-[50%] bg-second">
            <p className="flex flex-1 min-w-0 w-0 justify-center items-center flex-grow  p-[var(--gap)] rounded-tl-[var(--gap)] border-[length:var(--border-width)] border-b-0 border-r-0 border-solid border-first bg-second text-fa text-[length:var(--bigger-font-size)] font-bold select-none">
              TASK CREATION
            </p>
            <ButtonClose onClick={hide} />
          </div>
          <div className="flex flex-col overflow-y-auto gap-y-[var(--gap)] p-[var(--gap)] rounded-b-[var(--gap)] border-[length:var(--border-width)] border-t-0 border-solid border-first bg-second">
            <input
              id="taskNameInputCreate"
              type="text"
              placeholder="Name"
              className="input w-full"
              value={formData.taskName}
              onChange={(e) =>
                setFormData({ ...formData, taskName: e.target.value })
              }
            />
            <textarea
              id="taskDescriptionInputCreate"
              rows="3"
              placeholder="Description"
              className="input w-full resize-none flex-shrink-0"
              value={formData.taskDescription}
              onChange={(e) =>
                setFormData({ ...formData, taskDescription: e.target.value })
              }
            />
            <div className="flex flex-row gap-x-[var(--gap)]">
              <input
                id="timeInputCreate"
                type="time"
                className="input flex-1"
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
              />
              <input
                id="dateInputCreate"
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

function TaskEditionDialogueWindow({
  isShown,
  hide,
  cardObject,
  applyChanges,
}) {
  const [formData, setFormData] = useState({
    taskName: "",
    taskDescription: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    if (isShown) {
      setFormData({
        ...cardObject,
        ...{ date: cardObject.date.split(".").reverse().join("-") },
      });
    }
  }, [isShown]);

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
              id="taskNameInputEdit"
              type="text"
              placeholder="Name"
              className="input w-full"
              value={formData.taskName}
              onChange={(e) =>
                setFormData({ ...formData, taskName: e.target.value })
              }
            />
            <textarea
              id="taskDescriptionInputEdit"
              rows="3"
              placeholder="Description"
              className="input w-full resize-none flex-shrink-0"
              value={formData.taskDescription}
              onChange={(e) =>
                setFormData({ ...formData, taskDescription: e.target.value })
              }
            />
            <div className="flex flex-row gap-x-[var(--gap)]">
              <input
                id="timeInputEdit"
                type="time"
                className="input flex-1"
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
              />
              <input
                id="dateInputEdit"
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
              onClick={buttonApplyFunction}
              tooltip="Apply changes"
            />
          </div>
        </div>
      }
    />
  );
}

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
          className="flex p-[var(--gap)] items-center justify-center h-[var(--diameter)] w-[var(--diameter)] border-solid border-first bg-third text-placeholder border-[length:var(--border-width)] border-l-0 hover:text-fa transition rounded-r-[var(--gap)] active:text-fa cursor-pointer"
        >
          <CrossSVG additionalStyles="h-[var(--radius)]" />
        </div>
      </div>
      <ButtonAdd onClick={buttonAddFunction} tooltip={buttonAddToolTip} />
    </div>
  );
}

function MyTasksTabContent() {
  const [cardObjectList, setCardObjectList] = useState([]);

  const { user, setuser } = useContext(UserContext);
  // console.log(user);

  let allTasks = [
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
      date: "03.12.2024",
      time: "11:31",
    },
  ];

  useEffect(() => {
    setCardObjectList(allTasks);
  }, []);

  useEffect(() => {
    setCardObjectList((prevList) => {
      const sortedList = [...prevList].sort((a, b) => {
        const dateA = new Date(
          a.date.split(".").reverse().join("-") + "T" + a.time
        );
        const dateB = new Date(
          b.date.split(".").reverse().join("-") + "T" + b.time
        );
        return dateA - dateB;
      });

      const isSorted = prevList.every(
        (item, index) => item === sortedList[index]
      );
      return isSorted ? prevList : sortedList;
    });
  }, [cardObjectList]);

  const [isCreationWindowShown, setIsCreationWindowShown] = useState(false);

  const [isEditionWindowShown, setIsEditionWindowShown] = useState(false);
  const [editedCardObject, setEditedCardObject] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredCards = cardObjectList.filter((card) =>
    card.taskName.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        buttonAddFunction={() => setIsCreationWindowShown(true)}
        buttonAddToolTip={"Create task"}
      />
      {cardObjectList ? (
        <CardList
          cardObjectList={filteredCards}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      ) : (
        <div className="p-[var(--gap)] text-accent text-[length:var(--bigger-font-size)] text-center">
          It seems you are out of tasks.
        </div>
      )}
    </>
  );
}

export default MyTasksTabContent;
