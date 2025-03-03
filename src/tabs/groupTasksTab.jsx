import { useEffect, useRef, useState } from "react";
import { ButtonAdd, ButtonClose } from "../blocks/buttons";
import { Overlay } from "../blocks/base";
import { Panel, CardList } from "../blocks/secondary";
import { CopySVG, ProfileSVG, GroupSVG } from "../blocks/SVGs";

function UserPreviewCard({ userInfoObject }) {
  return (
    <div className="flex flex-col gap-y-[var(--half-gap)] w-[var(--diameter)]">
      <div className="flex justify-center items-center h-[var(--diameter)] aspect-square rounded-[50%] bg-lt border-[length:var(--border-width)] border-solid border-la text-la">
        {userInfoObject.picture || (
          <ProfileSVG additionalStyles={"h-[80%] w-auto"} />
        )}
      </div>
      <div className="whitespace-nowrap overflow-hidden text-ellipsis leading-none text-la text-[length:var(--smaller-font-size)]">
        {userInfoObject.name}
      </div>
    </div>
  );
}

function GroupDescription({ name, id, userObjectList, showAllMembersButton }) {
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
      <div className="flex flex-row items-center justify-between gap-x-[var(--gap)] p-[var(--gap)] bg-lf ">
        <div className="flex-1 text-lt text-[length:var(--bigger-font-size)] font-bold whitespace-nowrap overflow-hidden text-ellipsis">
          {name}
        </div>
        <div className="flex flex-row aspect-square mobile:aspect-auto items-center justify-center gap-x-[var(--gap)] p-[var(--gap)] text-la bg-lt rounded-[var(--gap)] leading-none cursor-pointer active:bg-ltd">
          <div className="flex-row flex-1 gap-x-[var(--gap)] hidden mobile:flex text-center text-[length:var(--normal-font-size)] select-none">
            ID:
            <span className="max-w-[100px] tablet:max-w-[200px] whitespace-nowrap overflow-hidden text-ellipsis">
              {id}
            </span>
          </div>
          <CopySVG additionalStyles={"h-[var(--normal-font-size)] w-auto"} />
        </div>
      </div>
      <div className="flex flex-row gap-x-[var(--gap)] p-[var(--gap)] border-b-[length:var(--border-width)] border-solid border-lf">
        <div
          ref={memberList}
          className={"flex flex-row gap-x-[var(--gap)] overflow-x-hidden"}
        >
          {userObjectList.map((userInfoObject, index) => (
            <UserPreviewCard key={index} userInfoObject={userInfoObject} />
          ))}
        </div>
        {allMembersButtonState && (
          <div className="relative pl-[var(--gap)] flex items-center justify-center">
            <div className="absolute right-[calc(100%+var(--gap))] inset-y-0 bg-[linear-gradient(90deg,#f0f0f000,#f0f0f0ff)] w-[var(--diameter)]"></div>
            <div
              onClick={showAllMembersButton}
              className="flex h-[var(--diameter)] aspect-square p-[var(--gap)] rounded-[var(--gap)] bg-lt border-[length:var(--border-width)] border-solid border-la text-la cursor-pointer hover:bg-lf hover:text-lt hover:border-lf active:bg-lfb active:text-lt active:border-lfb transition"
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
      <div className="flex justify-center items-center h-full aspect-square rounded-[50%] bg-lt border-[length:var(--border-width)] border-solid border-la text-la">
        {userInfoObject.picture || (
          <ProfileSVG additionalStyles={"h-[80%] w-auto"} />
        )}
      </div>
      <div className="whitespace-nowrap overflow-hidden text-ellipsis leading-none text-lf text-[length:var(--normal-font-size)] font-bold">
        {userInfoObject.name}
      </div>
    </div>
  );
}

function AllMembersDialogueWindow({ isShown, hideOverlay, userObjectList }) {
  return (
    <Overlay
      isShown={isShown == 1}
      hideOverlay={hideOverlay}
      content={
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex flex-col max-h-full w-full max-w-[40em] flex-shrink"
        >
          <div className="flex flex-row max-h-[var(--bigger-radius)] rounded-t-[50%] bg-ls">
            <p className="flex flex-1 min-w-0 w-0 justify-center items-center flex-grow p-[var(--gap)] rounded-tl-[var(--gap)] border-[length:var(--border-width)] border-b-0 border-r-0 border-solid border-lf bg-ls text-lf text-[length:var(--bigger-font-size)] font-bold">
              GROUP MEMBERS
            </p>
            <ButtonClose onClick={hideOverlay} />
          </div>
          <div className="flex flex-col overflow-y-auto gap-y-[var(--gap)] p-[var(--gap)] rounded-b-[var(--gap)] border-[length:var(--border-width)] border-t-0 border-solid border-lf bg-ls">
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

function TaskCreationDialogueWindow({ isShown, hideOverlay }) {
  return (
    <Overlay
      isShown={isShown}
      hideOverlay={hideOverlay}
      content={
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex flex-col max-h-full w-full max-w-[25em] flex-shrink"
        >
          <div className="flex flex-row max-h-[var(--bigger-radius)] rounded-t-[50%] bg-ls">
            <p className="flex flex-1 min-w-0 w-0 justify-center items-center flex-grow p-[var(--gap)] rounded-tl-[var(--gap)] border-[length:var(--border-width)] border-b-0 border-r-0 border-solid border-lf bg-ls text-lf text-[length:var(--bigger-font-size)] font-bold">
              TASK CREATION
            </p>
            <ButtonClose onClick={hideOverlay} />
          </div>
          <div className="flex flex-col overflow-y-auto gap-y-[var(--gap)] p-[var(--gap)] rounded-b-[var(--gap)] border-[length:var(--border-width)] border-t-0 border-solid border-lf bg-ls">
            <input type="text" placeholder="Name" className="input w-full" />
            <textarea
              rows="3"
              placeholder="Description"
              className="input w-full resize-none flex-shrink-0"
            />
            <div className="flex flex-row gap-x-[var(--gap)]">
              <input type="time" className="input flex-1" />
              <input type="date" className="input flex-1" />
            </div>
            <ButtonAdd onClick={() => console.log("Add pressed")} />
          </div>
        </div>
      }
    />
  );
}

function GroupTasksTabContent() {
  const userObjectList = [
    {
      name: "John Doe",
      picture: null,
    },
    {
      name: "John Williams",
      picture: null,
    },
    {
      name: "William Johnson",
      picture: null,
    },
    {
      name: "John Doe",
      picture: null,
    },
    {
      name: "John Doe",
      picture: null,
    },
    {
      name: "John Doe",
      picture: null,
    },
    {
      name: "John Williams",
      picture: null,
    },
    {
      name: "William Johnson William Johnson William Johnson William Johnson",
      picture: null,
    },
    {
      name: "John Doe",
      picture: null,
    },
    {
      name: "John Doe",
      picture: null,
    },
  ];

  const cardObjectList = [
    {
      id: "1",
      taskName: "TASK_NAME1",
      taskDescription: "TASK_DESCRIPTION1",
      date: "02.12.2024",
      time: "11:30",
    },
    {
      id: "2",
      taskName: "TASK_NAME2",
      taskDescription: "TASK_DESCRIPTION2",
      date: "02.12.2024",
      time: "11:31",
    },
    {
      id: "3",
      taskName: "TASK_NAME3",
      taskDescription: "TASK_DESCRIPTION3",
      date: "02.13.2024",
      time: "11:31",
    },
  ];

  const [currentOverlay, setcurrentOverlay] = useState(0);

  return (
    <>
      <AllMembersDialogueWindow
        isShown={currentOverlay == 1}
        hideOverlay={() => setcurrentOverlay(0)}
        userObjectList={userObjectList}
      />
      <TaskCreationDialogueWindow
        isShown={currentOverlay == 2}
        hideOverlay={() => setcurrentOverlay(0)}
      />
      <GroupDescription
        name="Group Name Group Name Group Name Group Name"
        id="12343424234654643"
        userObjectList={userObjectList}
        showAllMembersButton={() => setcurrentOverlay(1)}
      />
      <Panel
        ButtonSearchFunction={() => console.log("Search pressed")}
        buttonSearchToolTip={"Find task"}
        ButtonAddFunction={() => setcurrentOverlay(2)}
        buttonAddToolTip={"Create task"}
      />
      <CardList cardObjectList={cardObjectList} />
    </>
  );
}

export default GroupTasksTabContent;
