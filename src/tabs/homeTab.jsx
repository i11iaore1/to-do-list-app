import { useContext } from "react";
import { ThemeContext, UserContext } from "../App";
import { FullLogoSVG } from "../blocks/SVGs";
import { Link } from "react-router-dom";

function Title({ content }) {
  return (
    <div className="my-[var(--gap)] text-accent text-[length:var(--bigger-font-size)] font-bold leading-[1.8] text-justify indent-[var(--radius)]">
      {content}
    </div>
  );
}

function Description({ content }) {
  return (
    <div className="mb-[var(--gap)] text-accent text-[length:var(--normal-font-size)] leading-[1.25] text-justify indent-[var(--radius)]">
      {content}
    </div>
  );
}

function HomeTabContent() {
  const { currentUser } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <div className="flex flex-col gap-y-[var(--gap)] justify-center items-center w-full max-h-[calc(100vh-var(--diameter))] tablet:h-[calc(100vh-var(--diameter))] p-[var(--radius)] bg-[linear-gradient(0deg,rgba(var(--second)),rgba(var(--first)))] text-ta">
        <FullLogoSVG additionalStyles={"max-w-full h-auto "} />
        <div className="text-[length:var(--bigger-font-size)] font-bold text-center select-none">
          Everything you need to remember!
        </div>
      </div>
      <div className="flex flex-col px-[var(--gap)] pb-[var(--gap)]">
        <Title content={"What is this app's purpose?"} />
        <Description
          content={
            "This app is created to help you noting and tracking your tasks. Manage them as you want. And also try solving shared issues by joining a group."
          }
        />
        <Title
          content={
            <p>
              Guide for{" "}
              {currentUser ? (
                <Link
                  className="inline-flex text-nowrap px-[var(--gap)] rounded-[var(--gap)] text-ta bg-first cursor:hover:bg-fint active:bg-fint select-none indent-0"
                  to={"/mytasks"}
                >
                  My tasks
                </Link>
              ) : (
                '"My tasks"'
              )}{" "}
              tab
            </p>
          }
        />
        <Description
          content={
            <p>
              The{" "}
              <span className="text-accent font-bold">
                {theme ? "white" : "black"}
              </span>{" "}
              line indicates the due date of the tasks below it. The{" "}
              <span className="text-fd font-bold">
                {theme ? "light blue" : " dark blue"}
              </span>{" "}
              line indicates the end time. Deadline dates and times are listed
              from top to bottom in ascending order.
            </p>
          }
        />
        <Description
          content={
            "Each task is presented as a card with its short name. When you press the button with a check mark, the corresponding task will be considered completed and will disappear from the list. When the deadline expires, the task will be considered overdue and will also disappear from the list."
          }
        />
        <Description
          content={
            "The button with three dots allows you to change or delete tasks if you made a typo when creating it or didn't even want to create it"
          }
        />
        <Description
          content={
            "The down arrow on each task card allows you to expand its extended description. Not all tasks have the extended description - you decide to provide it or not when creating a task."
          }
        />
        <Description
          content={
            'To create a task you need to press the plus button in the top panel, fill in the required fields and click "Confirm". As mentioned above the only optional field is the extended description of the task.'
          }
        />
        <Description
          content={
            "You can use the search bar in the top panel to quickly find a task in the list by its name."
          }
        />
      </div>
    </>
  );
}

export default HomeTabContent;
