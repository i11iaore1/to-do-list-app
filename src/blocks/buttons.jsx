import {
  SearchSVG,
  PlusSVG,
  CrossSVG,
  CheckSVG,
  OptionsSVG,
  DropDownSVG,
} from "./SVGs";

import { useState, useEffect, useRef } from "react";

function Button({ onClick, additionalStyles, content, tooltip, ref }) {
  return (
    <button
      ref={ref}
      title={tooltip}
      onClick={onClick}
      className={
        "flex p-[var(--gap)] items-center justify-center border-solid border-lf bg-ls text-lf text-[length:var(--normal-font-size)] border-[length:var(--border-width)] hover:text-lt active:text-lt transition" +
        " " +
        additionalStyles
      }
    >
      {content}
    </button>
  );
}

export function ButtonSearch({ onClick, tooltip }) {
  return (
    <Button
      onClick={onClick}
      additionalStyles={
        "aspect-square h-[var(--diameter)] rounded-r-[var(--gap)] hover:bg-lf active:bg-lfb active:border-lfb"
      }
      content={<SearchSVG />}
      tooltip={tooltip}
    />
  );
}

export function ButtonAdd({ onClick, tooltip }) {
  return (
    <Button
      onClick={onClick}
      additionalStyles={
        "h-[var(--diameter)] rounded-[var(--gap)] hover:bg-lf active:bg-lfb active:border-lfb"
      }
      content={<PlusSVG additionalStyles={"h-full w-auto"} />}
      tooltip={tooltip}
    />
  );
}

export function ButtonClose({ onClick }) {
  return (
    <Button
      onClick={onClick}
      additionalStyles={
        "flex-grow-0 aspect-square rounded-tr-[var(--gap)] rounded-bl-[var(--gap)] hover:bg-lr hover:border-dr active:border-dr active:bg-dr"
      }
      content={<CrossSVG />}
      tooltip="Close"
    />
  );
}

export function ButtonComplete({ additionalStyles, onClick, tooltip }) {
  return (
    <Button
      onClick={onClick}
      additionalStyles={
        "rounded-[var(--gap)] hover:bg-lf active:bg-lfb active:border-lfb " +
        additionalStyles
      }
      content={<CheckSVG />}
      tooltip={tooltip}
    />
  );
}

export function ButtonShowOptions({ options }) {
  const [isShown, setIsShown] = useState(false);
  const dropDownRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    function handleClick(event) {
      if (dropDownRef.current && !buttonRef.current.contains(event.target)) {
        setIsShown(false);
      }
    }

    if (isShown) {
      document.addEventListener("click", handleClick);
    }

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [isShown]);

  return (
    <div className="relative inline-block">
      <Button
        ref={buttonRef}
        onClick={() => setIsShown(!isShown)}
        additionalStyles={
          "aspect-square h-full rounded-[var(--gap)] hover:bg-lf active:bg-lfb active:border-lfb"
        }
        content={<OptionsSVG />}
        tooltip={isShown ? "Hide options" : "Show options"}
      />
      {isShown && (
        <div
          ref={dropDownRef}
          className="absolute right-full top-0 bg-lt rounded-[var(--gap)] overflow-hidden"
        >
          {options.map((option, id) => (
            <button
              key={id}
              className="block w-full px-[var(--gap)] py-[var(--half-gap)] text-center text-[length:var(--normal-font-size)] text-la hover:bg-lf hover:text-lt active:bg-lfb active:text-lt transition"
              onClick={option.optionFunction}
            >
              {option.optionName}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function ButtonDropDown({ onClick, isDropped }) {
  return (
    <div
      title={isDropped ? "Hide description" : "Show description"}
      className="group flex items-center justify-center cursor-pointer"
      onClick={onClick}
    >
      <div className="flex p-[var(--gap)] items-center justify-center border-solid border-lf bg-ls text-lf group-hover:bg-lf group-hover:text-lt group-active:bg-lfb group-active:border-lfb group-active:text-lt text-[length:var(--normal-font-size)] aspect-[3/1] h-[var(--radius)] pt-[var(--half-gap)] rounded-br-[33%_100%] rounded-bl-[33%_100%] border-[length:var(--border-width)] border-t-0 transition">
        <DropDownSVG
          styles={isDropped ? "h-full w-auto" : "h-full w-auto rotate-180"}
        />
      </div>
    </div>
  );
}
