import { useEffect, useRef, useState } from "react";
import { useFetch } from "../hooks";
import { useParams } from "react-router-dom";
import { ButtonAdd, ButtonClose, ButtonComplete } from "../blocks/buttons";
import { Overlay } from "../blocks/base";
import { CardList } from "../blocks/secondary";
import { ProfileSVG, GroupSVG, CrossSVG, SearchSVG } from "../blocks/SVGs";

function UserPreviewCard({ userInfoObject }) {
  return (
    <div className="flex flex-col gap-y-[var(--half-gap)] w-[var(--diameter)]">
      <div className="flex justify-center items-center h-[var(--diameter)] aspect-square rounded-[50%] bg-third border-[length:var(--border-width)] border-solid border-accent text-accent">
        {userInfoObject.picture || (
          <ProfileSVG additionalStyles={"h-[80%] w-auto"} />
        )}
      </div>
      <div className="whitespace-nowrap overflow-hidden text-ellipsis leading-none text-accent text-[length:var(--smaller-font-size)]">
        {userInfoObject.name}
      </div>
    </div>
  );
}

function GroupDescription({
  name,
  id,
  userObjectList,
  showAllMembersButtonFunction,
}) {
  const memberList = useRef(null);
  const [allMembersButtonState, setallMembersButtonState] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (memberList.current) {
        setallMembersButtonState(
          memberList.current.scrollWidth > memberList.current.clientWidth
        );
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [userObjectList]);

  return (
    <>
      <div className="flex flex-row items-center justify-between gap-x-[var(--gap)] p-[var(--gap)] bg-first ">
        <div className="flex-1 text-third text-[length:var(--bigger-font-size)] font-bold whitespace-nowrap overflow-hidden text-ellipsis">
          {name}
        </div>
        <div
          onClick={() => {
            navigator.clipboard.writeText(id);
          }}
          className="flex flex-row aspect-square mobile:aspect-auto items-center justify-center gap-x-[var(--gap)] p-[var(--gap)] text-accent bg-third rounded-[var(--gap)] leading-none cursor-pointer active:bg-tint transition"
        >
          <div className="flex-row flex-1 gap-x-[var(--gap)] hidden mobile:flex text-center text-[length:var(--normal-font-size)] select-none">
            ID:
            <span className="max-w-[100px] tablet:max-w-[200px] whitespace-nowrap overflow-hidden text-ellipsis">
              {id}
            </span>
          </div>
          <svg
            className="h-[var(--normal-font-size)] w-auto"
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            width="720pt"
            height="880pt"
            viewBox="0 0 720 880"
            preserveAspectRatio="xMidYMid meet"
          >
            <g transform="translate(0,880) scale(0.1,-0.1)">
              <path d="M0 5400 l0 -3400 600 0 600 0 0 400 0 400 -200 0 -200 0 0 2600 0 2600 1800 0 1800 0 0 -200 0 -200 400 0 400 0 0 600 0 600 -2600 0 -2600 0 0 -3400z" />
              <path d="M2000 3400 l0 -3400 2600 0 2600 0 0 3400 0 3400 -2600 0 -2600 0 0 -3400z m4400 0 l0 -2600 -1800 0 -1800 0 0 2600 0 2600 1800 0 1800 0 0 -2600z" />
            </g>
          </svg>
        </div>
      </div>
      <div className="flex flex-row gap-x-[var(--gap)] p-[var(--gap)] border-b-[length:var(--border-width)] border-solid border-first">
        <div
          ref={memberList}
          className={"flex flex-row gap-x-[var(--gap)] overflow-x-hidden"}
        >
          {userObjectList.map((userInfoObject, index) => (
            <UserPreviewCard key={index} userInfoObject={userInfoObject} />
          ))}
        </div>
        {allMembersButtonState && (
          <div className="relative py-[var(--gap)] pl-[var(--gap)] flex items-center justify-center">
            <div className="absolute right-[calc(100%+var(--gap))] inset-y-0 bg-[linear-gradient(90deg,#f0f0f000,#f0f0f0ff)] w-[var(--diameter)]"></div>
            <div
              title="Show all members"
              onClick={showAllMembersButtonFunction}
              className="flex h-[var(--diameter)] aspect-square p-[var(--gap)] rounded-[var(--gap)] bg-third border-[length:var(--border-width)] border-solid border-accent text-accent cursor-pointer hover:bg-first hover:text-third hover:border-first active:bg-fint active:text-third active:border-fint transition"
            >
              <GroupSVG additionalStyles={"w-full h-auto"} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function UserPreviewHorizontal({ userInfoObject }) {
  return (
    <div className="flex flex-row gap-x-[var(--gap)] h-[var(--diameter)] items-center">
      <div className="flex justify-center items-center h-full aspect-square rounded-[50%] bg-third border-[length:var(--border-width)] border-solid border-accent text-accent">
        {userInfoObject.picture || (
          <ProfileSVG additionalStyles={"h-[80%] w-auto"} />
        )}
      </div>
      <div className="whitespace-nowrap overflow-hidden text-ellipsis leading-none text-first text-[length:var(--normal-font-size)] font-bold">
        {userInfoObject.name}
      </div>
    </div>
  );
}

function MembersDialogueWindow({ isShown, hide, userObjectList }) {
  return (
    <Overlay
      isShown={isShown == 1}
      hideOverlay={hide}
      content={
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex flex-col max-h-full w-full max-w-[40em] flex-shrink"
        >
          <div className="flex flex-row max-h-[var(--bigger-radius)] rounded-t-[50%] bg-second">
            <p className="flex flex-1 min-w-0 w-0 justify-center items-center flex-grow p-[var(--gap)] rounded-tl-[var(--gap)] border-[length:var(--border-width)] border-b-0 border-r-0 border-solid border-first bg-second text-first text-[length:var(--bigger-font-size)] font-bold">
              GROUP MEMBERS
            </p>
            <ButtonClose onClick={hide} />
          </div>
          <div className="flex flex-col overflow-y-auto gap-y-[var(--gap)] p-[var(--gap)] rounded-b-[var(--gap)] border-[length:var(--border-width)] border-t-0 border-solid border-first bg-second">
            {userObjectList.map((userInfoObject, index) => (
              <UserPreviewHorizontal
                key={index}
                userInfoObject={userInfoObject}
              />
            ))}
          </div>
        </div>
      }
    />
  );
}

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
          className="input border-x-0 rounded-[0] flex-1"
        />
        <div
          onClick={() => {
            setSearchQuery("");
            inputRef.current.focus();
          }}
          className="flex p-[var(--gap)] items-center justify-center h-[var(--diameter)] w-[var(--diameter)] border-solid border-first bg-third text-placeholder border-[length:var(--border-width)] border-l-0 hover:text-first transition rounded-r-[var(--gap)] active:text-fint cursor-pointer"
        >
          <CrossSVG additionalStyles="h-[var(--radius)]" />
        </div>
      </div>
      <ButtonAdd onClick={buttonAddFunction} tooltip={buttonAddToolTip} />
    </div>
  );
}

function GroupTasksTabContent() {
  const { id } = useParams();

  const {
    data: users,
    isPending: usersPending,
    error: usersError,
  } = useFetch("http://localhost:8000/users");

  const {
    data: tasks,
    isPending: tasksPending,
    error: tasksError,
  } = useFetch("http://localhost:8000/tasks");

  const {
    data: groupInfo,
    isPending: groupPending,
    error: groupError,
  } = useFetch(`http://localhost:8000/groups/${id}`);

  const [cardObjectList, setCardObjectList] = useState(null);
  const [memberList, setMemberList] = useState(null);

  useEffect(() => {
    if (
      !tasks ||
      !groupInfo ||
      !users ||
      !groupInfo.tasks ||
      !groupInfo.members
    )
      return;

    const allTasks = tasks.filter((task) => groupInfo.tasks.includes(task.id));
    const members = users.filter((user) => groupInfo.members.includes(user.id));

    setCardObjectList(allTasks);
    setMemberList(members);
  }, [tasks, groupInfo, users]);

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

      const isSorted = prevList
        ? prevList.every((item, index) => item === sortedList[index])
        : false;
      return isSorted ? prevList : sortedList;
    });
  }, [cardObjectList]);

  const [isMembersDialogueWindowShown, setIsMembersDialogueWindowShown] =
    useState(false);

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

  const [filteredCards, setFilteredCards] = useState([]);

  useEffect(() => {
    cardObjectList &&
      setFilteredCards(
        cardObjectList.filter((card) =>
          card.taskName.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
  }, [cardObjectList, searchQuery]);

  return (
    <>
      {memberList && (
        <MembersDialogueWindow
          isShown={isMembersDialogueWindowShown}
          hide={() => setIsMembersDialogueWindowShown(false)}
          userObjectList={memberList}
        />
      )}
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
      {memberList && (
        <GroupDescription
          name={groupInfo.name}
          id={id}
          userObjectList={memberList}
          showAllMembersButton={() => setIsMembersDialogueWindowShown(true)}
        />
      )}
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
        !groupPending &&
        !groupError && (
          <div className="p-[var(--gap)] text-accent text-[length:var(--bigger-font-size)] text-center">
            It seems this group is out of tasks.
          </div>
        )
      )}
    </>
  );
}

export default GroupTasksTabContent;
