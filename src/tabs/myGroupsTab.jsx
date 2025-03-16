import { Link } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { CrossSVG, GroupSVG, SearchSVG } from "../blocks/SVGs";
import defaultGroupImage from "../images/default-group-image.png";
import { ButtonAdd, ButtonClose } from "../blocks/buttons";
import { Overlay } from "../blocks/base";
import { useFetch } from "../hooks";
import { UserContext } from "../App";

function GroupCard({ groupCardObject }) {
  return (
    <div className="grid grid-rows-[var(--bigger-radius)_1fr] aspect-square select-none">
      <div className="grid grid-cols-[1fr_var(--bigger-radius)] rounded-t-[50%] bg-second">
        <Link
          to={`/groups/${groupCardObject.id}`}
          className="rounded-tl-[var(--gap)] px-[var(--gap)] bg-second border-t-[length:var(--border-width)] border-l-[length:var(--border-width)] border-solid border-first text-fa cursor-pointer text-center text-[length:var(--normal-font-size)] font-bold whitespace-nowrap overflow-hidden text-ellipsis leading-[var(--bigger-radius)]"
        >
          {groupCardObject.name}
        </Link>

        <ButtonClose
          onClick={() => {
            console.log("close pressed");
          }}
        />
      </div>
      <Link
        to={`/groups/${groupCardObject.id}`}
        className="flex-1 flex w-full  flex-col p-[var(--gap)] bg-second border-solid rounded-b-[var(--gap)] border-[length:var(--border-width)] border-t-0 border-first"
      >
        <div className="flex flex-1 overflow-hidden justify-center items-center bg-third rounded-[var(--gap)] border-[length:var(--border-width)] border-first">
          <img src={defaultGroupImage} className="h-full object-cover " />
        </div>
      </Link>
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
          <div className="flex flex-row max-h-[var(--bigger-radius)] rounded-t-[50%] bg-second">
            <p className="flex flex-1 min-w-0 w-0 justify-center items-center flex-grow  p-[var(--gap)] rounded-tl-[var(--gap)] border-[length:var(--border-width)] border-b-0 border-r-0 border-solid border-first bg-second text-fa text-[length:var(--bigger-font-size)] font-bold select-none">
              GROUP CREATION
            </p>
            <ButtonClose onClick={hideOverlay} />
          </div>
          <div className="flex flex-col overflow-y-auto gap-y-[var(--gap)] p-[var(--gap)] rounded-b-[var(--gap)] border-[length:var(--border-width)] border-t-0 border-solid border-first bg-second">
            <input type="text" placeholder="Name" className="input w-full" />
            <ButtonAdd onClick={() => console.log("Add pressed")} />
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

function MyGroupsTabContent() {
  // const {
  //   data: groupList,
  //   isPending,
  //   error,
  // } = useFetch("http://localhost:8000/groups");

  const { userGroups } = useContext(UserContext);
  const [groupList, setGroupList] = useState([]);

  useEffect(() => {
    if (userGroups) {
      setGroupList(userGroups);
    }
  }, [userGroups]);

  const [overlayState, setOverlayState] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

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
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        buttonAddFunction={showOverlay}
        buttonAddToolTip={"Create group"}
      />
      {groupList.length > 0 ? (
        <div className="grid grid-cols-1 mobile:grid-cols-[repeat(auto-fill,minmax(150px,1fr))] tablet:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] laptop:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-x-[var(--gap)] gap-y-[var(--gap)] p-[var(--gap)] pt-0">
          {groupList.map((groupCardObject) => (
            <GroupCard
              key={groupCardObject.id}
              groupCardObject={groupCardObject}
            />
          ))}
        </div>
      ) : (
        <div className="p-[var(--gap)] text-accent text-[length:var(--bigger-font-size)] font-bold text-center">
          It seems you are not a member of any groups.
        </div>
      )}
    </>
  );
}

export default MyGroupsTabContent;
