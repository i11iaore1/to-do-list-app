import { useState } from "react";
import { FullLogoSVG, BurgerSVG, GitHubSVG } from "./SVGs";

export function TabButton({ onClick, content, additionalStyles = "" }) {
  return (
    <div
      onClick={onClick}
      className={
        "flex justify-center items-center h-full text-lt hover:bg-lfb active:bg-lfb transition text-[length:var(--normal-font-size)] font-bold cursor-pointer select-none " +
        additionalStyles
      }
    >
      {content}
    </div>
  );
}

export function Header({ tabList, openTab }) {
  const [smallNavState, setSmallNavState] = useState(false);

  function toggleSmallNav() {
    setSmallNavState(!smallNavState);
  }

  function closeSmallNav() {
    setSmallNavState(false);
  }

  return (
    <div className="sticky z-50 top-0 inset-x-0 flex flex-row gap-x-[var(--gap)] items-center justify-between h-[var(--diameter)] bg-lf">
      <a
        href="index.html"
        className="h-full w-auto py-[var(--gap)] pl-[var(--gap)] cursor-pointer"
      >
        <FullLogoSVG additionalStyles={"h-full w-auto text-lt"} />
      </a>
      <div className="hidden tablet:flex flex-row h-full gap-x-0">
        {tabList.map((tabObject, index) => {
          return (
            <TabButton
              key={"f-" + index}
              onClick={() => openTab(index)}
              content={tabObject.tabName}
              additionalStyles={
                "p-[var(--gap)]" + (tabObject.isDisplayed ? "" : " hidden")
              }
            />
          );
        })}
      </div>
      <button
        onClick={toggleSmallNav}
        className="flex tablet:hidden justify-center items-center p-[var(--gap)] aspect-square h-full text-lt active:bg-lfb transition"
      >
        <BurgerSVG additionalStyles={"h-[50%] w-auto"} />
      </button>
      <div
        onClick={closeSmallNav}
        className={
          smallNavState
            ? "fixed flex tablet:hidden justify-end items-start bg-lo inset-0 top-[var(--diameter)] z-50"
            : "hidden"
        }
      >
        <div className="flex flex-col p-[var(--gap)] bg-lf rounded-bl-[var(--gap)]">
          {tabList.map((tabObject, index) => {
            return (
              <TabButton
                key={"s-" + index}
                onClick={() => openTab(index)}
                content={tabObject.tabName}
                additionalStyles={
                  "p-[var(--gap)] rounded-[var(--gap)] " +
                  (tabObject.isDisplayed ? "" : " hidden")
                }
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function Wrapper({ content }) {
  return <div className="flex flex-col min-h-full bg-lt">{content}</div>;
}

export function Footer() {
  return (
    <div className="flex flex-row gap-x-[var(--gap)] items-center justify-between p-[var(--gap)] pb-[var(--radius)] bg-ls border-t-[length:var(--border-width)] border-lf border-solid]">
      <p className="text-lf text-[length:var(--normal-font-size)] font-bold leading-[1.25] select-none">
        Created by
        <br />
        Orel Illia in 2025
      </p>
      <a
        href="https://github.com/i11iaore1"
        className="h-[var(--bigger-radius)] text-lf active:text-lfb text-[length:var(--normal-font-size)] leading-[1] underline"
      >
        <GitHubSVG />
      </a>
    </div>
  );
}

export function Overlay({ isShown, hideOverlay, content }) {
  return (
    <div
      onClick={hideOverlay}
      className={
        isShown
          ? "fixed flex justify-center bg-lo inset-0 z-50 py-[var(--gap)] px-[var(--gap)]"
          : "hidden"
      }
    >
      {content}
    </div>
  );
}
