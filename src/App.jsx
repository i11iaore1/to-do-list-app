import { useState, createContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";
import { Header, Wrapper, Footer } from "./blocks/base";
import MyTasksTabContent from "./tabs/myTasksTab";
import HomeTabContent from "./tabs/homeTab";
import MyProfileTabContent from "./tabs/myProfileTab";
import MyGroupsTabContent from "./tabs/myGroupsTab";
import GroupTasksTabContent from "./tabs/groupTasksTab";
import SignInTabContent from "./tabs/signInTab";
import RegisterTabContent from "./tabs/registerTab";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export const UserContext = createContext();
export const ThemeContext = createContext();

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [userTasks, setUserTasks] = useState([]);
  const [userGroups, setUserGroups] = useState([]);

  const [theme, setTheme] = useState(true);

  const tabList = [
    {
      tabName: "Home",
      path: "/",
      tabContent: <HomeTabContent />,
      isDisplayed: true,
    },
    {
      tabName: "My tasks",
      path: "/mytasks",
      tabContent: <MyTasksTabContent />,
      isDisplayed: currentUser,
    },
    {
      tabName: "My profile",
      path: "/myprofile",
      tabContent: <MyProfileTabContent />,
      isDisplayed: currentUser,
    },
    {
      tabName: "My groups",
      path: "/mygroups",
      tabContent: <MyGroupsTabContent />,
      isDisplayed: currentUser,
    },
    {
      tabName: "Group tasks",
      path: "/groups/:id",
      tabContent: <GroupTasksTabContent />,
      isDisplayed: false,
    },
    {
      tabName: "Sign in",
      path: "/signin",
      tabContent: <SignInTabContent />,
      isDisplayed: !currentUser,
    },
    {
      tabName: "Register",
      path: "/register",
      tabContent: <RegisterTabContent />,
      isDisplayed: !currentUser,
    },
  ];

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      const parsedUser = JSON.parse(user);

      const fetchUserInfo = async () => {
        try {
          const tasksPromises = parsedUser.tasks.map((taskId) =>
            fetch(`http://localhost:8000/tasks/${taskId}`).then((res) =>
              res.json()
            )
          );
          const tasksData = await Promise.all(tasksPromises);
          // console.log("TASKS DATA LOADED:/n" + tasksData);
          setUserTasks(tasksData);

          const response = await fetch(`http://localhost:8000/groups`);
          const groups = await response.json();
          const userGroups = groups.filter((group) =>
            group.members.includes(parsedUser.id)
          );

          setUserGroups(userGroups);
        } catch (error) {
          console.error(error);
        }
      };

      setCurrentUser(parsedUser);
      fetchUserInfo();
    }
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme !== null) {
      const isDarkTheme = JSON.parse(savedTheme);
      setTheme(isDarkTheme);
      document.body.className = isDarkTheme ? "dark" : "light";
    }
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Wrapper
          content={
            <UserContext.Provider
              value={{
                currentUser,
                setCurrentUser,
                userTasks,
                setUserTasks,
                userGroups,
                setUserGroups,
              }}
            >
              <Header tabList={tabList} />
              <Routes>
                {tabList.map((tabObject) => (
                  <Route
                    key={tabObject.tabName}
                    exact
                    path={tabObject.path}
                    element={tabObject.tabContent}
                  />
                ))}
              </Routes>
            </UserContext.Provider>
          }
        />
        <Footer />
      </ThemeContext.Provider>
    </Router>
  );
}

export default App;
