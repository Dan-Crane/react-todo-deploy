import React, {useState} from "react";

import './search-panel.css'

export const SearchPanel = ({searchItem}) => {
	const [state, setState] = useState('')
	const onSearchChange = (e) => {
		setState(e.target.value)
		searchItem(e.target.value)
	}
	return (
		<input type="text"
					 className="form-control search-input"
					 placeholder="type to search"
					 onChange={onSearchChange}
					 value={state}/>
	)
}
