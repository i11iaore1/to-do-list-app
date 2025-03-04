import { GroupSVG } from "../blocks/SVGs";
import { ButtonAdd, ButtonClose } from "../blocks/buttons";
import { Overlay } from "../blocks/base";
import { Panel } from "../blocks/secondary";
import { useState } from "react";

function GroupCard({ groupCardObject }) {
  return (
    <div className="flex flex-col aspect-square">
      <div className="flex flex-row max-h-[var(--bigger-radius)] rounded-t-[50%] bg-ls">
        <div className="flex-1 rounded-tl-[var(--gap)] px-[var(--gap)] bg-ls border-t-[length:var(--border-width)] border-l-[length:var(--border-width)] border-solid border-lf text-lf text-[length:var(--normal-font-size)] font-bold whitespace-nowrap overflow-hidden text-ellipsis">
          {groupCardObject.name}
        </div>
        <ButtonClose
          onClick={() => {
            console.log("close pressed");
          }}
        />
      </div>
      <div className="flex-1 flex w-full  flex-col p-[var(--gap)] bg-ls border-solid rounded-b-[var(--gap)] border-[length:var(--border-width)] border-t-0 border-lf">
        <div className="flex flex-1 flex-col items-center justify-center gap-y-[var(--gap)] bg-lt text-la p-[var(--gap)] rounded-[var(--gap)] border-[length:var(--border-width)] border-lf">
          <GroupSVG additionalStyles={"w-full h-auto"} />
        </div>
      </div>
    </div>
  );
}

function DialogueWindow({ isShown, hideOverlay }) {
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
            <p className="flex flex-1 min-w-0 w-0 justify-center items-center flex-grow  p-[var(--gap)] rounded-tl-[var(--gap)] border-[length:var(--border-width)] border-b-0 border-r-0 border-solid border-lf bg-ls text-lf text-[length:var(--bigger-font-size)] font-bold">
              GROUP CREATION
            </p>
            <ButtonClose onClick={hideOverlay} />
          </div>
          <div className="flex flex-col overflow-y-auto gap-y-[var(--gap)] p-[var(--gap)] rounded-b-[var(--gap)] border-[length:var(--border-width)] border-t-0 border-solid border-lf bg-ls">
            <input type="text" placeholder="Name" className="input w-full" />
            <ButtonAdd onClick={() => console.log("Add pressed")} />
          </div>
        </div>
      }
    />
  );
}

function MyGroupsTabContent() {
  const groupCardObjectList = [
    {
      id: 1,
      name: "Group Name Group Name Group Name",
    },
    {
      id: 2,
      name: "Group Name",
    },
    {
      id: 3,
      name: "Group Name",
    },
    {
      id: 4,
      name: "Group Name",
    },
    {
      id: 5,
      name: "Group Name",
    },
  ];

  const [overlayState, setOverlayState] = useState(false);

  function showOverlay() {
    setOverlayState(true);
  }

  function hideOverlay() {
    setOverlayState(false);
  }

  return (
    <>
      <DialogueWindow isShown={overlayState} hideOverlay={hideOverlay} />
      <Panel
        buttonSearchFunction={() => console.log("Search pressed")}
        buttonSearchToolTip={"Find group by id"}
        buttonAddFunction={showOverlay}
        buttonAddToolTip={"Create group"}
      />
      <div className="grid grid-cols-1 mobile:grid-cols-[repeat(auto-fill,minmax(150px,1fr))] tablet:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] laptop:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-x-[var(--gap)] gap-y-[var(--gap)] p-[var(--gap)] pt-0">
        {groupCardObjectList.map((groupCardObject) => (
          <GroupCard
            key={groupCardObject.id}
            groupCardObject={groupCardObject}
          />
        ))}
      </div>
    </>
  );
}

export default MyGroupsTabContent;
