import React, { useEffect, useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component

function ToDoList() {
	// no se me ocurren nombres cool para las cons, Aqui guardamos lo que escribimos.
	//username = 'bdiaz18'
	const [topic, setTopic] = useState('');
	const [topics, setTopics] = useState([]);
	const [hover, setHover] = useState(null)
	const username = 'bdiaz18'
	useEffect(() => {
		createUser();
		getUserTodos();
	}, []);


	//Minuto 10:42 repetición de clase y Aaron no se calla
	//lo intenté con usuario fijo pero me dio errores, tratemos con user dinámico. Qué pereza cambiar todo

	const createUser = () => {
		fetch(`https://playground.4geeks.com/todo/users/${username}`, {
			method: "POST",
			headers: {
				'content-type': 'application/json'
			}
		})
			.then(resp => {
				if (!resp.ok) throw new Error(`error status code: ${resp.status}`)
				return resp.json()
			})
			//poner respuestas en los consoles... para que sea mas claro bro.
			.then(data => console.log('user created', data))
			.catch(err => console.log( 'user already exists', err))
	}
	const getUserTodos = () => {
		fetch(`https://playground.4geeks.com/todo/users/${username}`)
			.then(resp => {
				console.log(resp)
				if (!resp.ok) throw new Error(`error status code: ${resp.status}`)
				return resp.json()
			})
			.then(data => setTopics(data.todos))
			.catch(err => console.log(err))
	}
	//minuto 18:57
	const createTask = () => {
		fetch(`https://playground.4geeks.com/todo/todos/${username}`, {
			method: "POST",
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({label: topic, is_done:false})
		})
			.then(resp => {
				if (!resp.ok) throw new Error(`error status code: ${resp.status}`)
				return resp.json()
			})
			.then(() => {
				setTopic('')
				getUserTodos();
			})
			.catch(err => console.log(err))
	}
	const deleteTask = (id) => {
		fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
			method: 'DELETE'
		})
			.then(resp => {
				if (!resp.ok) throw new Error(`Error: ${resp.status}`);
				return resp.json();
			})
			.then(() => getUserTodos())
			.catch(err => console.log(err));
	}

	//minuto 19:26

	//Minuto 13:28

	const handleChange = (e) => {
		setTopic(e.target.value)
	}

	const handleKeyPress = (e) => {
		if (e.key === 'Enter' && topic.trim() !== '') {
			createTask(); //tan simple como esto y me tomó 3 horas...
		}
	};

	// NO OLVIDAR LOS PUNTO Y COMA ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;


	return (
		<div className="first-Sheet rounded border border-dark ">
			<h1><strong> What's Your Next Step?</strong></h1>
			<input
				className="topictext rounded "
				type="text"
				value={topic}
				onChange={handleChange}
				onKeyDown={handleKeyPress}
				placeholder="Type here..."
			/>
			{topics.length === 0 ? (
				<p className="voidp"><strong> Nothing yet...</strong></p>
			) : (
				<>
					<ul className="listoftopics">
						{topics.map((t, index) => (
							<li
								key={index}
								className="topicplaced"
								onMouseEnter={() => setHover(index)}
								onMouseLeave={() => setHover(null)}
							>
								<span>{t}</span>
								{hover === index && (
									<span
										className="removeX"
										onClick={() => deleteTask(t.id)}
									>
										❌
									</span>
								)}
							</li>
						))}
					</ul>
					<p className="itemsleft">
						{topics.length} {topics.length === 1 ? 'task' : 'tasks'} left.
					</p>
				</>
			)}

		</div>
	)
}

export default ToDoList;
