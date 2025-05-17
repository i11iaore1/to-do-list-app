import {ACCESS_TOKEN, API_URL} from "../../src/constants.js";

it("should switch themes correctly", () => {
	cy.visit("/");
	cy.get('body').should('have.class', 'dark');
	cy.get('div[title="Switch theme"]').as("themeSwitch");
	cy.get("@themeSwitch").click();
	cy.get('body').should('have.class', 'light');
	cy.get("@themeSwitch").click();
	cy.get('body').should('have.class', 'dark');
});

describe("authorized", () => {
	const userInfo = {
		id: 0,
		username: "username 1",
		email: "email@gmail.com",
		password: "password",
		sex: true,
		birth_date: "2000-08-24"
	}

	beforeEach(() => {
		cy.intercept('POST', API_URL + "/api/register/").as('registerRequest');

		cy.visit("/");

		// cy.visit("/", {
		// 	onBeforeLoad(win) {
		// 		cy.stub(win.navigator.clipboard, "writeText").as("clipboardWrite");
		// 	}
		// });

		cy.getByTestId('register-full').click();
		cy.get('input[placeholder="User name"]').type(userInfo.username);
		cy.get('input[placeholder="Email"]').type(userInfo.email);
		cy.get('label[for="sexRadio1"]').click();
		cy.get('input[type="date"]').type(userInfo.birth_date);
		cy.get('input[placeholder="Password"]').type(userInfo.password);
		cy.get('input[placeholder="Repeat password"]').type(userInfo.password);
		cy.getByTestId("register-button").click();

		cy.wait('@registerRequest');
	});

	afterEach(() => {
		cy.window().then((win) => {
			const accessToken = win.sessionStorage.getItem(ACCESS_TOKEN);

			cy.request({
				method: 'DELETE',
				url: API_URL + '/api/my-profile/',
				headers: {
					Authorization: "Bearer " + accessToken,
				},
			});
		});
	})

	it("should log out and sign in correctly", () => {
		cy.intercept('POST', API_URL + "/api/login/").as('signInRequest');

		cy.getByTestId('home-full').click();
		cy.getByTestId('agitation-text').should('not.exist');

		cy.getByTestId('my-profile-full').click();
		cy.get('button[title="Show options"]').click();
		cy.contains('Log out').click();

		cy.getByTestId('home-full').click();
		cy.getByTestId('agitation-text').should('exist');

		cy.contains("a", 'Sign in').click();
		cy.get('input[placeholder="Email"]').type(userInfo.email);
		cy.get('input[placeholder="Password"]').type(userInfo.password);
		cy.getByTestId("sign-in-button").click();
		cy.wait('@signInRequest').then(() => {
			cy.getByTestId('home-full').click();
			cy.getByTestId('agitation-text').should('not.exist');
		});
	});

	describe("My tasks tab", () => {
		function getFutureDateTime(timeAhead) {
			const futureDate = new Date(Date.now() + timeAhead);

			const year = futureDate.getFullYear();
			const month = String(futureDate.getMonth() + 1).padStart(2, '0');
			const day = String(futureDate.getDate()).padStart(2, '0');
			const hours = String(futureDate.getHours()).padStart(2, '0');
			const minutes = String(futureDate.getMinutes()).padStart(2, '0');

			const date = `${year}-${month}-${day}`;
			const time = `${hours}:${minutes}`;

			return { date, time };
		}

		async function createTask(name, description, date, time) {
			cy.get('button[title="Create task"]').click();
			cy.getByTestId('creation-window').should('exist');
			cy.getByTestId('creation-window').within(() => {
				cy.get('input[placeholder="Name"]').type(name);
				cy.get('textarea[placeholder="Description"]').type(description);
				cy.get('input[type="time"]').type(time);
				cy.get('input[type="date"]').type(date);
				cy.get('button[title="Confirm creation"]').click();
			});
		}

		beforeEach(() => {
			cy.getByTestId('my-tasks-full').click();
		});

		it("should display created tasks in the correct order and only show tasks which satisfy the search query", () => {
			let expectedOrder = [];

			cy.intercept('POST', API_URL + "/api/tasks/").as('task1CreationRequest');
			const {date: date1, time: time1} = getFutureDateTime(48 * 3600000);
			createTask("Task 1", "Description 1", date1, time1);

			cy.wait('@task1CreationRequest').then((interception) => {
				const taskObject = interception.response.body;
				cy.getByTestId(`card-${taskObject.id}`).as('task-block');
				expectedOrder.unshift(`card-${taskObject.id}`);
				cy.get('@task-block').should('exist');
				cy.get('@task-block').within(() => {
					cy.contains('div', date1.split("-").reverse().join(".")).should('exist');
					cy.contains('div', time1).should('exist');
					cy.contains('div', taskObject.name).should('exist');
					cy.contains('div', taskObject.description).should('exist');
				});
			});

			cy.intercept('POST', API_URL + "/api/tasks/").as('task2CreationRequest');
			const {date: date2, time: time2} = getFutureDateTime(24 * 3600000);
			createTask("Task 2", "Description 2", date2, time2);

			cy.wait('@task2CreationRequest').then((interception) => {
				const taskObject = interception.response.body;
				expectedOrder.unshift(`card-${taskObject.id}`);
				cy.getByTestId(`card-${taskObject.id}`).within(() => {
					cy.contains('div', time2).should('exist');
					cy.contains('div', "Tomorrow").should('exist');
				});
			});

			cy.intercept('POST', API_URL + "/api/tasks/").as('task3CreationRequest');
			const {date: date3, time: time3} = getFutureDateTime(120000);
			createTask("Task 3", "Description 3", date3, time3);

			cy.wait('@task3CreationRequest').then((interception) => {
				const taskObject = interception.response.body;
				expectedOrder.unshift(`card-${taskObject.id}`);
				cy.getByTestId(`card-${taskObject.id}`).within(() => {
					cy.contains('div', time3).should('exist');
					cy.contains('div', "Today").should('exist');
				});
			});

			cy.get('[data-testid^="card-"]').then($cards => {
				const actualOrder = [...$cards].map(card => card.getAttribute('data-testid'));
				expect(actualOrder).to.deep.equal(expectedOrder);

				const expectedThird = expectedOrder[2];

				cy.get('input[placeholder="Search"]').as("searchbar");
				cy.get("@searchbar").type('1');

				cy.get('[data-testid^="card-"]')
					.should('have.length', 1)
					.first()
					.invoke('attr', 'data-testid')
					.should('equal', expectedThird);
			});

			cy.get('div[title="Clear"]').click();
			cy.get("@searchbar").should('have.value', '');
			cy.get('[data-testid^="card-"]').should('have.length', 3);
		});

		it("should edit and delete tasks correctly", () => {
			cy.intercept('POST', API_URL + "/api/tasks/").as('taskCreationRequest');
			cy.intercept('PATCH', API_URL + "/api/tasks/*").as('taskEditionRequest');
			cy.intercept('DELETE', `${API_URL}/api/tasks/*`).as('taskDeletionRequest');

			const {date, time} = getFutureDateTime(72 * 3600000);
			createTask("Task 1", "Description 1", date, time);

			cy.wait('@taskCreationRequest').then((interception) => {
				const taskObject = interception.response.body;

				const {date: newDate, time: newTime} = getFutureDateTime((48 + 2) * 3600000);
				cy.getByTestId(`card-${taskObject.id}`).within(() => {
					cy.contains('div', date.split("-").reverse().join(".")).should('exist');
					cy.contains('div', time).should('exist');
					cy.contains('div', taskObject.name).should('exist');
					cy.contains('div', taskObject.description).should('exist');
				});

				cy.get('button[title="Show options"]').click();
				cy.contains('button', 'Edit').click();

				cy.getByTestId('edition-window').should('exist');
				cy.getByTestId('edition-window').within(() => {
					cy.get('input[placeholder="Name"]').type(" edited");
					cy.get('textarea[placeholder="Description"]').type(" edited");
					cy.get('input[type="time"]').type(newTime);
					cy.get('input[type="date"]').type(newDate);
					cy.get('button[title="Confirm edition"]').click();
				});

				cy.getByTestId(`card-${taskObject.id}`).within(() => {
					cy.contains('div', newDate.split("-").reverse().join(".")).should('exist');
					cy.contains('div', newTime).should('exist');
					cy.contains('div', taskObject.name + " edited").should('exist');
					cy.contains('div', taskObject.description + " edited").should('exist');
				});

				cy.get('button[title="Show options"]').click();
				cy.contains('button', 'Delete').click();
				cy.wait('@taskDeletionRequest').then((interception) => {
					cy.get('[data-testid^="card-"]').should('have.length', 0);
				})
			});
		});

		it("should complete tasks correctly and display completed tasks in the task history", () => {
			cy.intercept('POST', API_URL + "/api/tasks/").as('taskCreationRequest');
			cy.intercept('PATCH', API_URL + "/api/tasks/*").as('taskEditionRequest');

			const {date, time} = getFutureDateTime(72 * 3600000);
			createTask("Task 1", "Description 1", date, time);

			cy.wait('@taskCreationRequest').then((interception) => {
				cy.get('button[title="Complete task"]').click();
				cy.wait('@taskEditionRequest').then((interception) => {
					cy.get('[data-testid^="card-"]').should('have.length', 0);

					cy.getByTestId('my-profile-full').click();
					cy.getByTestId('done-text').should('have.text', '1');
					cy.getByTestId('expired-text').should('have.text', '0');
					cy.getByTestId('completion-rate-text').should('have.text', '100%');
					cy.getByTestId('history-table').within(() => {
						cy.contains('td', "Task 1").should('exist');
						cy.contains('td', "done").should('exist');
						cy.contains('td', date.split("-").reverse().join(".")).should('exist');
					});
				});
			});
		});

		it("should expire tasks correctly and display expired tasks in the task history", () => {
			cy.intercept('POST', API_URL + "/api/tasks/").as('taskCreationRequest');
			cy.intercept('PATCH', API_URL + "/api/tasks/*").as('taskEditionRequest');

			const {date, time} = getFutureDateTime(60000);
			createTask("Task 1", "Description 1", date, time);

			cy.wait('@taskCreationRequest').then((interception) => {
				cy.wait('@taskEditionRequest', { timeout: 60000 }).then(() => {
					cy.get('[data-testid^="card-"]').should('have.length', 0);

					cy.getByTestId('my-profile-full').click();
					cy.getByTestId('done-text').should('have.text', '0');
					cy.getByTestId('expired-text').should('have.text', '1');
					cy.getByTestId('completion-rate-text').should('have.text', '0%');
					cy.getByTestId('history-table').within(() => {
						cy.contains('td', "Task 1").should('exist');
						cy.contains('td', "expired").should('exist');
						cy.contains('td', date.split("-").reverse().join(".")).should('exist');
					});
				})
			});
		});
	});

	it("should create, leave and enter groups correctly", () => {
		cy.window().then((win) => {
			cy.stub(win.navigator.clipboard, "writeText").as("clipboardWrite");
		});

		cy.intercept('POST', API_URL + "/api/groups/").as('groupCreationRequest');
		cy.intercept('GET', API_URL + "/api/groups/*").as('groupInfoRequest');
		cy.intercept('DELETE', API_URL + "/api/groups/*/member/*/").as('groupLeaveRequest');
		cy.intercept('POST', API_URL + "/api/groups/*/member/*/").as('groupJoinRequest');

		cy.getByTestId('my-groups-full').click();
		cy.getByTestId('group-card').should('not.exist');

		cy.get('button[title="Create group"]').click();
		cy.get('input[placeholder="Name"]').type("Group name 1");
		cy.get('button[title="Confirm creation"]').click();
		cy.wait('@groupCreationRequest').then((interception) => {
			const groupId = String(interception.response.body.id);
			cy.window().then((win) => {
				cy.stub(win.navigator.clipboard, 'readText').resolves(groupId).as('readClipboard');
			});

			cy.getByTestId('group-card').should('exist');
			cy.contains('a', 'Group name 1').click();
			cy.wait('@groupInfoRequest').then((interception) => {
				cy.getByTestId('group-id-copy').click();
				cy.get('@clipboardWrite').should('have.been.calledWith', groupId);
				cy.getByTestId('my-groups-full').click();
				cy.get('button[title="Leave"]').click();
				cy.wait('@groupLeaveRequest').then((interception) => {
					cy.getByTestId('group-card').should('not.exist');
					cy.get('button[title="Join group by id"]').click();
					cy.wait('@groupJoinRequest').then((interception) => {
						cy.getByTestId('group-card').should('exist');
						cy.contains('Group name 1').should('exist');
					})
				})
			})
		})
	});
});

