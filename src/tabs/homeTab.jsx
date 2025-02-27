import { FullLogoSVG } from "../blocks/SVGs";

function Title({ text }) {
  return (
    <div className="mt-[var(--gap)] text-la text-[length:var(--bigger-font-size)] font-bold leading-[1.8] text-justify indent-[var(--radius)]">
      {text}
    </div>
  );
}

function Description({ text }) {
  return (
    <div className="text-la text-[length:var(--normal-font-size)] leading-[1.25] text-justify indent-[var(--radius)]">
      {text}
    </div>
  );
}

function HomeTabContent() {
  return (
    <>
      <div className="flex flex-col gap-y-[var(--gap)] justify-center items-center w-full max-h-[calc(100vh-var(--diameter))] tablet:h-[calc(100vh-var(--diameter))] p-[var(--radius)] bg-ls">
        <FullLogoSVG additionalStyles={"max-w-full h-auto text-lf"} />
        <div className="text-lf text-[length:var(--bigger-font-size)] font-bold text-center ">
          Everything you need to remember!
        </div>
      </div>
      <div className="flex flex-col px-[var(--gap)] pb-[var(--gap)]">
        <Title text={"What is this app's purpose?"} />
        <Description
          text={
            "This app is created to help you noting and tracking your tasks. Manage them as you want. And also try solving shared issues by joining a group."
          }
        />
        <Title text={"Quick guide for managing your ToDoList"} />
        <Description text={"This app is created to store your tasks"} />
        <Description text={"This app is created to store your tasks"} />
        <Description text={"This app is created to store your tasks"} />
      </div>
    </>
  );
}

export default HomeTabContent;
