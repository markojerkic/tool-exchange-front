import 'primeflex/primeflex.css';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { classNames } from 'primereact/utils';
import { React, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import '../containers.css';

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formData, setFormData] = useState({});
  const defaultValues = {
    username: '',
    password: ''
  }
  const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });
  const history = useHistory();

  const onSubmit = (data) => {
    setFormData(data);
    reset();
    history.push('/');      
};
  const getFormErrorMessage = (name) => {
    return errors[name] && <small className="p-error">{errors[name].message}</small>
  };

  return(    
    <div className="p-d-flex p-jc-center p-m-4">
      <Card className="card-container" title="Prijavite se">
        <form onSubmit={handleSubmit(onSubmit)} className="p-grid p-fluid p-formgrid form-layout">
          <div className="p-field p-col-12">
                <span className="p-float-label">
                    <Controller name="username" control={control}
                          rules={{ required: 'Email je obavezan.', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 
                            message: 'Email adresa nije valjana. Primjer valjane adrese: primjer@email.hr' }}}
                          render={({ field, fieldState }) => (
                              <InputText id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                      )} />
                    <label htmlFor="username" className={classNames({ 'p-error': errors.name })}>Email*</label>
                </span>
                {getFormErrorMessage('username')}
            </div>
            <div className="p-field p-col-12">
              <span className="p-float-label">
                    <Controller name="password" control={control} rules={{ required: 'Zaporka je obavezna.' }} 
                      render={({ field, fieldState }) => (
                        <Password id={field.name} {...field} toggleMask className={classNames({ 'p-invalid': fieldState.invalid })} />
                    )} />
                    <label htmlFor="password" className={classNames({ 'p-error': errors.password })}>Zaporka*</label>
                </span>
                {getFormErrorMessage('password')}
            </div>
            
            <div className="p-col-12 p-d-flex p-jc-center">
                  <div>
                      <Button type="submit" label="Prijavi se" className="p-mt-2"/>
                  </div>
              </div>
        </form>
      </Card>
    </div>
    )
}

export default Login;