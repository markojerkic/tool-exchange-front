import 'primeflex/primeflex.css';
import {Button} from 'primereact/button';
import {Card} from 'primereact/card';
import {InputText} from 'primereact/inputtext';
import {Password} from 'primereact/password';
import {classNames} from 'primereact/utils';
import React, {useContext, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useHistory} from 'react-router-dom';
import AuthService from "../../../service/auth/auth.service";
import '../containers.css';
import {ToastContext} from "../../../common/toast.context";
import {Dialog} from "primereact/dialog";
import LocationSearch from "../LocationSearch";

const Registration = () => {

	const [showLocationDialog, setShowLocationDialog] = useState(false);

	const [loading, setLoading] = useState(false);
	const [locationSelected, setLocationSelected] = useState();

	const [, setFormData] = useState({});
	const defaultValues = {
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		username: '',
		phonenumber: '',
		zip: '',
		formattedAddress: '',
		lat: null,
		lng: null,
		city: null
	}

	const {control, formState: {errors}, handleSubmit, setError, reset, setValue, setFocus} = useForm({defaultValues});
	const history = useHistory();
	const toastRef = useContext(ToastContext);

	const onLocationChanged = (location) => {
		setLocationSelected(location.value);
		setValue('formattedAddress', location.value.formatted_address);
		setFocus('formattedAddress');
		setShowLocationDialog(false);
	}

	const onSubmit = (data) => {
		setFormData(data);
		setLoading(true);
		data.locationSearchResult = locationSelected;

		const user = {
			firstName: data.firstName,
			lastName: data.lastName,
			email: data.email,
			username: data.username,
			password: data.password,
			locationSearchResult: locationSelected,
			phonenumber: data.phonenumber
		}

		console.log(user);
		AuthService.register(user).finally(() => setLoading(false)).then(() => {
			reset();
			history.push('/login');
		}).catch((error) => {
			if (error.response.status !== 409) {
				toastRef.current.show({severity: 'error', summary: 'Greška', detail: error.response.data.message});
			} else {
				if (error.response.data.reason === 'email') {
					setError("email", {type: "manual", message: "Email adresa se već koristi"});
				} else if (error.response.data.reason === 'username') {
					setError("username", {type: "manual", message: "Korisničko ime se već koristi"});
				}
			}
		});
	};

	const getFormErrorMessage = (name) => {
		return errors[name] && <small className="p-error">{errors[name].message}</small>
	};

	return (
		<div className="flex justify-content-center m-4">
			<Card className="card-container" title="Registracija novog korisnika">

				<form onSubmit={handleSubmit(onSubmit)} className="grid p-fluid p-formgrid form-layout">

					<div className="p-field col-12 md:col-6 lg:col-6 sm:col-12">
                        <span className="p-float-label">
                            <Controller name="firstName" control={control} rules={{required: 'Ime je obavezno.'}}
										render={({field, fieldState}) => (
											<InputText id={field.name} {...field} autoFocus
													   className={classNames({'p-invalid': fieldState.invalid})}
													   type="text"/>
										)}/>
                            <label htmlFor="firstName"
								   className={classNames({'p-error': errors.firstName})}>Ime*</label>
                        </span>
						{getFormErrorMessage('firstName')}
					</div>
					<div className="p-field col-12 md:col-6 lg:col-6 sm:col-12">
                        <span className="p-float-label">
                            <Controller name="lastName" control={control}
										rules={{required: 'Prezime je obavezno.'}}
										render={({field, fieldState}) => (
											<InputText id={field.name} {...field}
													   className={classNames({'p-invalid': fieldState.invalid})}
													   type="text"/>
										)}/>
                            <label htmlFor="lastName"
								   className={classNames({'p-error': errors.lastName})}>Prezime*</label>
                        </span>
						{getFormErrorMessage('lastName')}
					</div>

					<div className="p-field col-12 md:col-6 lg:col-6 sm:col-12">
                        <span className="p-float-label">
                            <Controller name="formattedAddress" control={control}
										rules={{required: 'Adresa je obavezna.'}}
										render={({field, fieldState}) => (
											<div className="p-inputgroup">
												<InputText id={field.name} {...field} type="text" readOnly={true}
														   placeholder='Adresa'
														   className={classNames({'p-invalid': fieldState.invalid})}/>
												<Button icon="pi pi-search" className="p-button-warning" type="button"
														tooltip='Pretražite lokacije'
														onMouseUp={() => setShowLocationDialog(true)}
														onClick={() => setShowLocationDialog(true)}/>
											</div>
										)}/>
                        </span>
					</div>

					<div className="p-field col-12 md:col-6 lg:col-6 sm:col-12">
                        <span className="p-float-label">
                            <Controller name="phonenumber" control={control}
										rules={{required: 'Broj mobitela je obavezan.'}}
										render={({field, fieldState}) => (
								<InputText id={field.name} {...field}
									className={classNames({'p-invalid': fieldState.invalid})}
									type='phonenumber'/>
							)}/>
                            <label htmlFor="phonenumber" className={classNames({'p-error': !!errors.phonenumber})}>Broj telefona*</label>
                        </span>
						{getFormErrorMessage('phonenumber')}
					</div>

					<div className="p-field col-12 md:col-6 lg:col-6 sm:col-12">
                        <span className="p-float-label">
                            <Controller name="email" control={control}
										rules={{
											required: 'E-mail je obavezan.',
											pattern: {
												value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
												message: 'Invalid email formattedAddress. E.g. example@email.com'
											}
										}}
										render={({field, fieldState}) => (
											<InputText id={field.name} {...field}
													   className={classNames({'p-invalid': fieldState.invalid})}
													   type="email"/>
										)}/>
                            <label htmlFor="email" className={classNames({'p-error': !!errors.email})}>E-mail*</label>
                        </span>
						{getFormErrorMessage('email')}
					</div>

					<div className="p-field col-12 md:col-6 lg:col-6 sm:col-12">
                        <span className="p-float-label">
                            <Controller name="password" control={control} rules={{required: 'Password je obavezan.'}}
										render={({field, fieldState}) => (
											<Password id={field.name} {...field} toggleMask
													  className={classNames({'p-invalid': fieldState.invalid})}/>
										)}/>
                            <label htmlFor="password"
								   className={classNames({'p-error': errors.password})}>Password*</label>
                        </span>
						{getFormErrorMessage('password')}
					</div>

					<div className="p-field col-12 md:col-6 lg:col-6 sm:col-12">
                            <span className="p-float-label">
                                <Controller name="username" control={control}
											rules={{required: 'Korisničko ime je obavezno.'}}
											render={({field, fieldState}) => (
												<InputText id={field.name} {...field}
														   className={classNames({'p-invalid': fieldState.invalid})}
														   type="text"/>
											)}/>
                                <label htmlFor="username" className={classNames({'p-error': errors.username})}>Korisničko ime*</label>
                            </span>
						{getFormErrorMessage('username')}
					</div>

					<div className="col-12 flex p-jc-start">
						<div>
							<Button type="submit" label="Registriraj se" className="mt-2"
									loading={loading}/>
						</div>
					</div>
				</form>

				<Dialog header="Odaberite svoju lokaciju" visible={showLocationDialog}
						style={{maxWidth: '90vw', minWidth: '50vw'}} draggable={false}
						onHide={() => setShowLocationDialog(false)}>
					<LocationSearch onValueChanged={onLocationChanged}/>
				</Dialog>

			</Card>
		</div>

	)
}


export default Registration;
