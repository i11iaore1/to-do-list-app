import { useState, useEffect, useRef, useContext } from "react";
import { ButtonAdd, ButtonClose, ButtonComplete } from "../blocks/buttons";
import { Overlay } from "../blocks/base";
import { CardList } from "../blocks/secondary";
import { CrossSVG, SearchSVG } from "../blocks/SVGs";
import { UserContext } from "../App";

function TaskCreationDialogueWindow({ isShown, hide, createTask }) {
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
      const formattedDate = date.split("-").reverse().join(".");
      createTask({
        name: name,
        description: description,
        date: formattedDate,
        time: time,
      });
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

function TaskEditionDialogueWindow({
  isShown,
  hide,
  cardObject,
  applyChanges,
}) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
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
    const name = document.getElementById("taskNameInputEdit").value.trim();
    const description = document.getElementById(
      "taskDescriptionInputEdit"
    ).value;

    const [year, month, day] = document
      .getElementById("dateInputEdit")
      .value.split("-");
    const date = `${day}.${month}.${year}`;
    const time = document.getElementById("timeInputEdit").value;

    if (name && date && time) {
      applyChanges({
        id: cardObject.id,
        name: name,
        description: description,
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
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <textarea
              id="taskDescriptionInputEdit"
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
          className="flex p-[var(--gap)] items-center justify-center h-[var(--diameter)] w-[var(--diameter)] border-solid border-first bg-third text-placeholder border-[length:var(--border-width)] border-l-0 cursor:hover:text-fa rounded-r-[var(--gap)] active:text-fa cursor-pointer"
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
  const [filteredCards, setFilteredCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const { currentUser, setCurrentUser, userTasks, setUserTasks } =
    useContext(UserContext);

  useEffect(() => {
    if (userTasks) {
      const now = new Date();
      const currentTasks = userTasks.filter((taskObject) => {
        if (taskObject.state) {
          return false;
        } else {
          const taskDateTime = new Date(
            taskObject.date.split(".").reverse().join("-") +
              "T" +
              taskObject.time
          );
          return taskDateTime > now;
        }
      });

      setCardObjectList(currentTasks);
    }
  }, [userTasks]);

  useEffect(() => {
    setCardObjectList((prevList) => {
      const sortedList = [...prevList].sort((a, b) => {
        // console.log("a: ", a, "b: ", b);
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

  useEffect(() => {
    if (cardObjectList) {
      const filtered = cardObjectList.filter((card) =>
        card.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCards(filtered);
    }
  }, [cardObjectList, searchQuery]);

  const [isCreationWindowShown, setIsCreationWindowShown] = useState(false);

  const [isEditionWindowShown, setIsEditionWindowShown] = useState(false);
  const [editedCardObject, setEditedCardObject] = useState(null);

  async function handleComplete(id) {
    const updateResponse = await fetch(`http://localhost:8000/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ state: 1 }),
    });

    const updatedTasks = userTasks.map((taskObject) =>
      taskObject.id === id ? { ...taskObject, state: 1 } : taskObject
    );

    setUserTasks(updatedTasks);
  }

  async function handleDelete(id) {
    const deleteTaskResponse = await fetch(
      `http://localhost:8000/tasks/${id}`,
      {
        method: "DELETE",
      }
    );

    const updatedTasks = userTasks.filter((cardObject) => cardObject.id !== id);
    setUserTasks(updatedTasks);
    const updatedTaskIndexes = updatedTasks.map((taskObject) => taskObject.id);

    const updateResponse = await fetch(
      `http://localhost:8000/users/${currentUser.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tasks: updatedTaskIndexes,
        }),
      }
    );

    const newUserInfo = { ...currentUser, tasks: updatedTaskIndexes };
    setCurrentUser(newUserInfo);
    localStorage.setItem("user", JSON.stringify(newUserInfo));

    setIsCreationWindowShown(false);
  }

  function handleEdit(id) {
    setEditedCardObject(
      cardObjectList.find((cardObject) => cardObject.id === id)
    );
    setIsEditionWindowShown(true);
  }

  async function applyChanges(newCardObject) {
    const id = newCardObject.id;

    const updateResponse = await fetch(`http://localhost:8000/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCardObject),
    });

    const updatedTasks = cardObjectList.map((cardObject) =>
      cardObject.id === id ? newCardObject : cardObject
    );

    setUserTasks(updatedTasks);

    setIsEditionWindowShown(false);
  }

  async function createTask(newCardObject) {
    const response = await fetch("http://localhost:8000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...newCardObject, state: 0 }),
    });

    const createdTask = await response.json();
    const updatedTasks = [...userTasks, createdTask];
    const updatedTaskIndexes = updatedTasks.map((taskObject) => taskObject.id);

    const updateResponse = await fetch(
      `http://localhost:8000/users/${currentUser.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tasks: updatedTaskIndexes,
        }),
      }
    );

    const newUserInfo = { ...currentUser, tasks: updatedTaskIndexes };
    setCurrentUser(newUserInfo);
    localStorage.setItem("user", JSON.stringify(newUserInfo));
    setUserTasks(updatedTasks);

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
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        buttonAddFunction={() => setIsCreationWindowShown(true)}
        buttonAddToolTip={"Create task"}
      />
      {filteredCards.length > 0 ? (
        <CardList
          cardObjectList={filteredCards}
          handleComplete={handleComplete}
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
