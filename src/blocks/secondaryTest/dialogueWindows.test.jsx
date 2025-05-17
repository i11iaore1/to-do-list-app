import {render, screen, fireEvent} from "@testing-library/react";
import {TaskCreationDialogueWindow, TaskEditionDialogueWindow} from "../secondary";

const hideMock = vitest.fn();
const createTaskMock = vitest.fn();
const applyChangesMock = vitest.fn();

describe("TaskCreationDialogueWindow", () => {
  afterEach(() => {
    vitest.clearAllMocks();
  });

  test("All fields filled", () => {
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
    const createButton = screen.getByTitle("Confirm creation");

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

  test("Empty description field", () => {
    render(
      <TaskCreationDialogueWindow
        isShown={true}
        hide={hideMock}
        createTask={createTaskMock}
      />
    );

    // screen.debug();

    const nameInput = screen.getByPlaceholderText("Name");
    const timeInput = screen.getByTestId("time-input");
    const dateInput = screen.getByTestId("date-input");
    const createButton = screen.getByTitle("Confirm creation");

    fireEvent.change(nameInput, { target: { value: "some name" } });
    fireEvent.change(timeInput, { target: { value: "14:00" } });
    fireEvent.change(dateInput, { target: { value: "2030-08-24" } });
    fireEvent.click(createButton);
    expect(createTaskMock).toHaveBeenCalledWith({
      name: "some name",
      description: "",
      deadline: "2030-08-24T14:00:00",
    });
  });

  test("Empty name field", () => {
    render(
      <TaskCreationDialogueWindow
        isShown={true}
        hide={hideMock}
        createTask={createTaskMock}
      />
    );

    // screen.debug();

    const descriptionInput = screen.getByPlaceholderText("Description");
    const timeInput = screen.getByTestId("time-input");
    const dateInput = screen.getByTestId("date-input");
    const createButton = screen.getByTitle("Confirm creation");

    fireEvent.change(descriptionInput, { target: { value: "some description" } });
    fireEvent.change(timeInput, { target: { value: "14:00" } });
    fireEvent.change(dateInput, { target: { value: "2030-08-24" } });
    fireEvent.click(createButton);
    expect(createTaskMock).not.toHaveBeenCalled();
  });

  test("Empty time field", () => {
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
    const dateInput = screen.getByTestId("date-input");
    const createButton = screen.getByTitle("Confirm creation");

    fireEvent.change(nameInput, { target: { value: "some name" } });
    fireEvent.change(descriptionInput, { target: { value: "some description" } });
    fireEvent.change(dateInput, { target: { value: "2030-08-24" } });
    fireEvent.click(createButton);
    expect(createTaskMock).not.toHaveBeenCalled();
  });

  test("Empty date field", () => {
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
    const createButton = screen.getByTitle("Confirm creation");

    fireEvent.change(nameInput, { target: { value: "some name" } });
    fireEvent.change(descriptionInput, { target: { value: "some description" } });
    fireEvent.change(timeInput, { target: { value: "14:00" } });
    fireEvent.click(createButton);
    expect(createTaskMock).not.toHaveBeenCalled();
  });
});

describe("TaskEditionDialogueWindow", () => {
  afterEach(() => {
    vitest.clearAllMocks();
  });

  test("All fields filled", () => {
    render(
      <TaskEditionDialogueWindow
        isShown={true}
        hide={hideMock}
        cardObject={{
          id: 1,
          name: "some name",
          description: "some description",
          deadline: "2030-08-24T14:00:00",
          state: 0,
        }}
        applyChanges={applyChangesMock}
      />
    );

    // screen.debug();

    const nameInput = screen.getByPlaceholderText("Name");
    const descriptionInput = screen.getByPlaceholderText("Description");
    const timeInput = screen.getByTestId("time-input");
    const dateInput = screen.getByTestId("date-input");
    const applyButton = screen.getByTitle("Confirm edition");

    fireEvent.change(nameInput, { target: { value: "some other name" } });
    fireEvent.change(descriptionInput, { target: { value: "some other description" } });
    fireEvent.change(timeInput, { target: { value: "22:00" } });
    fireEvent.change(dateInput, { target: { value: "2050-08-24" } });
    fireEvent.click(applyButton);
    expect(applyChangesMock).toHaveBeenCalledWith({
      id: 1,
      name: "some other name",
      description: "some other description",
      deadline: "2050-08-24T22:00:00",
      state: 0,
    });
  });

  test("Empty description field", () => {
    render(
      <TaskEditionDialogueWindow
        isShown={true}
        hide={hideMock}
        cardObject={{
          id: 1,
          name: "some name",
          description: "some description",
          deadline: "2030-08-24T14:00:00",
          state: 0,
        }}
        applyChanges={applyChangesMock}
      />
    );

    // screen.debug();

    const nameInput = screen.getByPlaceholderText("Name");
    const descriptionInput = screen.getByPlaceholderText("Description");
    const timeInput = screen.getByTestId("time-input");
    const dateInput = screen.getByTestId("date-input");
    const applyButton = screen.getByTitle("Confirm edition");

    fireEvent.change(nameInput, { target: { value: "some other name" } });
    fireEvent.change(descriptionInput, { target: { value: "" } });
    fireEvent.change(timeInput, { target: { value: "22:00" } });
    fireEvent.change(dateInput, { target: { value: "2050-08-24" } });
    fireEvent.click(applyButton);
    expect(applyChangesMock).toHaveBeenCalledWith({
      id: 1,
      name: "some other name",
      description: "",
      deadline: "2050-08-24T22:00:00",
      state: 0,
    });
  });

  test("Empty name field", () => {
    render(
      <TaskEditionDialogueWindow
        isShown={true}
        hide={hideMock}
        cardObject={{
          id: 1,
          name: "some name",
          description: "some description",
          deadline: "2030-08-24T14:00:00",
          state: 0,
        }}
        applyChanges={applyChangesMock}
      />
    );

    // screen.debug();

    const nameInput = screen.getByPlaceholderText("Name");
    const descriptionInput = screen.getByPlaceholderText("Description");
    const timeInput = screen.getByTestId("time-input");
    const dateInput = screen.getByTestId("date-input");
    const applyButton = screen.getByTitle("Confirm edition");

    fireEvent.change(nameInput, { target: { value: "" } });
    fireEvent.change(descriptionInput, { target: { value: "some other description" } });
    fireEvent.change(timeInput, { target: { value: "22:00" } });
    fireEvent.change(dateInput, { target: { value: "2050-08-24" } });
    fireEvent.click(applyButton);
    expect(createTaskMock).not.toHaveBeenCalled();
  });

  test("Empty time field", () => {
    render(
      <TaskEditionDialogueWindow
        isShown={true}
        hide={hideMock}
        cardObject={{
          id: 1,
          name: "some name",
          description: "some description",
          deadline: "2030-08-24T14:00:00",
          state: 0,
        }}
        applyChanges={applyChangesMock}
      />
    );

    // screen.debug();

    const nameInput = screen.getByPlaceholderText("Name");
    const descriptionInput = screen.getByPlaceholderText("Description");
    const timeInput = screen.getByTestId("time-input");
    const dateInput = screen.getByTestId("date-input");
    const applyButton = screen.getByTitle("Confirm edition");

    fireEvent.change(nameInput, { target: { value: "some other name" } });
    fireEvent.change(descriptionInput, { target: { value: "some other description" } });
    fireEvent.change(timeInput, { target: { value: "" } });
    fireEvent.change(dateInput, { target: { value: "2050-08-24" } });
    fireEvent.click(applyButton);
    expect(createTaskMock).not.toHaveBeenCalled();
  });

  test("Empty date field", () => {
    render(
      <TaskEditionDialogueWindow
        isShown={true}
        hide={hideMock}
        cardObject={{
          id: 1,
          name: "some name",
          description: "some description",
          deadline: "2030-08-24T14:00:00",
          state: 0,
        }}
        applyChanges={applyChangesMock}
      />
    );

    // screen.debug();

    const nameInput = screen.getByPlaceholderText("Name");
    const descriptionInput = screen.getByPlaceholderText("Description");
    const timeInput = screen.getByTestId("time-input");
    const dateInput = screen.getByTestId("date-input");
    const applyButton = screen.getByTitle("Confirm edition");

    fireEvent.change(nameInput, { target: { value: "some other name" } });
    fireEvent.change(descriptionInput, { target: { value: "some other description" } });
    fireEvent.change(timeInput, { target: { value: "22:00" } });
    fireEvent.change(dateInput, { target: { value: "" } });
    fireEvent.click(applyButton);
    expect(createTaskMock).not.toHaveBeenCalled();
  });
});
