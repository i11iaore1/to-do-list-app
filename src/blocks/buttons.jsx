import { CrossSVG } from "./SVGs";
import { useState, useEffect, useRef } from "react";

function Button({ onClick, additionalStyles = "", content, tooltip, ref }) {
  return (
    <button
      ref={ref}
      title={tooltip}
      onClick={onClick}
      className={
        "flex p-[var(--gap)] items-center justify-center border-solid border-first bg-st text-first text-[length:var(--normal-font-size)] border-[length:var(--border-width)] cursor:hover:text-ta active:text-ta  " +
        additionalStyles
      }
    >
      {content}
    </button>
  );
}

export function ButtonAdd({ additionalStyles = "", onClick, tooltip }) {
  return (
    <Button
      onClick={onClick}
      additionalStyles={
        "h-[var(--diameter)] rounded-[var(--gap)] cursor:hover:bg-first active:bg-fint active:border-fint " +
        additionalStyles
      }
      content={
        <svg
          className="h-full w-auto"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="100%"
          viewBox="0 0 320 320"
        >
          <path d="M149,1.000001 C156.687576,1 164.375168,1 172.198486,1.245032 C180.800903,6.976414 181.190521,15.263997 181.120331,24.306164 C180.832336,61.410351 181,98.518074 181,135.624496 C181,137.370270 181,139.116028 181,140.999161 C182.557892,140.999161 183.382477,140.999161 184.207062,140.999161 C224.641418,140.999451 265.075775,140.993393 305.510132,141.007675 C310.837402,141.009567 315.312744,142.659882 318.214386,147.548752 C318.668579,148.314026 320.048248,148.530029 321,149 C321,156.687576 321,164.375168 320.754974,172.198471 C315.023590,180.800919 306.736023,181.190506 297.693817,181.120331 C260.589661,180.832336 223.481918,181 186.375504,181 C184.629730,181 182.883972,181 181.000839,181 C181.000839,182.557892 181.000854,183.382477 181.000839,184.207062 C181.000549,224.641418 181.006622,265.075775 180.992325,305.510132 C180.990448,310.837402 179.340118,315.312744 174.451248,318.214386 C173.685959,318.668579 173.469986,320.048248 173,321 C165.312424,321 157.624832,321 149.801529,320.754974 C141.199097,315.023621 140.809494,306.736023 140.879669,297.693848 C141.167664,260.589691 141,223.481949 141,186.375519 C141,184.629745 141,182.883987 141,181.000839 C139.442398,181.000839 138.617676,181.000839 137.792953,181.000839 C97.358604,181.000549 56.924244,181.006592 16.489897,180.992325 C11.162657,180.990433 6.687282,179.340134 3.785632,174.451263 C3.331423,173.685989 1.951743,173.469986 1,173 C1,165.312424 1,157.624832 1.245032,149.801514 C6.976418,141.199081 15.264010,140.809494 24.306181,140.879669 C61.410362,141.167664 98.518082,141 135.624496,141 C137.370270,141 139.116028,141 140.999161,141 C140.999161,139.442108 140.999146,138.617523 140.999161,137.792938 C140.999451,97.358589 140.993393,56.924236 141.007675,16.489895 C141.009567,11.162661 142.659851,6.687279 147.548737,3.785635 C148.314011,3.331427 148.530014,1.951746 149,1.000001 z" />
        </svg>
      }
      tooltip={tooltip}
    />
  );
}

export function ButtonClose({ additionalStyles = "", onClick, tooltip }) {
  return (
    <Button
      onClick={onClick}
      additionalStyles={
        "flex-grow-0 aspect-square rounded-tr-[var(--gap)] rounded-bl-[var(--gap)] cursor:hover:bg-first active:border-fint active:bg-fint " +
        additionalStyles
      }
      content={<CrossSVG additionalStyles="h-full w-auto" />}
      tooltip={tooltip}
    />
  );
}

export function ButtonComplete({ additionalStyles = "", onClick, tooltip }) {
  return (
    <Button
      onClick={onClick}
      additionalStyles={
        "rounded-[var(--gap)] cursor:hover:bg-first active:bg-fint active:border-fint " +
        additionalStyles
      }
      content={
        <svg
          className="h-full w-auto"
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          width="231pt"
          height="240pt"
          viewBox="0 0 231 240"
        >
          <g transform="translate(0,240) scale(0.1,-0.1)">
            <path d="M1964 2369 c-94 -101 -307 -402 -416 -589 -226 -385 -396 -849 -470 -1279 l-13 -73 -67 98 c-186 275 -389 478 -663 667 -96 65 -309 187 -328 187 -4 0 -7 -82 -7 -182 l1 -183 72 -44 c329 -203 599 -497 792 -863 l57 -108 213 0 213 0 7 68 c30 327 79 578 161 833 147 457 381 874 714 1272 l83 98 -33 34 c-45 47 -136 85 -218 92 -66 5 -67 5 -98 -28z" />
          </g>
        </svg>
      }
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
    <div className="relative inline-block h-full aspect-square">
      <Button
        ref={buttonRef}
        onClick={() => setIsShown(!isShown)}
        additionalStyles={
          "aspect-square h-full rounded-[var(--gap)] cursor:hover:bg-first active:bg-fint active:border-fint"
        }
        content={
          <svg
            className="h-full w-auto"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            width="20px"
            height="80px"
            viewBox="0 0 20 80"
          >
            <ellipse cx="10" cy="10" rx="10" ry="10" />
            <ellipse cx="10" cy="40" rx="10" ry="10" />
            <ellipse cx="10" cy="70" rx="10" ry="10" />
          </svg>
        }
        tooltip={isShown ? "Hide options" : "Show options"}
      />
      {isShown && (
        <div
          ref={dropDownRef}
          className="absolute right-full top-0 bg-[rgba(var(--overlay),0.8)] rounded-[var(--gap)] overflow-hidden"
        >
          {options.map((option, id) => (
            <button
              key={id}
              className="block w-full px-[var(--gap)] py-[var(--half-gap)] text-center text-nowrap text-[length:var(--normal-font-size)] text-ta cursor:hover:bg-overlayfcs active:bg-overlayfcs"
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
      <div className="flex p-[var(--gap)] items-center justify-center border-solid border-first bg-st text-first cursor:group-hover:bg-first cursor:group-hover:text-ta group-active:bg-fint group-active:border-fint group-active:text-ta text-[length:var(--normal-font-size)] aspect-[3/1] h-[var(--radius)] pt-[var(--half-gap)] rounded-br-[33%_100%] rounded-bl-[33%_100%] border-[length:var(--border-width)] border-t-0 ">
        <svg
          className={isDropped ? "h-full w-auto" : "h-full w-auto rotate-180"}
          version="1.1"
          viewBox="0 0 2048 986"
          width="220"
          height="106"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            transform="translate(1017)"
            d="m0 0h13l11 12 153 153 2 1v2l4 2 9 9 28 20 8 8 8 7 158 158 13 10 12 8 14 12 159 159 8 7 10 8 12 8 11 9 9 9 8 7 154 154 13 10 12 8 14 12 168 168 15 11 5 3v11h-492l-4-6-9-10-81-81-10-7-14-9-15-14-158-158-8-7-6-5-15-9-12-11-15-15-7-6-4-5-8-7-140-140-12-8-9-4-8-1-16 8-9 7-14 14h-2l-2 4-144 144-8 7-7 7-8 6-11 7-6 4-7 7h-2l-2 4-9 8-6 7h-2l-2 4-8 7-4 5-6 5-5 5-7 8-7 6-5 5-8 9-5 4-4 5-5 4-5 6-5 5-9 8-5 6-5 5-7 6-6 7-5 4-4 5-8 7-23 23-11 9-11 7-6 4-16 15-80 80-4 5h-490v-12l16-10 14-13 4-5 6-5 107-107 5-6 8-7 33-33 11-9 17-11 13-12 154-154h2l2-4 11-10 13-9 11-7 14-14h2v-2l3-3h2l2-4 10-9 13-13 5-6 8-7 5-5 6-7 8-7 5-5 5-6 8-7 5-5 6-7 8-7 5-5 8-9 5-5 8-7 5-6 6-5 24-24 11-9 17-11 13-12 161-161 8-7 13-9 11-7 26-26h2l2-4 8-7 6-7 5-5 8-7 6-7h2v-2h2l2-4 6-5 6-7 5-5 9-8 5-5 7-8 8-7 1-2h2v-2l6-5 18-18 2-3h2v-2l17-17 6-5 5-5 5-6z"
          />
        </svg>
      </div>
    </div>
  );
}
