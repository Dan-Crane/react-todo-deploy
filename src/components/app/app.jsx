import React, {useCallback, useState} from "react";

import './app.css'

import {AppHeader} from "../app-header";
import {ItemStatusFilter} from "../item-status-filter";
import {SearchPanel} from "../search-panel";
import {TodoList} from "../todo-list";
import {ItemAddForm} from "../item-add-form";

export const App = (props) => {

	let maxId = 101

	const createTotoItem = (label) => {
		return {
			id: maxId++,
			label,
			important: false,
			done: false
		}
	}

	let initialState = [
		createTotoItem('create react todo'), createTotoItem('drink coffee'), createTotoItem('lol kek 4eburek')
	]

	const [state, setState] = useState(initialState)
	const [textSearch, setTextSearch] = useState('')
	const [filterState, setFilterState] = useState('all')

	const filter = (items, filter) => {
		switch (filter) {
			case 'all':
				return items
			case 'active':
				return items.filter(el=> !el.done)
			case 'done':
				return items.filter(el=> el.done)
			default:
				return items
		}
	}

	const filterTask = (filter) => {
		setFilterState(filter)
	}

	const search = (items, text) => {
		if (text.length === 0) return items

		return items.filter(el => {
			return el.label.toLowerCase().indexOf(text.toLowerCase()) > -1
		})
	}

	const searchItem = (text) => {
		setTextSearch(text)
	}

	const findAnIndex = (id) => {
		return state.findIndex(el => el.id === id)
	}

	const deleteItem = useCallback((id) => {
		const idx = findAnIndex(id)
		const newArr = [...state.slice(0, idx), ...state.slice(idx + 1)]
		setState(newArr)
	}, [state])

	const addItem = useCallback((text) => {
		const newItem = createTotoItem(text)
		setState((s) => [...s, newItem])
	}, [maxId])

	const toggleProperty = (arr, id, propName) => {
		const idx = findAnIndex(id)
		const oldItem = arr[idx]
		const newItem = {...oldItem, [propName]: !oldItem[propName]}
		return [...arr.slice(0, idx),
			newItem,
			...arr.slice(idx + 1)]
	}

	const onToggleDone = (id) => {
		setState(toggleProperty(state, id, 'done'))
	}

	const onToggleImportant = (id) => {
		setState(toggleProperty(state, id, 'important'))
	}

	const doneCount = state.filter(el => el.done).length
	const todoCount = state.length - doneCount

	const visibleState = filter(search(state, textSearch), filterState)

	return (
		<div className='container card'>
			<div className='card-body'>
				<AppHeader toDo={todoCount} done={doneCount}/>
				<div className='d-flex nav-panel'>
					<SearchPanel searchItem={searchItem}/>
					<ItemStatusFilter filterState={filterState}  filterTask={filterTask}/>
				</div>
				<TodoList state={visibleState}
									onToggleDone={onToggleDone}
									onDeleted={deleteItem}
									onToggleImportant={onToggleImportant}/>
				<ItemAddForm addItem={addItem}/>
			</div>
		</div>
	)
}
