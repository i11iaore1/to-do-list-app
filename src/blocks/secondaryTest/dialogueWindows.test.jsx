import {render, screen, fireEvent} from "@testing-library/react";
import {TaskCreationDialogueWindow} from "../secondary";
import {} from "@testing-library/react";

const hideMock = vitest.fn();
const createTaskMock = vitest.fn();

describe("TaskCreationDialogueWindow", () => {

  test("Validate", () => {
    render(
      <TaskCreationDialogueWindow
        isShown={true}
        hide={hideMock}
        createTask={createTaskMock}
      />
    );

    // screen.debug();

    const nameInput = screen.getByPlaceholderText("Name");
    const descriptionInput = screen.getByPlaceholderText("Description");
    const timeInput = screen.getByTestId("time-input");
    const dateInput = screen.getByTestId("date-input");
    const createButton = screen.getByTitle("Create task");

    fireEvent.change(nameInput, { target: { value: "some name" } });
    fireEvent.change(descriptionInput, { target: { value: "some description" } });
    fireEvent.change(timeInput, { target: { value: "14:00" } });
    fireEvent.change(dateInput, { target: { value: "2030-08-24" } });
    fireEvent.click(createButton);
    expect(createTaskMock).toHaveBeenCalledWith({
      name: "some name",
      description: "some description",
      deadline: "2030-08-24T14:00:00",
    });
  });
});