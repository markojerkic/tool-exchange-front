import React, {useContext, useState} from "react";
import { Card } from "primereact/card";
import 'primeflex/primeflex.css'
import {Controller, useForm} from 'react-hook-form';
import {InputText} from 'primereact/inputtext';
import {useHistory} from 'react-router-dom';
import {ToastContext} from "../../common/toast.context";
import {classNames} from 'primereact/utils';
import { InputTextarea } from 'primereact/inputtextarea';
import {Button} from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import './fade-animation.css';
import Stepper from '../stepper/Stepper'
import AdService from "../../service/ads/ad.service";


const NewTool = () => {

    const [loading, setLoading] = useState(false);

    const [, setFormData] = useState({});

    const chooseOptions = {label: 'Odaberi', icon: 'pi pi-fw pi-plus'};
    const uploadOptions = {label: 'Prenesi', icon: 'pi pi-upload', className: 'p-button-success'};
    const cancelOptions = {label: 'Otkaži', icon: 'pi pi-times', className: 'p-button-danger'};

    const defaultValues = {
        title: '',
        details: '',
    }


    const { control, formState: { errors }, handleSubmit, setError, reset } = useForm({ defaultValues });
    const history = useHistory();
    const {toastRef} = useContext(ToastContext);


    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

    const onSubmit = (data) => {
        setFormData(data);
        setLoading(true);
        AdService.addNewAd(data).then(() => {
            reset();
            history.push('/user');
            setLoading(false);
          });
        toastRef.current.show({severity:'success', summary: 'Uspjeh', detail: 'Zahtjev predan'});
        console.log(data);
    }

    const onUpload = () => {
        toastRef.current.show({severity:'success', summary: 'Uspjeh', detail: 'Slika prenešena'});
    }

    const header = <span>
            <Button label="Povratak" icon="pi pi-angle-left" onClick={() => history.push('/new-ad')} />
            <Button className="p-button-danger" label="Odustani" icon="pi pi-times" onClick={() => history.push('/')} style={{float:"right"}} />
        </span>;
    return(
        <div>
            <Stepper stepId={1} category={"request"} />
            
            <div className="p-d-flex p-jc-center p-m-6">

                <Card className="card-container" title="Dodavanje novog oglasa za zahtjev" header={header} style={{ width: '50rem' }} >

                <form onSubmit={handleSubmit(onSubmit)} className="p-grid p-fluid p-formgrid form-layout">

                    <div className="p-field p-col-12 p-md-12 p-lg-12 p-sm-12">
                        <span className="p-float-label">
                            <Controller name="title" control={control} rules={{ required: 'Naslov je obavezan.' }} render={({ field, fieldState }) => (
                                <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} type="text" />
                                )}/>
                            <label htmlFor="title" className={classNames({ 'p-error': errors.title })}>Naslov *</label>
                        </span>
                        {getFormErrorMessage('title')}
                    </div>

                    <div className="p-field p-col-12 p-md-12 p-lg-12 p-sm-12">
                        <span className="p-float-label">
                            <Controller name="details" control={control} rules={{ required: 'Opis je obavezan.' }} render={({ field }) => (
                                <InputTextarea id={field.name} {...field} type="text" rows={5} cols={30} autoResize/>
                            )}/>
                                <label htmlFor="details" className={classNames({ 'p-error': errors.description })}>Opis *</label>
                        </span>
                        {getFormErrorMessage('details')}
                    </div>

                    <div className="p-field p-col-12 p-md-12 p-lg-12 p-sm-12">
                        <FileUpload name="images[]" url="https://primefaces.org/primereact/showcase/upload.php" chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions} onUpload={onUpload} multiple accept="image/*" maxFileSize={1000000}
                        emptyTemplate={<p className="p-m-0">Ovdje povucite i ispustite slike koje želite prenijeti.</p>} />
                    </div>

                    <div className="p-col-12 p-d-flex p-jc-center">
                      <div>
                          <Button type="submit" label="Predaj oglas" className="p-mt-2"
                            loading={loading}/>
                      </div>
                    </div>

                </form>

                </Card>
            </div>
        </div>
    )

}

export default NewTool;
