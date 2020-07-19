import React from "react";

import './item-status-filter'

export const ItemStatusFilter = ({filterTask, filterState}) => {

	const buttons = [
		{name: 'all', label: 'All'},
		{name: 'active', label: 'Active'},
		{name: 'done', label: 'Done'},
	]

	return (
		<div className='btn-group'>
			{buttons.map(({name, label}) => {
				const active = filterState === name ? 'btn-info' : 'btn-outline-dark'
				return <button key={name}
											 type="button"
											 onClick={()=>filterTask(name)}
											 className={`btn btn-sm ${active}`}>
					{label}</button>
			})}
		</div>
	)
}
