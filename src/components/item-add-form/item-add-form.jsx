import React, {useState} from "react";

import './item-add-form.css'

export const ItemAddForm = ({addItem}) => {

	const [state, setState] = useState('')

	const onLabelChange = (e) => {
		setState(e.target.value)
	}

	const onSubmit = (e) => {
		e.preventDefault()
		if(e.currentTarget[0].value === '') return
		addItem(state)
		setState('')
	}

	return (
		<form
			onSubmit={onSubmit}
			className='item-add-form d-flex'>
			<input type="text"
						 className="form-control"
						 placeholder="What needs to be done"
						 onChange={onLabelChange}
						 value={state}/>
			<button
				className="btn btn-info">
				Add Item
			</button>
		</form>
	)
}
