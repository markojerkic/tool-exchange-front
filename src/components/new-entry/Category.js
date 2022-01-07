import React, {useState} from "react";
import {Card} from "primereact/card";
import 'primeflex/primeflex.css'
import {SelectButton} from 'primereact/selectbutton';
import Stepper from '../stepper/Stepper'
import {useHistory} from "react-router";


const Category = () => {
	const history = useHistory();
	const [category] = useState();
	const options = [
		{label: 'Alat', value: 'tool'},
		{label: 'Zahtjev', value: 'request'}
	];

	return (
		<div>
			<Stepper stepId={0}/>
			<div className="flex justify-content-center m-6">

				<Card className="card-container" title="Odabir kategorije" style={{width: '50rem'}}>

					<form className="grid p-fluid p-formgrid form-layout justify-content-center">
						<div className="p-field col-12 md:col-6 lg:col-8 sm:col-6">
							<SelectButton value={category} options={options}
										  onChange={(e) => history.push(`/new-ad/${e.value}`)}/>
						</div>
					</form>

				</Card>
			</div>
		</div>
	)

}

export default Category;
