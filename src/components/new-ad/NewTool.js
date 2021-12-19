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
import {InputNumber} from 'primereact/inputnumber'
import {Dropdown} from "primereact/dropdown";
import {FileUpload} from 'primereact/fileupload';
import {InputSwitch} from 'primereact/inputswitch';
import './fade-animation.css';
import Stepper from '../stepper/Stepper'


const NewTool = () => {

    const [loading, setLoading] = useState(false);

    const [, setFormData] = useState({});
    const [isElectric, setElectric] = useState(false);

    const chooseOptions = {label: 'Odaberi', icon: 'pi pi-fw pi-plus'};
    const uploadOptions = {label: 'Prenesi', icon: 'pi pi-upload', className: 'p-button-success'};
    const cancelOptions = {label: 'Otkaži', icon: 'pi pi-times', className: 'p-button-danger'};

    const header = <span>
        <Button label="Povratak" icon="pi pi-angle-left" onClick={() => history.push('/new-ad')} />
        <Button className="p-button-danger" label="Odustani" icon="pi pi-times" onClick={() => history.push('/')} style={{float:"right"}} />
    </span>;

    const defaultValues = {
        title: '',
        description: '',
        condition: null,
        phonenumber: null,
        power: 0,
        isElectric: false,
        hasBattery: false
    }

    const initialConditions = [
        {label: 'Novo', value: 'n'},
        {label: 'Rabljeno', value: 'u'},
        {label: 'Neispravno/Oštećeno', value: 'b'}
    ];

    const [conditions] = useState(initialConditions);

    const { control, formState: { errors }, handleSubmit, setError, reset, getValues } = useForm({ defaultValues });
    const history = useHistory();
    const {toastRef} = useContext(ToastContext);


    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

    const onSubmit = (data) => {
        setFormData(data);
        toastRef.current.show({severity:'success', summary: 'Uspijeh', detail: 'Zahtjev predan'});
        //setLoading(true);
        console.log(data);
    }

    const onUpload = () => {
        toastRef.current.show({severity:'success', summary: 'Uspijeh', detail: 'Slika prenešena'});
    }

    return(
        <div>
            <Stepper stepId={1} category={"tool"} />
            <div className="p-d-flex p-jc-center p-m-6">

                <Card className="card-container" header={header} title="Dodavanje novog oglasa za alat" style={{ width: '50rem' }}>

                    <form onSubmit={handleSubmit(onSubmit)} className="p-grid p-fluid p-formgrid form-layout">

                        <div className="p-field p-col-12 p-md-12 p-lg-12 p-sm-12">
                            <span className="p-float-label">
                                <Controller name="title" control={control} rules={{ required: 'Naslov je obavezan.' }} render={({ field, fieldState }) => (
                                    <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} type="text" />
                                    )}/>
                                <label htmlFor="title" className={classNames({ 'p-error': errors.title })}>Naslov*</label>
                            </span>
                            {getFormErrorMessage('title')}
                        </div>

                        <div className="p-field p-grid p-dir-col p-col-12 p-md-6 p-lg-6 p-sm-6 p-ml-1">
                            <Controller name="isElectric" control={control}
                                        render={({ field, fieldState }) => (
                                            <InputSwitch id={field.name} inputId={field.name}
                                                onChange={(e) => {
                                                    field.onChange(e.value);
                                                    setElectric(e.value);
                                                }}
                                                checked={field.value}
                                                className={classNames({'p-invalid': fieldState.invalid})} />
                                        )}/>
                            <label className='p-col' htmlFor="isElectric">Električan</label>
                        </div>

                        { isElectric &&

                            <div className="p-grid p-dir-col p-col-12 p-md-8 p-lg-8 p-sm-8" id="animDiv">
                                <div className='p-field'>
                                    <span className="p-float-label">
                                        <Controller name="power" control={control}  rules={{ required: 'Snaga je obavezna.' }}
                                                    render={({ field, fieldState }) => (
                                            <InputNumber value={field.value} onChange={(e) => field.onChange(e.value)}
                                                         suffix=" W"
                                                         className={classNames({ 'p-invalid': fieldState.invalid })}/>
                                            )}/>
                                        <label htmlFor="power">Snaga (W) *</label>
                                    </span>
                                </div>
                                <div className='p-field p-grid p-dir-col p-ml-1'>
                                    <Controller name="hasBattery" control={control} className='p-col'
                                                render={({ field, fieldState }) => (
                                                    <InputSwitch id={field.name} inputId={field.name}
                                                                 onChange={(e) => field.onChange(e.value)}
                                                                 checked={field.value}
                                                                 className={classNames({'p-invalid': fieldState.invalid})}/>
                                                )}/>
                                    <label className='p-col' htmlFor="hasBattery">Ima bateriju</label>
                                </div>

                            </div>

                        }

                        <div className="p-field p-col-12 p-md-12 p-lg-12 p-sm-12">
                            <span className="p-float-label">
                                <Controller name="description" control={control} rules={{ required: 'Opis je obavezan.' }} render={({ field }) => (
                                    <InputTextarea id={field.name} {...field} type="text" rows={5} cols={30} autoResize/>
                                )}/>
                                    <label htmlFor="description" className={classNames({ 'p-error': errors.description })}>Opis*</label>
                            </span>
                            {getFormErrorMessage('description')}
                        </div>

                        <div className="p-field p-col-12 p-md-4 p-lg-4 p-sm-4">
                            <span className="p-float-label">
                                <Controller name="condition" control={control} rules={{ required: 'Stanje je obavezno.' }} render={({ field }) => (
                                    <Dropdown id={field.name} value={field.value} options={conditions} onChange={(e) => field.onChange(e.value)}/>
                                )}/>
                                <label htmlFor="condition" className={classNames({ 'p-error': errors.condition })}>Stanje*</label>
                            </span>
                            {getFormErrorMessage('condition')}
                        </div>

                        <div className = "p-field p-col-12 p-md-4 p-lg-4 p-sm-4">
                            <span className="p-float-label">
                                <Controller name="phonenumber" control={control} rules={{ required: 'Broj mobitela je obavezan.' }} render={({ field }) => (
                                    <InputNumber id={field.name} value={field.value} onChange={(e) => field.onChange(e.value)}/>
                                )}/>
                                <label htmlFor="condition" className={classNames({ 'p-error': errors.condition })}>Broj mobitela*</label>
                            </span>
                            {getFormErrorMessage('phonenumber')}
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