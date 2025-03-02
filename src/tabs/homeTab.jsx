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
        <div className="text-lf text-[length:var(--bigger-font-size)] font-bold text-center select-none">
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
        <Description
          text={'Use "My tasks" tab to managing your individual tasks.'}
        />
        <Description
          text={
            "The black line indicates the due date of the task. The dark blue line indicates the end time. Deadline dates and times are listed from top to bottom in ascending order."
          }
        />
        <Description
          text={
            "Each task is presented as a card with its short name. When you press the button with a check mark, the corresponding task will be considered completed and will disappear from the list. When the deadline expires, the task will be considered overdue and will also disappear from the list."
          }
        />
      </div>
    </>
  );
}

export default HomeTabContent;
