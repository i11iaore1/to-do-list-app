import { useState } from "react";
import "./App.css";
import { Header, Wrapper, Footer } from "./blocks/base";
import MyTasksTabContent from "./tabs/myTasksTab";
import HomeTabContent from "./tabs/homeTab";
import MyProfileTabContent from "./tabs/myProfileTab";
import MyGroupsTabContent from "./tabs/myGroupsTab";

function App() {
  const [currentTab, setCurrentTab] = useState(0);

  const tabList = [
    { tabName: "Home", tabContent: <HomeTabContent />, logged: false },
    { tabName: "My Tasks", tabContent: <MyTasksTabContent />, logged: true },
    {
      tabName: "My profile",
      tabContent: <MyProfileTabContent />,
      logged: true,
    },
    { tabName: "My groups", tabContent: <MyGroupsTabContent />, logged: true },
    // { tabName: "Group tasks", tabContent: <GroupTasksTabContent />, logged: true, },
    // { tabName: "Sign in", tabContent: <SignInTabContent />, logged: false },
    // { tabName: "Register", tabContent: <RegisterTabContent />, logged: false },
  ];

  return (
    <>
      <Wrapper
        content={
          <>
            <Header tabList={tabList} setCurrentTab={setCurrentTab} />
            {tabList[currentTab].tabContent}
          </>
        }
      />
      <Footer />
    </>
  );
}

export default App;
