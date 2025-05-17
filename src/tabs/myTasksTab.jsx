import { useState, useEffect, useContext } from "react";
import {
  Panel,
  TaskCreationDialogueWindow,
  TaskEditionDialogueWindow,
  CardList,
} from "../blocks/secondary";
import { UserContext } from "../App";
import { USER_TASKS } from "../constants";
import { TIMEOUT_LIMIT } from "../constants";
import { createApi } from "../api";

function MyTasksTabContent() {
  const [cardObjectList, setCardObjectList] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const { userTasks, setUserTasks, storedAs } = useContext(UserContext);

  function ChangeTaskState(id, state) {
    const updatedTasks = userTasks.map((taskObject) =>
      taskObject.id === id ? { ...taskObject, state: state } : taskObject
    );
    setUserTasks(updatedTasks);
    // console.log(`task with id ${id} changed to state ${state}`);
    if (storedAs === 1) {
      localStorage.setItem(USER_TASKS, JSON.stringify(updatedTasks));
    } else {
      if (storedAs === 2) {
        sessionStorage.setItem(USER_TASKS, JSON.stringify(updatedTasks));
      }
    }
  }

  useEffect(() => {
    if (userTasks) {
      const currentTasks =
        userTasks.length < 2
          ? userTasks.filter((taskObject) => {
              return taskObject.state === 0;

              // return new Date(taskObject.deadline) > now;
            })
          : userTasks
              .filter((taskObject) => {
                return taskObject.state === 0;

                // return new Date(taskObject.deadline) > now;
              })
              .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

      setCardObjectList(currentTasks);
      // console.log("Current tasks: ", currentTasks);
    }
  }, [userTasks]);

  // useEffect(() => {
  //   console.log("Card object list: ", cardObjectList);
  // }, [cardObjectList]);

  async function tryExpireTask(id) {
    const api = createApi(storedAs);
    const response = await api.patch(`/api/tasks/${id}/`, { state: 2 });
    if (response.status === 200) {
      ChangeTaskState(id, 2);
    }
  }

  useEffect(() => {
    if (!cardObjectList.length) return;

    const nearestTask = cardObjectList[0];
    const nextDeadline = new Date(nearestTask.deadline);
    // console.log("Next deadline: ", nextDeadline);
    const timeout = nextDeadline - new Date();
    // console.log("Timeout is: ", timeout);
    if (timeout > TIMEOUT_LIMIT) {
      // console.log("Timeout is bigger than limit");
      return;
    }

    const timer = setTimeout(() => {
      cardObjectList.forEach((task) => {
        if (
          new Date(task.deadline).getTime() ===
          new Date(nearestTask.deadline).getTime()
        ) {
          tryExpireTask(task.id);
          if (editedCardObject) {
            if (editedCardObject.id === task.id) {
              setEditedCardObject(null);
              setIsEditionWindowShown(false);
            }
          }
        }
      });
    }, timeout);

    return () => {
      // console.log("Timeout cleared");
      clearTimeout(timer);
    };
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
    try {
      const api = createApi(storedAs);
      const response = await api.patch(`/api/tasks/${id}/`, { state: 1 });
      if (response.status === 200) {
        ChangeTaskState(id, 1);
      } else {
        // console.log("Couldn`t complete task in myTasksTab.jsx");
      }
    } catch (error) {
      // console.error("Error completing task in myTasksTab.jsx: ", error);
    }
  }

  async function handleDelete(id) {
    try {
      const api = createApi(storedAs);
      const response = await api.delete(`/api/tasks/${id}/`);
      if (response.status === 204) {
        const updatedTasks = userTasks.filter(
          (cardObject) => cardObject.id !== id
        );
        setUserTasks(updatedTasks);
        if (storedAs === 1) {
          localStorage.setItem(USER_TASKS, JSON.stringify(updatedTasks));
        } else {
          if (storedAs === 2) {
            sessionStorage.setItem(USER_TASKS, JSON.stringify(updatedTasks));
          }
        }
      } else {
        // console.log("Couldn`t delete task in myTasksTab.jsx");
      }
    } catch (error) {
      // console.error("Error deleting task in myTasksTab.jsx: ", error);
    }
  }

  function handleEdit(id) {
    setEditedCardObject(
      cardObjectList.find((cardObject) => cardObject.id === id)
    );
    setIsEditionWindowShown(true);
  }

  async function applyChanges(newCardObject) {
    const id = newCardObject.id;

    try {
      const api = createApi(storedAs);
      const response = await api.patch(`/api/tasks/${id}/`, {
        name: newCardObject.name,
        description: newCardObject.description,
        deadline: newCardObject.deadline,
      });
      if (response.status === 200) {
        const updatedTasks = userTasks.map((userTask) =>
          userTask.id === id ? response.data : userTask
        );
        setUserTasks(updatedTasks);
        if (storedAs === 1) {
          localStorage.setItem(USER_TASKS, JSON.stringify(updatedTasks));
        } else {
          if (storedAs === 2) {
            sessionStorage.setItem(USER_TASKS, JSON.stringify(updatedTasks));
          }
        }
        setIsEditionWindowShown(false);
      } else {
        // console.log("Couldn`t update task in myTasksTab.jsx");
      }
    } catch (error) {
      // console.error("Error updating task in myTasksTab.jsx: ", error);
    }
  }

  async function createTask(newCardObject) {
    try {
      const api = createApi(storedAs);
      const response = await api.post("/api/tasks/", {
        ...newCardObject,
        state: 0,
      });
      if (response.status === 201) {
        const updatedTasks = [...userTasks, response.data];
        setUserTasks(updatedTasks);
        if (storedAs === 1) {
          localStorage.setItem(USER_TASKS, JSON.stringify(updatedTasks));
        } else {
          if (storedAs === 2) {
            sessionStorage.setItem(USER_TASKS, JSON.stringify(updatedTasks));
          }
        }
        setIsCreationWindowShown(false);
      } else {
        // console.log("Couldn`t create task in myTasksTab.jsx");
      }
    } catch (error) {
      // console.error("Error creating task in myTasksTab.jsx: ", error);
    }
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
        <div className="p-[var(--gap)] text-accent text-[length:var(--bigger-font-size)] font-bold text-center">
          No tasks found.
        </div>
      )}
    </>
  );
}

export default MyTasksTabContent;
