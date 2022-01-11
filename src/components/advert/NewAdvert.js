import React, {useContext, useRef, useState} from "react";
import {Card} from "primereact/card";
import 'primeflex/primeflex.css'
import {Controller, useForm} from 'react-hook-form';
import {InputText} from 'primereact/inputtext';
import {useHistory} from 'react-router-dom';
import {ToastContext} from "../../common/toast.context";
import {classNames} from 'primereact/utils';
import {InputTextarea} from 'primereact/inputtextarea';
import {Button} from 'primereact/button';
import {InputNumber} from 'primereact/inputnumber'
import {Dropdown} from "primereact/dropdown";
import {FileUpload} from 'primereact/fileupload';
import {InputSwitch} from 'primereact/inputswitch';
import Stepper from '../stepper/Stepper'
import AdService from "../../service/ads/ad.service";
import {InputMask} from "primereact/inputmask";
import ImageService from "../../service/image.service";


const NewAdvert = () => {

	const [loading, setLoading] = useState(false);
	const [imageIsDeleting, setImageIsDeleting] = useState({});

	const [electric, setElectric] = useState(false);

	const fileUploadRef = useRef(null);
	const [filesAreUploading, setFilesAreUploading] = useState(false);

	const chooseOptions = {label: 'Odaberi', icon: 'pi pi-fw pi-plus'};
	const uploadOptions = {label: 'Prenesi', icon: 'pi pi-upload', className: 'p-button-success'};
	const cancelOptions = {label: 'Otkaži', icon: 'pi pi-times', className: 'p-button-danger'};

	const header = <div className="divButtonTop">
		<Button label="Povratak" icon="pi pi-angle-left" onClick={() => history.push('/new-ad')}/>
		<Button className="p-button-danger" label="Odustani" icon="pi pi-times" onClick={() => history.push('/advert')}
				style={{float: "right"}}/>
	</div>;

	const defaultValues = {
		title: '',
		description: '',
		toolName: '',
		condition: null,
		phonenumber: '',
		power: 0,
		electric: false,
		hasBattery: false,
		images: []
	}

	const initialConditions = [
		{label: 'Novo', value: 'NEW'},
		{label: 'Rabljeno', value: 'USED'},
		{label: 'Neispravno/Oštećeno', value: 'DAMAGED'}
	];

	const [conditions] = useState(initialConditions);

	const {control, formState: {errors}, handleSubmit, reset, setValue} = useForm({defaultValues});
	const history = useHistory();
	const {toastRef} = useContext(ToastContext);

	const [savedImages, setSavedImages] = useState([]);


	const getFormErrorMessage = (name) => {
		return errors[name] && <small className="p-error">{errors[name].message}</small>
	};

	const onSubmit = (data) => {
		setLoading(true);
		let Tool;
		if (data.electric === true) {
			Tool = {
				name: data.toolName,
				electric: data.electric,
				hasBattery: data.hasBattery,
				power: data.power,
				toolState: data.condition
			}
		} else {
			Tool = {
				name: data.toolName,
				electric: data.electric,
				hasBattery: false,
				power: null,
				toolState: data.condition
			}
		}
		let podatci = {
			title: data.title,
			details: data.description,
			tool: Tool,
			phoneNumber: data.phonenumber,
			images: data.images
		}
		AdService.addNewAd(podatci).then((response) => {
			reset();
			history.push('/advert/' + response.data.id);
			setLoading(false);
			toastRef.current.show({severity: 'success', summary: 'Uspjeh', detail: 'Oglas napravljen'});
		}, () => {
			setLoading(false);
			toastRef.current.show({severity: 'error', summary: 'Greška', detail: 'Greška prilikom spremanja oglasa'});
		});
	}

	const onUpload = (images) => {
		setFilesAreUploading(true);
		ImageService.uploadImage(images.files).catch(() => {
			toastRef.current.show({severity: 'error', summary: 'Greška', detail: 'Greška prilikom prijenosa slika'});
		}).finally(() => {
			setFilesAreUploading(false);
			fileUploadRef.current.clear();
			toastRef.current.show({severity: 'success', summary: 'Uspjeh', detail: 'Slike prenijete'});
		}).then((images) => {
			savedImages.push(...images);
			setSavedImages([...savedImages]);
			setValue('images', savedImages);
		});

	}

	function deleteImage(uuid) {
		setImageIsDeleting({[uuid]: true, ...imageIsDeleting});
		ImageService.deleteImage(uuid).then(() => {
			setImageIsDeleting({[uuid]: false, ...imageIsDeleting});
			const filteredImages = savedImages.filter((image) => image.uuid !== uuid);
			setSavedImages(filteredImages);
			setValue('images', filteredImages);
		});
	}

	return (
		<div>
			<Stepper stepId={1} category={"tool"}/>
			<div className="flex justify-content-center m-6">

				<Card className="card-container" header={header} title="Dodavanje novog oglasa za alat"
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
                                <label htmlFor="title" className={classNames({'p-error': errors.title})}>Naslov*</label>
                            </span>
							{getFormErrorMessage('title')}
						</div>

						<div className="p-field col-12 md:col-8 lg:col-8 sm:col-8">
                            <span className="p-float-label">
                                <Controller name="toolName" control={control}
											rules={{required: 'Naziv alata je obavezan.'}}
											render={({field, fieldState}) => (
												<InputText id={field.name} {...field}
														   className={classNames({'p-invalid': fieldState.invalid})}
														   type="text"/>
											)}/>
                                <label htmlFor="toolName"
									   className={classNames({'p-error': errors.title})}>Naziv alata*</label>
                            </span>
							{getFormErrorMessage('toolName')}
						</div>

						<div
							className="p-field grid flex align-items-center p-dir-col col-12 md:col-4 lg:col-4 sm:col-4 ml-1">
							<Controller name="electric" control={control}
										render={({field, fieldState}) => (
											<InputSwitch id={field.name} inputId={field.name}
														 onChange={(e) => {
															 field.onChange(e.value);
															 setElectric(e.value);
														 }}
														 checked={field.value}
														 className={classNames({'p-invalid': fieldState.invalid})}/>
										)}/>
							<label className='col' htmlFor="electric">Električan</label>
						</div>

						{electric &&

							<div className="grid p-dir-col col-12 md:col-8 lg:col-8 sm:col-8" id="animDiv">
								<div className='p-field grid p-dir-col ml-2'>
                                    <span className="p-float-label">
                                        <Controller name="power" control={control}
													rules={{required: 'Snaga je obavezna.'}}
													render={({field, fieldState}) => (
														<InputNumber value={field.value}
																	 onChange={(e) => field.onChange(e.value)}
																	 suffix=" W"
																	 className={classNames({'p-invalid': fieldState.invalid})}/>
													)}/>
                                        <label htmlFor="power">Snaga (W) *</label>
                                    </span>
								</div>
								<div className='p-field grid p-dir-col ml-2'>
									<Controller name="hasBattery" control={control} className='col'
												render={({field, fieldState}) => (
													<InputSwitch id={field.name} inputId={field.name}
																 onChange={(e) => field.onChange(e.value)}
																 checked={field.value}
																 className={classNames({'p-invalid': fieldState.invalid})}/>
												)}/>
									<label className='col' htmlFor="hasBattery">Ima bateriju</label>
								</div>
							</div>

						}

						<div className="p-field col-12 md:col-12 lg:col-12 sm:col-12">
                            <span className="p-float-label">
                                <Controller name="description" control={control} rules={{required: 'Opis je obavezan.'}}
											render={({field}) => (
												<InputTextarea id={field.name} {...field} type="text" rows={5} cols={30}
															   autoResize/>
											)}/>
                                    <label htmlFor="description"
										   className={classNames({'p-error': errors.description})}>Opis*</label>
                            </span>
							{getFormErrorMessage('description')}
						</div>

						<div className="p-field col-12 md:col-6 lg:col-6 sm:col-6">
                            <span className="p-float-label">
                                <Controller name="condition" control={control} rules={{required: 'Stanje je obavezno.'}}
											render={({field}) => (
												<Dropdown id={field.name} value={field.value} options={conditions}
														  onChange={(e) => field.onChange(e.value)}/>
											)}/>
                                <label htmlFor="condition"
									   className={classNames({'p-error': errors.condition})}>Stanje*</label>
                            </span>
							{getFormErrorMessage('condition')}
						</div>

						<div className="p-field col-12 md:col-6 lg:col-6 sm:col-6">
                            <span className="p-float-label">
                                <Controller name="phonenumber" control={control}
											rules={{required: 'Broj mobitela je obavezan.'}} render={({field}) => (
									<InputMask id={field.name} value={field.value}
											   onChange={(e) => field.onChange(e.value)} mask="999 999 9999"/>
								)}/>
                                <label htmlFor="condition" className={classNames({'p-error': errors.condition})}>Broj mobitela*</label>
                            </span>
							{getFormErrorMessage('phonenumber')}
						</div>

						<div className="p-field col-12 md:col-12 lg:col-12 sm:col-12">
							<FileUpload name="images[]"
										ref={fileUploadRef} disabled={filesAreUploading}
										chooseOptions={chooseOptions} uploadOptions={uploadOptions}
										cancelOptions={cancelOptions} uploadHandler={onUpload} multiple accept="image/*"
										maxFileSize={2000000} customUpload
										emptyTemplate={<p className="m-0">Ovdje povucite i ispustite slike koje želite
											prenijeti.</p>}/>
						</div>

						<div className="col-12 flex justify-content-center">
							<div>
								<Button type="submit" label="Predaj oglas" className="mt-2"
										loading={loading}/>
							</div>
						</div>

					</form>

					{savedImages.map((image) => {
						return <div className='grid flex justify-content-between align-items-center'
									key={`image-div-${image.uuid}`}>
							<img key={image.uuid} style={{width: '10rem'}}
								 alt={image.uuid} className='col-4'
								 src={ImageService.getImageByUUID(image.uuid)}/>
							<h4 key={`h4-${image.uuid}`} className='col-4'>{image.uuid}</h4>
							<Button key={`button-${image.uuid}`} className='col-4'
									label='Ukloni sliku' onClick={() => deleteImage(image.uuid)}
									icon={imageIsDeleting[image.uuid] ? 'pi pi-spinner pi-spin' : 'pi pi-times'}
									disabled={imageIsDeleting[image.uuid]}/>
						</div>
					})}

				</Card>
			</div>
		</div>
	)

}

export default NewAdvert;
