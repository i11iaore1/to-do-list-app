import {
  SearchSVG,
  PlusSVG,
  CrossSVG,
  CheckSVG,
  OptionsSVG,
  DropDownSVG,
} from "./SVGs";

function Button({ onClick, additionalStyles, content, tooltip }) {
  return (
    <button
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

export function ButtonComplete(onClick) {
  return (
    <Button
      onClick={onClick}
      additionalStyles={
        "aspect-square h-full rounded-[var(--gap)] hover:bg-lf active:bg-lfb active:border-lfb"
      }
      content={<CheckSVG />}
      tooltip="Complete task"
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
      tooltip="Show options"
    />
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
