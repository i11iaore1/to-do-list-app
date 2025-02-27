import { ButtonSearch, ButtonAdd } from "./buttons";

export function Panel({ ButtonSearchFunction, ButtonAddFunction }) {
  return (
    <div className="sticky top-[var(--diameter)] inset-x-0 z-40 flex flex-row gap-x-[var(--gap)] p-[var(--gap)] mb-[var(--gap)] border-b-[length:var(--border-width)] border-solid border-lf bg-ls">
      <div className="flex flex-row flex-1">
        <input
          type="text"
          placeholder="Search"
          className="input border-r-0 rounded-r-[0] flex-1"
        />
        <ButtonSearch onClick={ButtonSearchFunction} />
      </div>
      <ButtonAdd onClick={ButtonAddFunction} />
    </div>
  );
}
