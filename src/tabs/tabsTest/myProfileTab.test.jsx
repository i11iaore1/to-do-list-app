import {render, screen} from "@testing-library/react";
import MyProfileTabContent from "../myProfileTab.jsx";
import {BrowserRouter} from "react-router-dom";
import {UserContext} from "../../App.jsx";

describe("My profile tab", () => {
	test("Profile info", () => {
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
		const currentUser = {
			id: 1,
			username: "partrick",
			email: "p8rtrick@gmail.com",
			sex: true,
			birth_date: "2003-08-11",
		};

		render(
			<BrowserRouter>
				<UserContext.Provider value={{currentUser, userTasks}}>
					<MyProfileTabContent/>
				</UserContext.Provider>
			</BrowserRouter>
		);

		// screen.debug();

		const nameText = screen.getByTestId("username-text");
		const emailText = screen.getByTestId("email-text");
		const sexText = screen.getByTestId("sex-text");
		const birthDateText = screen.getByTestId("birth-date-text");
		const doneText = screen.getByTestId("done-text");
		const expiredText = screen.getByTestId("expired-text");
		const completionRateText = screen.getByTestId("completion-rate-text");

		expect(nameText.textContent).toEqual("partrick");
		expect(emailText.textContent).toEqual("p8rtrick@gmail.com");
		expect(sexText.textContent).toEqual("male");
		expect(birthDateText.textContent).toEqual("11.08.2003");
		expect(doneText.textContent).toEqual("1");
		expect(expiredText.textContent).toEqual("1");
		expect(completionRateText.textContent).toEqual("50%");
	});

	test("Zero tasks", () => {
		const userTasks = [];
		const currentUser = {
			id: 1,
			username: "partrick",
			email: "p8rtrick@gmail.com",
			sex: true,
			birth_date: "2003-08-11",
		};

		render(
			<BrowserRouter>
				<UserContext.Provider value={{currentUser, userTasks}}>
					<MyProfileTabContent/>
				</UserContext.Provider>
			</BrowserRouter>
		);

		const doneText = screen.queryByTestId("done-text");
		const expiredText = screen.queryByTestId("expired-text");
		const completionRateText = screen.queryByTestId("completion-rate-text");
		const taskHistoryRows = screen.queryAllByRole("row");

		expect(doneText).not.toBeInTheDocument();
		expect(expiredText).not.toBeInTheDocument();
		expect(completionRateText).not.toBeInTheDocument();

		expect(taskHistoryRows).toHaveLength(0);
	});

	test("Three tasks with different states and deadline dates", () => {
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
		const currentUser = {
			id: 1,
			username: "partrick",
			email: "p8rtrick@gmail.com",
			sex: true,
			birth_date: "2003-08-11",
		};

		render(
			<BrowserRouter>
				<UserContext.Provider value={{currentUser, userTasks}}>
					<MyProfileTabContent/>
				</UserContext.Provider>
			</BrowserRouter>
		);

		// screen.debug();
		const taskHistoryRows = screen.getAllByRole("row");
		expect(taskHistoryRows[1]).toHaveTextContent("07.04.2027");
		expect(taskHistoryRows[2]).toHaveTextContent("07.04.2026");
	});
})