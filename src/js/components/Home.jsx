import React, { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component

//Perdón por los comments estoy haciendo mi código mientras repito la clase, estuvo dificil de entender.

function ToDoList() {
	// no se me ocurren nombres cool para las cons, Aqui guardamos lo que escribimos.
	const [topic, setTopic] = useState('');
	const [topics, setTopics] = useState([]);
	const [hover, setHover] = useState(null)

	// aqui se actualiza lo que escribimos.

	const handleChange = (e) => {
		setTopic(e.target.value)
	}

	const handleKeyPress = (e) => {
		if (e.key === 'Enter' && topic.trim() !== '') {
			setTopics([...topics, topic.trim()]); //15:32 el error era de aquí era "topics" primero
			setTopic('');
		}
	};
	//filter está mejor, splice es un asco me tiró error.
	//se usan _ "guión bajo" si no necesitamos el valor de la tarea.
	const handleDelete = (indexToDelete) => {
		setTopics(topics.filter((_, index) => index !== indexToDelete))
	}
	// NO OLVIDAR LOS PUNTO Y COMA ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;


	return (
		<div className="first-Sheet">
			<h1> What's Your Next Step? </h1>
			<input
				className="topictext"
				type="text"
				value={topic}
				onChange={handleChange}
				onKeyDown={handleKeyPress}
				placeholder="Type here..."
			/>
			{topics.length === 0 ? (
				<p className="voidp">Still waiting...</p>
			) : (
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
									onClick={() => handleDelete(index)}
								>
									❌
								</span>
							)}
						</li>
					))}
				</ul>
			)}

		</div>
	)}
export default ToDoList;
//errores:
//15:10 no se por que me aparece cada letra en un renglón... arreglado
//No me guarda las tareas, las escribo y se borran solas despues de unos segundos: 
//onClick={(handleDelete(index))} era esta linea... corregido
//15:41wwwwww Ya guarda la información... ya estoy cansado al rato hago estilos.