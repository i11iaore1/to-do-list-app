import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { FullLogoSVG } from "./SVGs";
import { ThemeContext } from "../App";

export function TabButton({ onClick, content, additionalStyles }) {
  return (
    <div
      onClick={onClick}
      className={
        "flex justify-center items-center h-full text-ta  cursor:hover:bg-fint active:bg-fint  text-[length:var(--normal-font-size)] font-bold cursor-pointer select-none " +
        additionalStyles
      }
    >
      {content}
    </div>
  );
}

export function Header({ tabList }) {
  const [smallNavState, setSmallNavState] = useState(false);

  const { theme, setTheme } = useContext(ThemeContext);

  function toggleSmallNav() {
    setSmallNavState(!smallNavState);
  }

  function closeSmallNav() {
    setSmallNavState(false);
  }

  function switchTheme() {
    setTheme((prevTheme) => {
      const newTheme = !prevTheme;
      document.body.className = newTheme ? "dark" : "light";
      localStorage.setItem("theme", JSON.stringify(newTheme));
      return newTheme;
    });
  }

  return (
    <div className="sticky z-50 top-0 inset-x-0 flex flex-row gap-x-[var(--gap)] items-center justify-between h-[var(--diameter)] bg-first">
      <Link
        to={"/"}
        className="h-full w-auto py-[var(--gap)] pl-[var(--gap)] cursor-pointer"
      >
        <FullLogoSVG additionalStyles={"h-full w-auto text-ta"} />
      </Link>
      <div className="h-full flex flex-row">
        <div
          title="Switch theme"
          onClick={switchTheme}
          className="h-full aspect-square cursor:hover:bg-fint active:bg-fint text-ta p-[var(--gap)] cursor-pointer "
        >
          <svg
            className="h-full w-auto"
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            width="880pt"
            height="880pt"
            viewBox="0 0 880 880"
          >
            <g transform="translate(0,880) scale(0.1,-0.1)">
              <path d="M4283 8779 c-49 -24 -109 -87 -129 -135 -11 -27 -14 -143 -14 -644 0 -674 -3 -644 65 -718 51 -57 107 -82 185 -82 78 0 134 25 185 82 68 74 65 44 65 720 0 597 0 613 -21 654 -23 49 -86 110 -135 130 -51 21 -151 18 -201 -7z" />
              <path d="M1305 7581 c-50 -23 -109 -84 -130 -133 -22 -53 -19 -153 6 -208 29 -65 823 -860 893 -895 63 -32 161 -34 221 -6 50 23 109 84 130 133 22 53 19 153 -6 208 -29 65 -823 860 -893 895 -63 32 -161 34 -221 6z" />
              <path d="M7234 7575 c-70 -35 -864 -830 -893 -895 -25 -55 -28 -155 -6 -208 21 -49 80 -110 130 -133 60 -28 158 -26 221 6 70 35 864 830 893 895 27 59 28 160 2 215 -23 50 -84 109 -133 130 -59 24 -155 20 -214 -10z" />
              <path d="M4077 6985 c-1190 -144 -2133 -1091 -2272 -2283 -31 -259 -15 -594 39 -844 219 -1010 994 -1785 2004 -2004 250 -54 585 -70 844 -39 1197 140 2143 1086 2283 2283 19 162 19 442 0 604 -140 1197 -1086 2143 -2283 2283 -154 18 -464 18 -615 0z m458 -482 c13 -4 -9 -11 -59 -20 -306 -52 -657 -256 -883 -513 -385 -436 -510 -1024 -337 -1580 250 -804 1095 -1290 1921 -1104 157 35 249 66 379 129 264 128 498 331 650 565 71 109 137 244 200 410 53 141 55 143 49 85 -3 -33 -10 -114 -15 -180 -46 -561 -256 -1017 -641 -1390 -285 -276 -637 -463 -1039 -551 -121 -27 -134 -28 -430 -28 -279 -1 -315 1 -418 22 -201 41 -391 106 -564 193 -84 42 -272 166 -361 236 -510 407 -807 1050 -784 1697 28 798 482 1492 1201 1837 257 123 489 183 766 199 135 8 327 4 365 -7z" />
              <path d="M143 4629 c-49 -24 -109 -87 -129 -135 -21 -51 -18 -150 7 -200 23 -49 86 -110 135 -130 27 -11 143 -14 644 -14 674 0 644 -3 718 65 57 51 82 107 82 185 0 78 -25 134 -82 185 -74 68 -44 65 -720 65 -601 0 -614 0 -655 -21z" />
              <path d="M7343 4629 c-49 -24 -109 -87 -129 -135 -21 -51 -18 -150 7 -200 23 -49 86 -110 135 -130 27 -11 143 -14 644 -14 674 0 644 -3 718 65 57 51 82 107 82 185 0 78 -25 134 -82 185 -74 68 -44 65 -720 65 -601 0 -614 0 -655 -21z" />
              <path d="M2114 2455 c-70 -35 -864 -830 -893 -895 -25 -55 -28 -155 -6 -208 21 -49 80 -110 130 -133 60 -28 158 -26 221 6 70 35 864 830 893 895 27 59 28 160 2 215 -23 50 -84 109 -133 130 -59 24 -155 20 -214 -10z" />
              <path d="M6465 2461 c-50 -23 -109 -84 -130 -133 -22 -53 -19 -153 6 -208 29 -65 823 -860 893 -895 63 -32 161 -34 221 -6 50 23 109 84 130 133 22 53 19 153 -6 208 -29 65 -823 860 -893 895 -63 32 -161 34 -221 6z" />
              <path d="M4283 1579 c-49 -24 -109 -87 -129 -135 -11 -27 -14 -143 -14 -644 0 -674 -3 -644 65 -718 51 -57 107 -82 185 -82 78 0 134 25 185 82 68 74 65 44 65 720 0 597 0 613 -21 654 -23 49 -86 110 -135 130 -51 21 -151 18 -201 -7z" />
            </g>
          </svg>
        </div>
        <div className="hidden tablet:flex flex-row h-full gap-x-0">
          {tabList.map((tabObject, index) => {
            return (
              tabObject.isDisplayed && (
                <Link key={"f-" + index} to={tabObject.path}>
                  <TabButton
                    content={tabObject.tabName}
                    additionalStyles={"p-[var(--gap)]"}
                  />
                </Link>
              )
            );
          })}
        </div>
        <button
          onClick={toggleSmallNav}
          className="flex tablet:hidden justify-center items-center p-[var(--gap)] aspect-square h-full text-ta cursor:hover:bg-fint active:bg-fint "
        >
          <svg
            className="h-[50%] w-auto"
            version="1.1"
            viewBox="0 0 1280 1280"
            width="1280"
            height="1280"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path transform="translate(0,480)" d="m0 0h1280v320h-1280z" />
            <path
              transform="translate(0,960)"
              d="m0 0h1280v177l-4 22-5 16-7 17-8 14-10 14-11 12-11 11-15 11-17 10-19 8-23 6-13 2h-994l-22-4-16-5-17-7-14-8-14-10-12-11-11-11-11-15-10-17-8-19-6-23-2-13z"
            />
            <path
              transform="translate(143)"
              d="m0 0h994l22 4 16 5 17 7 14 8 14 10 12 11 11 11 11 15 10 17 8 19 6 23 2 13v177h-1280v-177l4-22 5-16 7-17 8-14 10-14 11-12 11-11 15-11 17-10 19-8 23-6z"
            />
          </svg>
        </button>
        <div
          onClick={closeSmallNav}
          className={
            smallNavState
              ? "fixed flex tablet:hidden justify-end items-start bg-overlay inset-0 top-[var(--diameter)] z-50"
              : "hidden"
          }
        >
          <div className="flex flex-col p-[var(--gap)] bg-first rounded-bl-[var(--gap)]">
            {tabList.map((tabObject, index) => {
              return (
                tabObject.isDisplayed && (
                  <Link key={"s-" + index} to={tabObject.path}>
                    <TabButton
                      content={tabObject.tabName}
                      additionalStyles={"p-[var(--gap)] rounded-[var(--gap)]"}
                    />
                  </Link>
                )
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Wrapper({ content }) {
  return <div className="flex flex-col min-h-full bg-ts">{content}</div>;
}

export function Footer() {
  return (
    <div className="flex flex-row gap-x-[var(--gap)] items-center justify-between p-[var(--gap)] bg-first text-ta">
      <p className="text-[length:var(--normal-font-size)] font-bold leading-[1.25] select-none">
        Created by
        <br />
        Orel Illia in 2025
      </p>
      <a
        href="https://github.com/i11iaore1"
        className="h-[var(--bigger-radius)] leading-[1] underline"
      >
        <svg
          className="h-full w-auto"
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          width="2135pt"
          height="2083pt"
          viewBox="0 0 2135 2083"
        >
          <g transform="translate(0,2083) scale(0.10,-0.1)">
            <path d="M10185 20824 c-27 -2 -129 -8 -225 -14 -1921 -115 -3744 -748 -5360 -1862 -542 -374 -1002 -759 -1480 -1237 -401 -402 -658 -697 -984 -1131 -1169 -1558 -1870 -3321 -2076 -5215 -41 -382 -51 -576 -57 -1062 -9 -788 29 -1309 147 -2016 148 -880 441 -1823 807 -2597 108 -228 130 -271 221 -445 421 -801 950 -1559 1588 -2275 124 -140 535 -557 679 -691 1048 -971 2252 -1694 3657 -2195 206 -73 256 -84 392 -84 179 0 280 38 384 141 64 63 110 141 139 234 17 57 18 104 14 820 -3 418 -5 807 -7 865 -1 58 -2 186 -3 286 l-1 181 -219 -38 c-121 -20 -277 -43 -348 -50 -165 -17 -683 -17 -873 0 -284 24 -612 74 -778 117 -367 95 -764 331 -1003 594 -147 162 -272 366 -352 575 -57 147 -174 412 -240 540 -79 152 -265 432 -400 600 -171 213 -319 345 -514 457 -124 71 -209 136 -295 226 -91 95 -158 204 -166 267 -4 42 -2 48 35 84 86 86 320 114 604 71 171 -26 298 -66 452 -144 263 -133 483 -290 668 -475 143 -144 240 -269 353 -456 43 -71 106 -170 139 -220 320 -479 764 -804 1252 -916 117 -26 409 -36 630 -20 306 22 545 67 785 149 86 29 278 104 296 116 1 1 14 69 29 151 94 514 283 909 582 1214 40 41 72 75 71 76 -2 1 -104 14 -228 29 -571 69 -1139 190 -1535 327 -444 153 -1011 437 -1336 669 -359 256 -660 557 -881 880 -370 539 -655 1296 -783 2081 -68 416 -90 719 -90 1229 0 444 7 538 60 848 125 725 439 1384 925 1946 l103 118 -56 167 c-83 245 -126 432 -159 696 -19 154 -16 589 6 765 44 363 133 733 263 1086 l45 123 51 11 c29 7 106 14 172 17 259 11 572 -63 1025 -242 661 -262 1025 -448 1549 -792 l144 -94 241 60 c650 163 1296 257 1996 291 245 12 874 3 1130 -15 597 -43 1178 -135 1713 -271 122 -31 231 -58 243 -61 14 -3 107 50 307 176 435 275 629 382 992 546 468 212 868 347 1150 390 171 26 461 13 495 -21 30 -30 164 -441 225 -687 82 -335 118 -615 118 -937 0 -389 -47 -673 -170 -1042 l-56 -167 98 -113 c534 -619 844 -1307 954 -2113 31 -225 41 -393 41 -664 0 -1089 -191 -2015 -579 -2816 -255 -526 -572 -918 -1031 -1276 -361 -281 -913 -576 -1435 -766 -412 -150 -1006 -279 -1635 -354 -102 -12 -187 -24 -189 -26 -3 -2 31 -38 74 -81 354 -349 544 -796 622 -1462 15 -129 17 -323 20 -1800 4 -1819 0 -1708 66 -1840 38 -76 132 -175 198 -207 89 -44 163 -56 304 -50 123 5 138 8 275 55 1273 436 2440 1099 3430 1951 235 202 341 301 600 561 734 735 1370 1580 1875 2495 123 221 357 702 453 930 451 1063 701 2113 799 3345 26 326 26 1297 0 1620 -63 788 -184 1477 -378 2155 -438 1526 -1239 2968 -2328 4190 -150 169 -630 649 -796 796 -1183 1053 -2576 1841 -4030 2280 -750 226 -1466 358 -2315 425 -189 15 -1143 28 -1295 18z" />
          </g>
        </svg>
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
          ? "fixed flex justify-center bg-overlay inset-0 z-50 py-[var(--gap)] px-[var(--gap)]"
          : "hidden"
      }
    >
      {content}
    </div>
  );
}
