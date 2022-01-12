import React, {useContext, useRef, useState} from "react";
import {Card} from "primereact/card";
import 'primeflex/primeflex.css'
import {Controller, useForm} from 'react-hook-form';
import {InputText} from 'primereact/inputtext';
import {useHistory} from 'react-router-dom';
import {ToastContext} from "../../../common/toast.context";
import {classNames} from 'primereact/utils';
import {InputTextarea} from 'primereact/inputtextarea';
import {Button} from 'primereact/button';
import AdviceService from "../../../service/advice.service"
import {FileUpload} from 'primereact/fileupload';
import ImageService from "../../../service/image.service";


const NewThread = () => {

	const [loading, setLoading] = useState(false);
	const [imageIsDeleting, setImageIsDeleting] = useState({});

	const [savedImages, setSavedImages] = useState([]);
	const fileUploadRef = useRef(null);
	const [filesAreUploading, setFilesAreUploading] = useState(false);

	const chooseOptions = {label: 'Odaberi', icon: 'pi pi-fw pi-plus'};
	const uploadOptions = {label: 'Prenesi', icon: 'pi pi-upload', className: 'p-button-success'};
	const cancelOptions = {label: 'Otkaži', icon: 'pi pi-times', className: 'p-button-danger'};

	const defaultValues = {
		title: '',
		details: '',
		images: []
	};

	const {control, formState: {errors}, handleSubmit, reset, setValue} = useForm({defaultValues});
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

	const onUpload = (images) => {
		setFilesAreUploading(true);
		ImageService.uploadImage(images.files)
			.catch(() => {
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

	const header = <div className="divButtonTop">
		<Button label="Povratak" icon="pi pi-angle-left" onClick={() => history.push('/forum')}/>
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
	);

}

export default NewThread;
