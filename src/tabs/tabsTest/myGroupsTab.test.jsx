import {render, screen} from "@testing-library/react";
import MyGroupsTabContent from "../myGroupsTab.jsx";
import {BrowserRouter} from "react-router-dom";
import {UserContext} from "../../App.jsx";

describe("My groups tab", () => {
	test("Three groups", () => {
		const userGroups = [
			{
				id: 1,
				name: "Group 1",
			},
			{
				id: 2,
				name: "Group 2",
			},
			{
				id: 3,
				name: "Group 3",
			}
		];

		render(
			<BrowserRouter>
				<UserContext.Provider value={{userGroups}}>
					<MyGroupsTabContent/>
				</UserContext.Provider>
			</BrowserRouter>
		);

		// screen.debug();
		const groupCardList = screen.getAllByTestId("group-card");
		expect(groupCardList).toHaveLength(3);
		expect(groupCardList[0]).toHaveTextContent("Group 1");
		expect(groupCardList[1]).toHaveTextContent("Group 2");
		expect(groupCardList[2]).toHaveTextContent("Group 3");
	});
})