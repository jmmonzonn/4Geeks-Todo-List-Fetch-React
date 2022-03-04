import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import NewEntry from "./newEntry.jsx";
import "../../styles/index.css";

//create your first component
const Home = () => {
	const [user, setUser] = useState("");

	const pressEnter = (event) => {
		if (event.key === "Enter") {
			fetch(`https://assets.breatheco.de/apis/fake/todos/user/${user}`)
				.then((response) => response.json())
				.then((response) => {
					response.msg ? createUser(user) : createColorNote(response);
				})
				.catch((error) => {
					console.log(error);
				});

			const logUser = () => {
				console.log(user);
				event.target.value = "";
			};

			const createUser = (newUser) => {
				console.log("createUser funcionando");
				fetch(
					`https://assets.breatheco.de/apis/fake/todos/user/${user}`,
					{
						method: "POST",
						body: JSON.stringify([
							{ label: "introduce tarea", done: false },
						]),
						headers: {
							"Content-Type": "application/json",
						},
					}
				)
					.then((response) => response.json())
					.then((result) => {
						ReactDOM.render(
							<NewEntry user={user} />,
							document.querySelector("#app")
						);
					});
			};

			const createColorNote = (result) => {
				if (result[0].label) {
					console.log("createColorNote funcionando");
					ReactDOM.render(
						<NewEntry user={user} />,
						document.querySelector("#app")
					);
				}
				// else {

				// }
			};

			logUser();
		}
	};

	return (
		<div className="introUser">
			<h2>Introduce usuario</h2>
			<input
				onKeyDown={pressEnter}
				onChange={(e) => setUser(e.target.value)}
				placeholder="ejemplo1234"
				type="text"
			/>
		</div>
	);
};

export default Home;
