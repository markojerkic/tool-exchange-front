import React, {useEffect, useState}from 'react';
import { InputText } from 'primereact/inputtext';
import {Password} from 'primereact/password';
import 'primeflex/primeflex.css';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { useForm, Controller } from 'react-hook-form';
import {classNames} from 'primereact/utils'

const Register = () => {


    const [cities, setCities] = useState([]);
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});
    const defaultValues = {
        name: '',
        lastname: '',
        email: '',
        password: '',
        phonenumber: '',
        zip: '',
        city: null
    }

    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });

    const onSubmit = (data) => {
        setFormData(data);
        setShowMessage(true);

        reset();
    };

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

    return(
        <div className="card">
            <div className="p-text-center">
                <h2>Registracija novog korisnika:</h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">

                <div className="p-grid p-fluid p-formgrid p-jc-center">
                    <div className="p-field p-col-12 p-md-6 p-lg-3 p-sm-12">
                        <span className="p-float-label">
                            <Controller name="name" control={control} rules={{ required: 'Ime je obavezno.' }} render={({ field, fieldState }) => (
                                <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} type="text" />
                                )}/>
                            <label htmlFor="name" className={classNames({ 'p-error': errors.name })}>Ime*</label>
                        </span>
                    {getFormErrorMessage('name')}
                    </div>
                    <div className="p-field p-col-12 p-md-6 p-lg-3 p-sm-12">
                        <span className="p-float-label">
                            <Controller name="lastname" control={control}
                                rules={{ required: 'Prezime je obavezno.'}}
                                render={({ field, fieldState }) => (
                                    <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} type="text" />
                            )} />
                            <label htmlFor="lastname" className={classNames({ 'p-error': errors.lastname })}>Prezime*</label>
                        </span>
                    {getFormErrorMessage('lastname')}
                    </div>
                </div>
                <div className="p-grid p-fluid p-formgrid p-jc-center">
                    <div className="p-field p-col-12 p-md-12 p-lg-6 p-sm-12">
                        <span className="p-float-label">
                            <Controller name="address" control={control} render={({ field }) => (
                                <InputTextarea id={field.name} {...field} type="text" rows="4" />
                            )}/>
                                <label htmlFor="address">Adresa</label>
                        </span>
                        </div>
                </div>
                <div className="p-grid p-fluid p-formgrid p-jc-center">
                    <div className="p-field p-col-12 p-md-6 p-lg-3 p-sm-12">
                        <span className="p-float-label">
                            <Controller name="country" control={control} render={({ field }) => (
                                <Dropdown id={field.name} value={field.value} options={cities} onChange={(e) => field.onChange(e.value)} optionLabel="name"/>
                            )}/>
                            <label htmlFor="city">Grad</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-6 p-lg-3 p-sm-12">
                        <span className="p-float-label">
                            <Controller name="zip" control={control} render={({ field }) => (
                                <InputText id={field.name} type="text" />
                            )}/>
                            <label htmlFor="zip">Poštanski broj</label>
                        </span>
                    </div>
                </div>
                <div className="p-grid p-fluid p-formgrid p-jc-center">
                    <div className="p-field p-col-12 p-md-12 p-lg-6 p-sm-12">
                        <span className="p-float-label">    
                            <Controller name="email" control={control}
                                rules={{ required: 'E-mail je obavezan.', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Invalid email address. E.g. example@email.com' }}}
                                render={({ field, fieldState }) => (
                                    <InputText id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} type="email"/>
                            )} />
                            <label htmlFor="email" className={classNames({ 'p-error': !!errors.email })}>E-mail*</label>
                        </span>
                    {getFormErrorMessage('email')}
                    </div>
                </div>
                <div className="p-grid p-fluid p-formgrid p-jc-center">
                    <div className="p-field p-col-12 p-md-12 p-lg-6 p-sm-12">
                        <span className="p-float-label">
                            <Controller name="password" control={control} rules={{ required: 'Password je obavezan.' }} render={({ field, fieldState }) => (
                                <Password id={field.name} {...field} toggleMask className={classNames({ 'p-invalid': fieldState.invalid })}/>
                            )} />
                            <label htmlFor="password" className={classNames({ 'p-error': errors.password })}>Password*</label>
                        </span>
                    {getFormErrorMessage('password')}
                    </div>
                </div>
                <div className="p-grid p-fluid p-formgrid p-jc-center">
                    <div className="p-field p-col-12 p-md-12 p-lg-6 p-sm-12">
                        <span className="p-float-label">
                            <Controller name="phonenumber" control={control} render={({ field }) => (
                                <InputText id={field.name} type="number"/>
                                )} />
                            <label htmlFor="phonenumber">Broj telefona</label>
                        </span>
                    </div>
                    
                </div>

                <div className="p-d-flex p-jc-center">
                    <div className="p-field p-col-12 p-md-6 p-lg-3 p-sm-12">
                        <Button type="submit" label="Registriraj se" className="p-mt-2"/>
                    </div>
                </div>
            </form>
        </div>
      )
}



export default Register;