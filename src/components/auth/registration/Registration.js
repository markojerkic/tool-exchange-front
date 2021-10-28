import 'primeflex/primeflex.css';
import {Button} from 'primereact/button';
import {Card} from 'primereact/card';
import {Dropdown} from 'primereact/dropdown';
import {InputText} from 'primereact/inputtext';
import {Password} from 'primereact/password';
import {classNames} from 'primereact/utils';
import React, {useContext, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useHistory} from 'react-router-dom';
import AuthService from "../../../service/auth/auth.service";
import '../containers.css';
import {ToastContext} from "../../../common/toast.context";
import {InputMask} from 'primereact/inputmask';

const Registration = () => {

    const initalCities = [
        {name: 'Zagreb', code: 'Zagreb'},
        {name: 'Split', code: 'Split'},
        {name: 'Rijeka', code: 'Rijeka'},
        {name: 'Osijek', code: 'Osijek'},
        {name: 'Velika Gorica', code: 'Velika Gorica'},
        {name: 'Zadar', code: 'Zadar'},
        {name: 'Slavonski Brod', code: 'Slavonski Brod'},
        {name: 'Pula', code: 'Pula'},
        {name: 'Dubrovnik', code: 'Dubrovnik'},
    ];

    const [cities] = useState(initalCities);
    const [loading, setLoading] = useState(false);

    const [, setFormData] = useState({});
    const defaultValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        username: '',
        phonenumber: '',
        zip: '',
        address: '',
        city: null
    }

    const { control, formState: { errors }, handleSubmit, setError, reset } = useForm({ defaultValues });
    const history = useHistory();
    const toastRef = useContext(ToastContext);

    const onSubmit = (data) => {
        setFormData(data);
        setLoading(true);
        AuthService.register(data).then((response) => {
            reset();
            setLoading(false);
            history.push('/login');
        }, (error) => {
            setLoading(false);
            if (error.response.status !== 400) {
                toastRef.current.show({severity:'error', summary: 'Greška', detail:error.response.data.message});
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

    return(
        <div className="p-d-flex p-jc-center p-m-4">
            <Card className="card-container" title="Registracija novog korisnika">

                <form onSubmit={handleSubmit(onSubmit)} className="p-grid p-fluid p-formgrid form-layout">

                    <div className="p-field p-col-12 p-md-6 p-lg-6 p-sm-12">
                        <span className="p-float-label">
                            <Controller name="firstName" control={control} rules={{ required: 'Ime je obavezno.' }} render={({ field, fieldState }) => (
                                <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} type="text" />
                                )}/>
                            <label htmlFor="firstName" className={classNames({ 'p-error': errors.firstName })}>Ime*</label>
                        </span>
                        {getFormErrorMessage('firstName')}
                    </div>
                    <div className="p-field p-col-12 p-md-6 p-lg-6 p-sm-12">
                        <span className="p-float-label">
                            <Controller name="lastName" control={control}
                                rules={{ required: 'Prezime je obavezno.'}}
                                render={({ field, fieldState }) => (
                                    <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} type="text" />
                            )} />
                            <label htmlFor="lastName" className={classNames({ 'p-error': errors.lastName })}>Prezime*</label>
                        </span>
                        {getFormErrorMessage('lastName')}
                    </div>

                    <div className="p-field p-col-12 p-md-6 p-lg-6 p-sm-12">
                        <span className="p-float-label">
                            <Controller name="address" control={control} render={({ field }) => (
                              <InputText id={field.name} {...field} type="text" />
                            )}/>
                                <label htmlFor="address">Adresa</label>
                        </span>
                    </div>
                
                    
                    <div className="p-field p-col-12 p-md-6 p-lg-6 p-sm-12">
                        <span className="p-float-label">
                            <Controller name="country" control={control} render={({ field }) => (
                                <Dropdown id={field.name} value={field.value} options={cities} onChange={(e) => field.onChange(e.value)} optionLabel="name"/>
                            )}/>
                            <label htmlFor="city">Grad</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-6 p-lg-6 p-sm-12">
                        <span className="p-float-label">
                            <Controller name="zip" control={control} render={({ field }) => (
                                <InputText id={field.name} type="text" />
                            )}/>
                            <label htmlFor="zip">Poštanski broj</label>
                        </span>
                    </div>

                    <div className="p-field p-col-12 p-md-6 p-lg-6 p-sm-12">
                        <span className="p-float-label">
                            <Controller name="phonenumber" control={control} render={({ field }) => (
                              <InputMask id={field.name} mask="999 999 9999"/>
                            )} />
                            <label htmlFor="phonenumber">Broj telefona</label>
                        </span>
                    </div>
                    
                    <div className="p-field p-col-12 p-md-6 p-lg-6 p-sm-12">
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
                    
                    <div className="p-field p-col-12 p-md-6 p-lg-6 p-sm-12">
                        <span className="p-float-label">
                            <Controller name="password" control={control} rules={{ required: 'Password je obavezan.' }} render={({ field, fieldState }) => (
                                <Password id={field.name} {...field} toggleMask className={classNames({ 'p-invalid': fieldState.invalid })}/>
                            )} />
                            <label htmlFor="password" className={classNames({ 'p-error': errors.password })}>Password*</label>
                        </span>
                        {getFormErrorMessage('password')}
                    </div>

                    <div className="p-field p-col-12 p-md-6 p-lg-6 p-sm-12">
                            <span className="p-float-label">
                                <Controller name="username" control={control}
                                            rules={{ required: 'Korisničko ime je obavezno.'}}
                                            render={({ field, fieldState }) => (
                                                <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} type="text" />
                                            )} />
                                <label htmlFor="username" className={classNames({ 'p-error': errors.username })}>Korisničko ime*</label>
                            </span>
                        {getFormErrorMessage('username')}
                    </div>

                    <div className="p-col-12 p-d-flex p-jc-start">
                        <div>
                            <Button type="submit" label="Registriraj se" className="p-mt-2"
                                loading={loading}/>
                        </div>
                    </div>
                </form>

            </Card>
        </div>
        
      )
}



export default Registration;
