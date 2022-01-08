import React, {useContext, useState} from "react";
import {Card} from "primereact/card";
import 'primeflex/primeflex.css'
import {Controller, useForm} from 'react-hook-form';
import {InputText} from 'primereact/inputtext';
import {useHistory} from 'react-router-dom';
import {ToastContext} from "../../common/toast.context";
import {classNames} from 'primereact/utils';
import {InputTextarea} from 'primereact/inputtextarea';
import {Button} from 'primereact/button';
import '../new-entry/fade-animation.css';
import AdviceService from "../../service/advice.service"


const NewAdvice = () => {

	const [loading, setLoading] = useState(false);

	const defaultValues = {
		title: '',
		details: ''
	};

	const {control, formState: {errors}, handleSubmit, reset} = useForm({defaultValues});
	const history = useHistory();
	const {toastRef} = useContext(ToastContext);


	const getFormErrorMessage = (name) => {
		return errors[name] && <small className="p-error">{errors[name].message}</small>
	};

	const onSubmit = (data) => {
		setLoading(true);
		AdviceService.addNewAdvice(data).then((response) => {
			console.log(response);
			reset();
			history.push('/forum/' + response.data.id);
			setLoading(false);
			toastRef.current.show({severity: 'success', summary: 'Uspjeh', detail: 'Zahtjev spremljen'});
		}, () => {
			setLoading(false);
			toastRef.current.show({severity: 'error', summary: 'Greška', detail: 'Greška prilikom spremanja zahtjeva'});
		});
	}
	const header = <div className="divButtonTop">
		<Button label="Povratak" icon="pi pi-angle-left" onClick={() => history.push('/forum')}/>
		<Button className="p-button-danger" label="Odustani" icon="pi pi-times" onClick={() => history.push('/forum')}
				style={{float: "right"}}/>
	</div>;
	return (
		<div>

			<div className="flex justify-content-center m-6">

				<Card className="card-container" title="Dodavanje novog zahtjeva za savjet" header={header}
					  style={{width: '50rem'}}>

					<form onSubmit={handleSubmit(onSubmit)} className="grid p-fluid p-formgrid form-layout">

						<div className="p-field col-12 md:col-12 lg:col-12 sm:col-12">
                        <span className="p-float-label">
                            <Controller name="title" control={control} rules={{required: 'Naslov je obavezan.'}}
										render={({field, fieldState}) => (
											<InputText id={field.name} {...field} autoFocus
													   className={classNames({'p-invalid': fieldState.invalid})}
													   type="text"/>
										)}/>
                            <label htmlFor="title" className={classNames({'p-error': errors.title})}>Naslov *</label>
                        </span>
							{getFormErrorMessage('title')}
						</div>

						<div className="p-field col-12 md:col-12 lg:col-12 sm:col-12">
                        <span className="p-float-label">
                            <Controller name="details" control={control}
										rules={{required: 'Opis je obavezan.'}}
										render={({field}) => (
											<InputTextarea id={field.name} {...field} type="text" rows={5} cols={30}
														   autoResize/>
										)}/>
                                <label htmlFor="details" className={
									classNames({'p-error': errors.description})}>Opis *</label>
                        </span>
							{getFormErrorMessage('details')}
						</div>

						<div className="col-12 flex justify-content-center">
							<div>
								<Button type="submit" label="Predaj oglas" className="mt-2"
										loading={loading}/>
							</div>
						</div>

					</form>

				</Card>
			</div>
		</div>
	);

}

export default NewAdvice;
