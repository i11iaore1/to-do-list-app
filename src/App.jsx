import { useState, createContext, useEffect, useMemo } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import { Header, Wrapper, Footer, ProtectedRoute } from "./blocks/base";
import MyTasksTabContent from "./tabs/myTasksTab";
import HomeTabContent from "./tabs/homeTab";
import MyProfileTabContent from "./tabs/myProfileTab";
import MyGroupsTabContent from "./tabs/myGroupsTab";
import GroupTasksTabContent from "./tabs/groupTasksTab";
import SignInTabContent from "./tabs/signInTab";
import RegisterTabContent from "./tabs/registerTab";
import {
  THEME,
  USER_INFO,
  USER_TASKS,
  USER_GROUPS,
  REFRESH_TOKEN,
  ACCESS_TOKEN,
} from "./constants";
import { clearAuthorizationInfo } from "./utils/auth";
import { jwtDecode } from "jwt-decode";
import createApi from "./api";

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
  const [storedAs, setStoredAs] = useState(null);
  // null - unknown yet
  // 1 - stored locally
  // 2 - stored in session storage
  // 3 - not stored at all
  const [currentUser, setCurrentUser] = useState(null);
  const [userTasks, setUserTasks] = useState([]);
  const [userGroups, setUserGroups] = useState([]);

  const authorizationSetters = {
    toNull: [setCurrentUser, setUserTasks, setUserGroups, setStoredAs],
    toFalse: [],
  };

  const clearUser = () => {
    clearAuthorizationInfo(authorizationSetters);
  };

  const [theme, setTheme] = useState(true);

  const tabList = useMemo(
    () => [
      {
        tabName: "Home",
        path: "/",
        tabContent: <HomeTabContent />,
        isDisplayed: true,
      },
      {
        tabName: "My tasks",
        path: "/mytasks",
        tabContent: <ProtectedRoute children={<MyTasksTabContent />} />,
        isDisplayed: currentUser,
      },
      {
        tabName: "My profile",
        path: "/myprofile",
        tabContent: <ProtectedRoute children={<MyProfileTabContent />} />,
        isDisplayed: currentUser,
      },
      {
        tabName: "My groups",
        path: "/mygroups",
        tabContent: <ProtectedRoute children={<MyGroupsTabContent />} />,
        isDisplayed: currentUser,
      },
      {
        tabName: "Group tasks",
        path: "/groups/:id",
        tabContent: <ProtectedRoute children={<GroupTasksTabContent />} />,
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
    ],
    [currentUser]
  );

  useEffect(() => {
    const authorize = async () => {
      const token = localStorage.getItem(ACCESS_TOKEN);
      const user = localStorage.getItem(USER_INFO);
      if (!token || !user) {
        console.log("didn`t find token or user in app.jsx");
        clearUser();
        setStoredAs(3);
        return;
      }

      let decoded;
      try {
        decoded = jwtDecode(token);
      } catch (err) {
        console.error("Invalid token in app.jsx: ", err);
        clearUser();
        setStoredAs(3);
        return;
      }

      const tokenExpirationTime = decoded.exp;
      const currentTime = Date.now() / 1000;

      if (tokenExpirationTime < currentTime) {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        if (!refreshToken) {
          console.log("didn`t find refresh token in app.jsx");
          clearUser();
          setStoredAs(3);
          return;
        }

        try {
          const api = createApi(storedAs);
          const response = await api.post("/api/token/refresh/", {
            refresh: refreshToken,
          });

          if (response.status === 200) {
            localStorage.setItem(ACCESS_TOKEN, response.data.access);
          } else {
            console.log("couldn`t refresh token in app.jsx");
            clearUser();
            setStoredAs(3);
            return;
          }
        } catch (error) {
          console.error("Error refreshing token in app.jsx: ", error);
          clearUser();
          setStoredAs(3);
          return;
        }
      }

      setStoredAs(1);
      setCurrentUser(JSON.parse(user));
      setUserTasks(JSON.parse(localStorage.getItem(USER_TASKS)));
      // console.log("user tasks set");
      setUserGroups(JSON.parse(localStorage.getItem(USER_GROUPS)));
    };

    authorize().catch(() => {
      console.error("Error during authorization in app.jsx");
      clearUser();
      setStoredAs(3);
    });
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME);
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
                storedAs,
                setStoredAs,
                currentUser,
                setCurrentUser,
                userTasks,
                setUserTasks,
                userGroups,
                setUserGroups,
                clearUser,
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
