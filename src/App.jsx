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

function App() {
  const [currentUser, setCurrentUser] = useState("");

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
      // isDisplayed: currentUser,
      isDisplayed: true,
    },
    {
      tabName: "My profile",
      path: "/myprofile",
      tabContent: <MyProfileTabContent />,
      // isDisplayed: currentUser,
      isDisplayed: true,
    },
    {
      tabName: "My groups",
      path: "/mygroups",
      tabContent: <MyGroupsTabContent />,
      // isDisplayed: currentUser,
      isDisplayed: true,
    },
    {
      tabName: "Group tasks",
      path: "/group/:id",
      tabContent: <GroupTasksTabContent />,
      // isDisplayed: false,
      isDisplayed: true,
    },
    {
      tabName: "Sign in",
      path: "/signin",
      tabContent: <SignInTabContent />,
      // isDisplayed: !currentUser,
      isDisplayed: true,
    },
    {
      tabName: "Register",
      path: "/register",
      tabContent: <RegisterTabContent />,
      // isDisplayed: !currentUser,
      isDisplayed: true,
    },
  ];

  return (
    <Router>
      <ScrollToTop />
      <Wrapper
        content={
          <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            <Header tabList={tabList} />
            <Routes>
              <Route exact path="/" element={<HomeTabContent />} />
              <Route exact path="/mytasks" element={<MyTasksTabContent />} />
              <Route
                exact
                path="/myprofile"
                element={<MyProfileTabContent />}
              />
              <Route exact path="/mygroups" element={<MyGroupsTabContent />} />
              <Route
                exact
                path="/groups/:id"
                element={<GroupTasksTabContent />}
              />
              <Route exact path="/signin" element={<SignInTabContent />} />
              <Route exact path="/register" element={<RegisterTabContent />} />
            </Routes>
          </UserContext.Provider>
        }
      />
      <Footer />
    </Router>
  );
}

export default App;
