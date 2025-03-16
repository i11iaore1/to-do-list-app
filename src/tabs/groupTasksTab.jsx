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
      <div className="whitespace-nowrap overflow-hidden text-ellipsis leading-none text-accent text-center text-[length:var(--smaller-font-size)]">
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
  const memberListRef = useRef(null);
  const [allMembersButtonState, setallMembersButtonState] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (memberListRef.current) {
        setallMembersButtonState(
          memberListRef.current.scrollWidth > memberListRef.current.clientWidth
        );
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [userObjectList]);

  return (
    <>
      <div className="flex flex-row items-center justify-between gap-x-[var(--gap)] p-[var(--gap)] bg-[linear-gradient(0deg,rgba(var(--first)),rgba(var(--second)))] ">
        <div className="flex-1 text-ta text-[length:var(--bigger-font-size)] font-bold whitespace-nowrap overflow-hidden text-ellipsis">
          {name}
        </div>
        <div
          onClick={() => {
            navigator.clipboard.writeText(id);
          }}
          className="flex flex-row aspect-square mobile:aspect-auto items-center justify-center gap-x-[var(--gap)] p-[var(--gap)] text-accent bg-third rounded-[var(--gap)] leading-none cursor-pointer active:bg-tint "
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
          ref={memberListRef}
          className={"flex flex-row gap-x-[var(--gap)] overflow-x-hidden"}
        >
          {userObjectList.map((userInfoObject, index) => (
            <UserPreviewCard key={index} userInfoObject={userInfoObject} />
          ))}
        </div>
        {allMembersButtonState && (
          <div className="relative py-[var(--gap)] pl-[var(--gap)] flex items-center justify-center">
            <div className="absolute right-[calc(100%+var(--gap))] inset-y-0 bg-[linear-gradient(90deg,#00000000,rgba(var(--third-second)))] w-[var(--diameter)]"></div>
            <div
              title="Show all members"
              onClick={showAllMembersButtonFunction}
              className="flex h-[var(--diameter)] aspect-square p-[var(--gap)] rounded-[var(--gap)] bg-third border-[length:var(--border-width)] border-solid border-accent text-accent cursor-pointer cursor:hover:bg-first cursor:hover:text-ta cursor:hover:border-first active:bg-fint active:text-ta active:border-fint "
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
      <div className="whitespace-nowrap overflow-hidden text-ellipsis leading-none text-fa text-[length:var(--normal-font-size)] font-bold">
        {userInfoObject.name}
      </div>
    </div>
  );
}

function MembersDialogueWindow({ isShown, hide, userObjectList }) {
  return (
    <Overlay
      isShown={isShown}
      hideOverlay={hide}
      content={
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex flex-col max-h-full w-full max-w-[40em] flex-shrink"
        >
          <div className="flex flex-row max-h-[var(--bigger-radius)] rounded-t-[50%] bg-second">
            <p className="flex flex-1 min-w-0 w-0 justify-center items-center flex-grow p-[var(--gap)] rounded-tl-[var(--gap)] border-[length:var(--border-width)] border-b-0 border-r-0 border-solid border-first bg-second text-fa text-[length:var(--bigger-font-size)] font-bold select-none">
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
    const name = document.getElementById("taskNameInputCreate").value.trim();
    const description = document.getElementById(
      "taskDescriptionInputCreate"
    ).value;

    const [year, month, day] = document
      .getElementById("dateInputCreate")
      .value.split("-");
    const date = `${day}.${month}.${year}`;
    const time = document.getElementById("timeInputCreate").value;

    if (name && date && time) {
      createTask({
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
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <textarea
              id="taskDescriptionInputCreate"
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
            <p className="flex flex-1 min-w-0 w-0 justify-center items-center flex-grow p-[var(--gap)] rounded-tl-[var(--gap)] border-[length:var(--border-width)] border-b-0 border-r-0 border-solid border-first bg-second text-fa text-[length:var(--bigger-font-size)] font-bold select-none">
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
          className="input border-x-0 rounded-[0] flex-1"
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

function GroupTasksTabContent() {
  const { id } = useParams();

  const [groupInfo, setGroupInfo] = useState(null);
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const groupResponse = await fetch(`http://localhost:8000/groups/${id}`);
        const groupData = await groupResponse.json();
        setGroupInfo(groupData);

        const memberPromises = groupData.members.map((memberId) =>
          fetch(`http://localhost:8000/users/${memberId}`).then((response) =>
            response.json()
          )
        );
        const membersData = await Promise.all(memberPromises);
        setUsers(membersData);

        const taskPromises = groupData.tasks.map((taskId) =>
          fetch(`http://localhost:8000/tasks/${taskId}`).then((response) =>
            response.json()
          )
        );
        const tasksData = await Promise.all(taskPromises);
        setTasks(tasksData);

        setIsLoading(false);
      } catch (error) {
        setError("Failed fetching group info");
      }
    };

    fetchGroupData();
  }, [id]);

  useEffect(() => {
    setTasks((prevList) => {
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
  }, [tasks]);

  const [isMembersDialogueWindowShown, setIsMembersDialogueWindowShown] =
    useState(false);

  const [isCreationWindowShown, setIsCreationWindowShown] = useState(false);

  const [isEditionWindowShown, setIsEditionWindowShown] = useState(false);
  const [editedCardObject, setEditedCardObject] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");

  function handleDelete(id) {
    setTasks(tasks.filter((cardObject) => cardObject.id !== id));
  }

  function handleEdit(id) {
    setEditedCardObject(tasks.find((cardObject) => cardObject.id === id));
    setIsEditionWindowShown(true);
  }

  function applyChanges(newCardObject) {
    const id = newCardObject.id;
    setTasks((prevCardObjectList) =>
      prevCardObjectList.map((cardObject) =>
        cardObject.id === id ? newCardObject : cardObject
      )
    );
    setIsEditionWindowShown(false);
  }

  function createTask(newCardObject) {
    let maxId = tasks.length ? Math.max(...tasks.map((item) => item.id)) : 0;
    setTasks([...tasks, { ...newCardObject, id: (maxId + 1).toString() }]);
    setIsCreationWindowShown(false);
  }

  const [filteredCards, setFilteredCards] = useState([]);

  useEffect(() => {
    tasks &&
      setFilteredCards(
        tasks.filter((card) =>
          card.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
  }, [tasks, searchQuery]);

  return (
    <>
      {isLoading && (
        <div className="p-[var(--gap)] text-fa text-[length:var(--normal-font-size)] font-bold">
          Loading...
        </div>
      )}
      {error && (
        <div className="p-[var(--gap)] text-error text-[length:var(--normal-font-size)] font-bold">
          {error}
        </div>
      )}
      {users && (
        <MembersDialogueWindow
          isShown={isMembersDialogueWindowShown}
          hide={() => setIsMembersDialogueWindowShown(false)}
          userObjectList={users}
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
      {users && groupInfo && (
        <GroupDescription
          name={groupInfo.name}
          id={id}
          userObjectList={users}
          showAllMembersButtonFunction={() =>
            setIsMembersDialogueWindowShown(true)
          }
        />
      )}
      <Panel
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        buttonAddFunction={() => setIsCreationWindowShown(true)}
        buttonAddToolTip={"Create task"}
      />
      {tasks ? (
        <CardList
          cardObjectList={filteredCards}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      ) : (
        !isLoading &&
        !error && (
          <div className="p-[var(--gap)] text-accent text-[length:var(--bigger-font-size)] text-center">
            It seems this group is out of tasks.
          </div>
        )
      )}
    </>
  );
}

export default GroupTasksTabContent;
