import { useEffect, useRef, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { ButtonClose } from "../blocks/buttons";
import { Overlay } from "../blocks/base";
import {
  Panel,
  TaskCreationDialogueWindow,
  TaskEditionDialogueWindow,
  CardList,
} from "../blocks/secondary";
import { ProfileSVG, GroupSVG } from "../blocks/SVGs";
import { API_URL_WS, ACCESS_TOKEN } from "../constants";
import { UserContext } from "../App";
import { createApi } from "../api";

function UserPreviewCard({ userInfoObject }) {
  return (
    <div className="flex flex-col gap-y-[var(--half-gap)] w-[var(--diameter)]">
      <div className="flex justify-center items-center h-[var(--diameter)] aspect-square rounded-[50%] bg-third border-[length:var(--border-width)] border-solid border-accent text-accent">
        <ProfileSVG additionalStyles={"h-[80%] w-auto"} />
      </div>
      <div className="whitespace-nowrap overflow-hidden text-ellipsis leading-none text-accent text-center text-[length:var(--smaller-font-size)]">
        {userInfoObject.username}
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
          className="flex flex-row aspect-square mobile:aspect-auto items-center justify-center gap-x-[var(--gap)] p-[var(--gap)] text-accent bg-third rounded-[var(--gap)] leading-none cursor-pointer active:!bg-tint "
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
              className="flex h-[var(--diameter)] aspect-square p-[var(--gap)] rounded-[var(--gap)] bg-third border-[length:var(--border-width)] border-solid border-accent text-accent cursor-pointer cursor:hover:bg-first cursor:hover:text-ta cursor:hover:border-first active:!bg-fint active:!text-ta active:!border-fint "
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
        <ProfileSVG additionalStyles={"h-[80%] w-auto"} />
      </div>
      <div className="whitespace-nowrap overflow-hidden text-ellipsis leading-none text-fa text-[length:var(--normal-font-size)] font-bold">
        {userInfoObject.username}
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
            {userObjectList.map((userInfoObject) => (
              <UserPreviewHorizontal
                key={userInfoObject.id}
                userInfoObject={userInfoObject}
              />
            ))}
          </div>
        </div>
      }
    />
  );
}

function GroupTasksTabContent() {
  const { id } = useParams();

  const [groupInfo, setGroupInfo] = useState(null);
  const [users, setUsers] = useState([]);
  const [cardObjectList, setCardObjectList] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");

  const { storedAs } = useContext(UserContext);

  // const [groupSocket, setGroupSocket] = useState(null);
  const socketRef = useRef(null);

  function getSortedCurrentTasks(tasks) {
    if (tasks) {
      const now = new Date();
      const sortedCurrentTasks =
        tasks.length < 2
          ? tasks.filter((taskObject) => {
              if (taskObject.state !== 0) return false;
              return new Date(taskObject.deadline) > now;
            })
          : tasks
              .filter((taskObject) => {
                if (taskObject.state !== 0) return false;
                return new Date(taskObject.deadline) > now;
              })
              .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

      return sortedCurrentTasks;
    }
  }

  function handleWSMessage(data) {
    const event = data.event;
    if (event === "task_created") {
      const newCardObject = data.task;
      setCardObjectList((prevCardObjectList) =>
        getSortedCurrentTasks([...prevCardObjectList, newCardObject])
      );
    } else if (event === "task_updated") {
      const newCardObject = data.task;
      setCardObjectList((prevCardObjectList) =>
        getSortedCurrentTasks(
          prevCardObjectList.map((cardObject) =>
            cardObject.id === newCardObject.id ? newCardObject : cardObject
          )
        )
      );
    } else if (
      event === "task_deleted" ||
      event === "task_expired" ||
      event === "task_completed"
    ) {
      setCardObjectList((prevCardObjectList) =>
        prevCardObjectList.filter(
          (cardObject) => cardObject.id !== data.task_id
        )
      );
    } else {
      console.error("Unknown event: ", event);
    }
  }

  useEffect(() => {
    async function fetchGroupDataAndConnect() {
      try {
        const api = createApi(storedAs);
        const response = await api.get(`/api/groups/${id}/`);

        if (response.status === 200) {
          console.log("Group info: ", response.data);

          setGroupInfo({
            id: response.data.id,
            name: response.data.name,
          });
          setUsers(response.data.members);
          setCardObjectList(getSortedCurrentTasks(response.data.tasks));

          GroupSocketConnect();
        } else {
          // console.log("Couldn't get group info in groupTasksTab.jsx");
          setError("Couldn't get group info in groupTasksTab.jsx");
        }
      } catch (error) {
        // console.error("Error getting group info in groupTasksTab.jsx: ", error);
        setError("Error getting group info in groupTasksTab.jsx");
      } finally {
        setIsLoading(false);
      }
    }

    function GroupSocketConnect() {
      if (
        socketRef.current &&
        socketRef.current.readyState === WebSocket.OPEN
      ) {
        socketRef.current.close();
      }

      let access;
      if (storedAs === 1) {
        access = localStorage.getItem(ACCESS_TOKEN);
      } else if (storedAs === 2) {
        access = sessionStorage.getItem(ACCESS_TOKEN);
      }

      socketRef.current = new WebSocket(
        `${API_URL_WS}/ws/groups/${id}/?token=${access}`
      );
      // socketRef.current = ws;
      // setGroupSocket(ws);

      socketRef.current.onopen = () => {
        console.log("GroupSocket opened");
      };

      socketRef.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("WS receive: ", data);
        handleWSMessage(data);
      };

      socketRef.current.onclose = () => {
        console.log("GroupSocket closed");
      };
    }

    fetchGroupDataAndConnect();

    return () => {
      if (
        socketRef.current &&
        socketRef.current.readyState === WebSocket.OPEN
      ) {
        socketRef.current.close();
      }
    };
  }, [id]);

  const [isMembersDialogueWindowShown, setIsMembersDialogueWindowShown] =
    useState(false);
  const [isCreationWindowShown, setIsCreationWindowShown] = useState(false);
  const [isEditionWindowShown, setIsEditionWindowShown] = useState(false);
  const [editedCardObject, setEditedCardObject] = useState(null);

  function sendGroupSocketMessage(message) {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      console.log(message);
      socketRef.current.send(JSON.stringify(message));
    } else {
      console.error("WebSocket is not connected.");
    }
  }

  function handleComplete(id) {
    const message = {
      command: "complete",
      data: id,
    };
    sendGroupSocketMessage(message);
  }

  function handleDelete(id) {
    const message = {
      command: "delete",
      data: id,
    };
    sendGroupSocketMessage(message);
  }

  function handleEdit(id) {
    setEditedCardObject(
      cardObjectList.find((cardObject) => cardObject.id === id)
    );
    setIsEditionWindowShown(true);
  }

  function applyChanges(newCardObject) {
    const message = {
      command: "update",
      data: newCardObject,
    };
    sendGroupSocketMessage(message);
    setIsEditionWindowShown(false);
  }

  function handleCreate(newCardObject) {
    const message = {
      command: "create",
      data: newCardObject,
    };
    sendGroupSocketMessage(message);
    setIsCreationWindowShown(false);
  }

  useEffect(() => {
    if (cardObjectList) {
      const filtered = cardObjectList.filter((card) =>
        card.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCards(filtered);
    }
  }, [cardObjectList, searchQuery]);

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
      <TaskCreationDialogueWindow
        isShown={isCreationWindowShown}
        hide={() => setIsCreationWindowShown(false)}
        createTask={handleCreate}
      />
      <TaskEditionDialogueWindow
        isShown={isEditionWindowShown}
        hide={() => setIsEditionWindowShown(false)}
        cardObject={editedCardObject}
        applyChanges={applyChanges}
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
      {cardObjectList ? (
        <CardList
          cardObjectList={filteredCards}
          handleComplete={handleComplete}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      ) : (
        !isLoading &&
        !error && (
          <div className="p-[var(--gap)] text-accent text-[length:var(--bigger-font-size)] font-bold text-center">
            No tasks found.
          </div>
        )
      )}
    </>
  );
}

export default GroupTasksTabContent;
