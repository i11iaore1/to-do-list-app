import { useState } from "react";
import "./App.css";
import { Header, Wrapper, Footer } from "./blocks/base";
import MyTasksTabContent from "./tabs/myTasksTab";
import HomeTabContent from "./tabs/homeTab";
import MyProfileTabContent from "./tabs/myProfileTab";
import MyGroupsTabContent from "./tabs/myGroupsTab";
import GroupTasksTabContent from "./tabs/groupTasksTab";
import SignInTabContent from "./tabs/signInTab";
import RegisterTabContent from "./tabs/registerTab";

function App() {
  const [currentTab, setCurrentTab] = useState(0);
  const [isLogged, setIsLogged] = useState(false);

  function openTab(tabIndex) {
    setCurrentTab(tabIndex);
    window.scrollTo(0, 0);
  }

  const tabList = [
    { tabName: "Home", tabContent: <HomeTabContent />, isDisplayed: true },
    {
      tabName: "My tasks",
      tabContent: <MyTasksTabContent />,
      isDisplayed: isLogged,
    },
    {
      tabName: "My profile",
      tabContent: <MyProfileTabContent />,
      isDisplayed: isLogged,
    },
    {
      tabName: "My groups",
      tabContent: <MyGroupsTabContent />,
      isDisplayed: isLogged,
    },
    {
      tabName: "Group tasks",
      tabContent: <GroupTasksTabContent />,
      isDisplayed: isLogged,
    },
    {
      tabName: "Sign in",
      tabContent: (
        <SignInTabContent
          logIn={() => {
            setIsLogged(true);
            openTab(1);
          }}
          registerRedirect={() => openTab(6)}
        />
      ),
      isDisplayed: !isLogged,
    },
    {
      tabName: "Register",
      tabContent: (
        <RegisterTabContent
          logIn={() => {
            setIsLogged(true);
            openTab(1);
          }}
          signInRedirect={() => openTab(5)}
        />
      ),
      isDisplayed: !isLogged,
    },
  ];

  return (
    <>
      <Wrapper
        content={
          <>
            <Header tabList={tabList} openTab={openTab} />
            {tabList[currentTab].tabContent}
          </>
        }
      />
      <Footer />
    </>
  );
}

export default App;
