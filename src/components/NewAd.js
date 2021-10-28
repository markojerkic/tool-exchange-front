import React, {useContext, useState} from "react";
import { Card } from "primereact/card";
import 'primeflex/primeflex.css'
import {Controller, useForm} from 'react-hook-form';
import {InputText} from 'primereact/inputtext';
import {useHistory} from 'react-router-dom';
import {ToastContext} from "../common/toast.context";
import {classNames} from 'primereact/utils';
import { InputTextarea } from 'primereact/inputtextarea';
import {Button} from 'primereact/button';


const NewAd = () => {


    const [loading, setLoading] = useState(false);


    const [, setFormData] = useState({});
    const defaultValues = {
        title: '',
        description: ''
    }


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


    return(
        <div className="p-d-flex p-jc-center p-m-6">
            <Card className="card-container" title="Dodavanje novog oglasa" style={{ width: '50rem' }}>

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

                <div className="p-field p-col-12 p-md-12 p-lg-12 p-sm-12">
                        <span className="p-float-label">
                            <Controller name="description" control={control} render={({ field }) => (
                              <InputTextarea id={field.name} {...field} type="text" rows={5} cols={30} autoResize/>
                            )}/>
                                <label htmlFor="description">Opis</label>
                        </span>
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
    )


}

export default NewAd;