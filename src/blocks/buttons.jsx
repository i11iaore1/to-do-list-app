import {
  SearchSVG,
  PlusSVG,
  CrossSVG,
  CheckSVG,
  OptionsSVG,
  DropDownSVG,
} from "./SVGs";

function Button({ onClick, additionalStyles, content }) {
  // console.log(additionalStyles, onClick);
  return (
    <button
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

export function ButtonSearch({ onClick }) {
  return (
    <Button
      onClick={onClick}
      additionalStyles={
        "aspect-square h-[var(--diameter)] rounded-r-[var(--gap)] hover:bg-lf active:bg-lfb active:border-lfb"
      }
      content={<SearchSVG />}
    />
  );
}

export function ButtonAdd({ onClick }) {
  return (
    <Button
      onClick={onClick}
      additionalStyles={
        "h-[var(--diameter)] rounded-[var(--gap)] hover:bg-lf active:bg-lfb active:border-lfb"
      }
      content={<PlusSVG additionalStyles={"h-full w-auto"} />}
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
    />
  );
}

export function ButtonComplete(onClick) {
  return (
    <Button
      onClick={onClick}
      additionalStyles={
        "aspect-square h-full rounded-[var(--gap)] hover:bg-lf active:bg-lfb active:border-lfb"
      }
      content={<CheckSVG />}
    />
  );
}

export function ButtonShowOptions(onClick) {
  return (
    <Button
      onClick={onClick}
      additionalStyles={
        "aspect-square h-full rounded-[var(--gap)] hover:bg-lf active:bg-lfb active:border-lfb"
      }
      content={<OptionsSVG />}
    />
  );
}

export function ButtonDropDown({ onClick }) {
  return (
    <div
      className="group absolute flex items-center justify-center top-full w-full z-30 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex p-[var(--gap)] items-center justify-center border-solid border-lf bg-ls text-lf group-hover:bg-lf group-hover:text-lt group-active:bg-lfb group-active:border-lfb group-active:text-lt text-[length:var(--normal-font-size)] aspect-[3/1] h-[var(--radius)] pt-[var(--half-gap)] rounded-br-[33%_100%] rounded-bl-[33%_100%] border-[length:var(--border-width)] border-t-0 transition">
        <DropDownSVG />
      </div>
    </div>
  );
}
