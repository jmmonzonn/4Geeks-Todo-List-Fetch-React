import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import NewEntry from "./newEntry.jsx";

const TodoList = (props) => {
	const [todoList, setTodoList] = useState(props.arrayUser);
	const [count, setCount] = useState(props.arrayUser.length - 1);

	const deleteTask = (index) => {
		//setTodoList(todoList.filter((e, i) => index != i));
		fetch(
			`https://assets.breatheco.de/apis/fake/todos/user/${props.user}`,
			{
				method: "PUT",
				body: JSON.stringify(todoList.filter((e, i) => index != i)),
				headers: {
					"Content-Type": "application/json",
				},
			}
		)
			.then((response) => response.json())
			.then((res) =>
				fetch(
					`https://assets.breatheco.de/apis/fake/todos/user/${props.user}`
				)
					.then((response) => response.json())
					.then((result) => {
						setTodoList(result);
					})
			);
		setCount(count - 1);
	};

	const addNewEntry = (event) => {
		if (event.key === "Enter") {
			fetch(
				`https://assets.breatheco.de/apis/fake/todos/user/${props.user}`,
				{
					method: "PUT",
					body: JSON.stringify([
						...todoList,
						{ label: event.target.value, done: false },
					]),
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
				.then((response) => response.json())
				.then((res) =>
					fetch(
						`https://assets.breatheco.de/apis/fake/todos/user/${props.user}`
					)
						.then((response) => response.json())
						.then((result) => {
							setTodoList(result);
						})
				);

			event.target.value = "";
			setCount(count + 1);
		}
	};

	console.log(todoList);
	return (
		<div className="container">
			<div className="colorNote">
				<h3>
					Lista de Tareas de {props.user.charAt(0).toUpperCase()}
					{props.user.slice(1)}
				</h3>
				<p>by jmmonzonn</p>
				<input
					placeholder="Introduce tarea"
					type="text"
					onKeyDown={(e) => {
						addNewEntry(e);
					}}
				/>
				<div>
					<div>
						{todoList.map((value, index) => {
							if (index === 0) {
								return;
							} else {
								return (
									<div className="task" key={index}>
										<div className="textTask">
											{value.label === "sample task"
												? ""
												: value.label}
											<button
												className="buttonTask"
												onClick={() =>
													deleteTask(index)
												}>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="16"
													height="16"
													fill="currentColor"
													class="bi bi-trash3"
													viewBox="0 0 16 16">
													<path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
												</svg>
											</button>
										</div>
									</div>
								);
							}
						})}
					</div>
				</div>
			</div>
			<div className="counter">
				{count === 0 ? (
					<h6>No hay tareas por hacer</h6>
				) : count === 1 ? (
					<h6>Te queda 1 tarea por hacer</h6>
				) : (
					<h6>Te quedan {count} tareas por hacer</h6>
				)}
			</div>
		</div>
	);
};

TodoList.prototypes = {
	user: PropTypes.string,
	arrayUser: PropTypes.array,
};

export default TodoList;
