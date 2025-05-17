import {render, screen, fireEvent} from "@testing-library/react";
import MyTasksTabContent from "../myTasksTab.jsx";
import {UserContext} from "../../App.jsx";

const createTaskMock = vitest.fn();

describe("My tasks tab", () => {
	describe("Tasks manipulations", () => {
		test("Zero tasks", () => {
			const userTasks = [];

			render(
				<UserContext.Provider value={{userTasks}}>
					<MyTasksTabContent/>
				</UserContext.Provider>
			);

			const TaskCardList = screen.queryAllByTestId("card");
			expect(TaskCardList).toHaveLength(0);
		});

		test("Three tasks with different states", () => {
			const userTasks = [
				{
					id: 1,
					name: "Task 1",
					description: "Description 1",
					deadline: "2025-04-07T20:22:37+03:00",
					state: 0,
					user: 1,
				},
				{
					id: 2,
					name: "Task 2",
					description: "Description 2",
					deadline: "2027-04-07T20:22:37+03:00",
					state: 1,
					user: 1,
				},
				{
					id: 3,
					name: "Task 3",
					description: "Description 3",
					deadline: "2026-04-07T20:22:36+03:00",
					state: 2,
					user: 1,
				}
			];

			render(
				<UserContext.Provider value={{userTasks}}>
					<MyTasksTabContent/>
				</UserContext.Provider>
			);

			const TaskCardList = screen.getAllByTestId("card");
			expect(TaskCardList).toHaveLength(1);
			expect(TaskCardList[0]).toHaveTextContent("Task 1");
		});

		test("Three uncompleted tasks with different deadlines", () => {
			const userTasks = [
				{
					id: 1,
					name: "Task 1",
					description: "Description 1",
					deadline: "2025-04-07T20:22:37+03:00",
					state: 0,
					user: 1,
				},
				{
					id: 2,
					name: "Task 2",
					description: "Description 2",
					deadline: "2026-04-07T20:22:37+03:00",
					state: 0,
					user: 1,
				},
				{
					id: 3,
					name: "Task 3",
					description: "Description 3",
					deadline: "2023-04-07T20:22:36+03:00",
					state: 0,
					user: 1,
				}
			];

			render(
				<UserContext.Provider value={{userTasks}}>
					<MyTasksTabContent/>
				</UserContext.Provider>
			);

			const TaskCardList = screen.getAllByTestId("card");
			expect(TaskCardList).toHaveLength(3);
			expect(TaskCardList[0]).toHaveTextContent("Task 3");
			expect(TaskCardList[1]).toHaveTextContent("Task 1");
			expect(TaskCardList[2]).toHaveTextContent("Task 2");
		});
	});

	test("Creation window", () => {
		const userTasks = [
			{
				id: 1,
				name: "Task 1",
				description: "Description 1",
				deadline: "2025-04-07T20:22:37+03:00",
				state: 0,
				user: 1,
			}
		];

		render(
			<UserContext.Provider value={{userTasks}}>
				<MyTasksTabContent/>
			</UserContext.Provider>
		);

		const createButton = screen.getByTitle("Create task");
		const creationWindowTitle = screen.getByText("TASK CREATION");
		expect(creationWindowTitle.parentElement.parentElement.parentElement).toHaveClass("hidden");
		fireEvent.click(createButton);
		expect(creationWindowTitle.parentElement.parentElement.parentElement).not.toHaveClass("hidden");
	});

	test("Edition window", () => {
		const userTasks = [
			{
				id: 1,
				name: "Task 1",
				description: "Description 1",
				deadline: "2025-04-07T20:22:37+03:00",
				state: 0,
				user: 1,
			}
		];

		render(
			<UserContext.Provider value={{userTasks}}>
				<MyTasksTabContent/>
			</UserContext.Provider>
		);

		const optionsButton = screen.getByTitle("Show options");
		fireEvent.click(optionsButton);
		const editButton = screen.getByText("Edit");
		const editionWindowTitle = screen.getByText("TASK EDITION");
		expect(editionWindowTitle.parentElement.parentElement.parentElement).toHaveClass("hidden");
		fireEvent.click(editButton);
		expect(editionWindowTitle.parentElement.parentElement.parentElement).not.toHaveClass("hidden");
	});

	test("Task description expansion", () => {
		const userTasks = [
			{
				id: 1,
				name: "Task 1",
				description: "Description 1",
				deadline: "2025-04-07T20:22:37+03:00",
				state: 0,
				user: 1,
			}
		];

		render(
			<UserContext.Provider value={{userTasks}}>
				<MyTasksTabContent/>
			</UserContext.Provider>
		);

		const taskDescription = screen.getByText("Description 1");
		const expansionButton = screen.getByTitle("Show description");
		expect(taskDescription).toHaveClass("hidden");
		fireEvent.click(expansionButton);
		expect(taskDescription).not.toHaveClass("hidden");
		expect(expansionButton.title).toBe("Hide description");
		fireEvent.click(expansionButton);
		expect(taskDescription).toHaveClass("hidden");
	});
});
