import React from "react";

import './todo-list.css'

import {TodoListItem} from "./todo-list-item";
import {TodoListItemWarning} from "./todo-list-item-warning";

export const TodoList = ({state, onDeleted, onToggleDone, onToggleImportant}) => {

	const item = state.map(i => {
		const {id, ...itemProps} = i

		return (
			<li className='list-group-item' key={id}>
				<TodoListItem {...itemProps}
											onDeleted={() => onDeleted(id)}
											onToggleImportant={() => onToggleImportant(id)}
											onToggleDone={() => onToggleDone(id)}/>
			</li>


		)
	})

	return (
		<ul className='list-group todo-list'>
			{state.length ===0 ? <TodoListItemWarning/>  : item}
		</ul>
	)
}
