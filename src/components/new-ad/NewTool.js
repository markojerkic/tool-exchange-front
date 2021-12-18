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
import {InputNumber} from 'primereact/inputnumber'
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from 'primereact/fileupload';
import { InputSwitch } from 'primereact/inputswitch';
import { SelectButton } from 'primereact/selectbutton';
import './NewTool.css';
import Stepper from '../stepper/Stepper'


const NewTool = () => {

    const [loading, setLoading] = useState(false);

    const [, setFormData] = useState({});
    const [elektrican, setElektrican] = useState('Ne');
    const [power, setPower] = useState();
    const options = ['Da', 'Ne']
    const [battery, setBattery] = useState(false);

    const chooseOptions = {label: 'Odaberi', icon: 'pi pi-fw pi-plus'};
    const uploadOptions = {label: 'Prenesi', icon: 'pi pi-upload', className: 'p-button-success'};
    const cancelOptions = {label: 'Otkaži', icon: 'pi pi-times', className: 'p-button-danger'};

    const header = <span>
        <Button label="Povratak" icon="pi pi-angle-left" onClick={() => history.push('/new-ad')} />
        <Button className="p-button-danger" label="Odustani" icon="pi pi-times" onClick={() => history.push('/')} style={{float:"right"}} />
        </span>

    const defaultValues = {
        title: '',
        description: '',
        condition: null,
        phonenumber: null
    }

    const initialConditions = [
        {label: 'Novo', value: 'n'},
        {label: 'Rabljeno', value: 'u'},
        {label: 'Neispravno/Oštećeno', value: 'b'}
    ];

    const [conditions] = useState(initialConditions);


    const { control, formState: { errors }, handleSubmit, setError, reset } = useForm({ defaultValues });
    const history = useHistory();
    const toastRef = useContext(ToastContext);


    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

    const onSubmit = (data) => {
        setFormData(data);
        setLoading(true);
    }

    const onUpload = () => {
        this.toast.show({severity: 'info', summary: 'Success', detail: 'File Uploaded'});
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

                <div className="p-field p-col-12 p-md-6 p-lg-6 p-sm-6">
                    <label htmlFor="electric">Električan</label>
                        <SelectButton value={elektrican} options={options} onChange={(e) => setElektrican(e.value)} />
                </div>   

                { elektrican==='Da' && 
                
                    <div className="p-field p-col-12 p-md-8 p-lg-8 p-sm-8" id="animDiv">
                        <span className="p-float-label">
                            <Controller name="power" control={control} render={({ field, fieldState }) => (
                                <InputNumber id={field.name} {...field} value = {power} className={classNames({ 'p-invalid': fieldState.invalid })} onValueChange={(e) => setPower(e.value)}/>
                                )}/>
                            <label htmlFor="power">Snaga (W)*</label>
                        </span>
                        <br /> 
                        <label htmlFor="electric">Ima bateriju:</label>
                        <br /> 
                        <InputSwitch checked={battery} onChange={(e) => setBattery(e.value)} />
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
                

                {//Ostavio sam polje za cijenu u slucaju da se predomislimo i dodamo cijenu hehe
                /* <div className="p-field p-col-12 p-md-8 p-lg-8 p-sm-8">
                    <span className="p-float-label">
                        <Controller name="price" control={control} rules={{ required: 'Cijena je obavezna.' }} render={({ field, fieldState }) => (
                            <InputNumber id={field.name} {...field} value={value1} className={classNames({ 'p-invalid': fieldState.invalid })} 
                            onValueChange={(e) => setValue1(e.value)} mode="currency" currency="HRK" currencyDisplay="code" locale="hr-HR" />
                            )}/>
                        <label htmlFor="price" className={classNames({ 'p-error': errors.price })}>Cijena*</label>
                    </span>
                    {getFormErrorMessage('price')}
                </div> */}

                
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