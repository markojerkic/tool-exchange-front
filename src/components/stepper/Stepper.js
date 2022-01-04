import React, {useState} from 'react';
import {Steps} from 'primereact/steps';
import './StepsDemo.css';

const Stepper = props => {
	const [activeIndex, setActiveIndex] = useState(props.stepId);
	const items = [
		{
			label: 'Odabir Kategorije',
			command: (e) => {
				window.location.replace("/new-ad")
			}
		},
		{
			label: 'Predaja Oglasa',
			command: () => {
				window.location.replace(`/new-ad/${props.category}`)
			}
		}
	];

	return (
		<div className="steps-demo">
			<div className="card">
				<Steps model={items} activeIndex={activeIndex} onSelect={(e) => setActiveIndex(e.index)}
					   readOnly={false}/>
			</div>
		</div>
	);
}

export default Stepper;
