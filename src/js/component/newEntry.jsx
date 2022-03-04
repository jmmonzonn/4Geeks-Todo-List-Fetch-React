import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import TodoList from "./todolist.jsx";

const NewEntry = (props) => {
	useEffect(() => {
		fetch(`https://assets.breatheco.de/apis/fake/todos/user/${props.user}`)
			.then((response) => response.json())
			.then((result) => {
				console.log("useEffect funcionando");
				console.log(result);
				copyUser(result);
			});
	}, []);

	const copyUser = (res) => {
		const arrayUser = res;
		console.log(arrayUser);
		ReactDOM.render(
			<TodoList arrayUser={arrayUser} user={props.user} />,
			document.querySelector("#app")
		);
	};

	return (
		<div className="colorNote">
			<h2>Bienvenido {props.user}</h2>
		</div>
	);
};

NewEntry.prototypes = {
	user: PropTypes.string,
};

export default NewEntry;
