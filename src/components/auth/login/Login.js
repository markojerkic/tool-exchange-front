import 'primeflex/primeflex.css';
import {Button} from 'primereact/button';
import {Card} from 'primereact/card';
import {InputText} from 'primereact/inputtext';
import {Password} from 'primereact/password';
import {classNames} from 'primereact/utils';
import {React, useContext, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useHistory} from 'react-router-dom';
import '../containers.css';
import AuthService from "../../../service/auth/auth.service";
import {AuthContext} from "../../../common/auth.context";
import {ToastContext} from "../../../common/toast.context";

const Login = () => {
  const {setUser} = useContext(AuthContext);
  const toastRef = useContext(ToastContext);
  const [loading, setLoading] = useState(false);

  const [, setFormData] = useState({});
  const defaultValues = {
    username: '',
    password: ''
  }
  const { control, formState: { errors }, handleSubmit, setError, reset } = useForm({ defaultValues });
  const history = useHistory();

  const onSubmit = (data) => {
    setLoading(true);
    setFormData(data);
    AuthService.login(data, setUser).then(() => {
      reset();
      history.push('/user');
      setLoading(false);
    }, (error) => {
        setLoading(false);
        if (error.response.data.status !== 400) {
          toastRef.current.show({severity:'error', summary: 'Greška', detail:error.response.data.message});
        } else {
          setError("username", {type: "manual", message: "Korisničko ime možda nije ispravno"});
          setError("password", {type: "manual", message: "Zaporka možda nije ispravna"});
        }
    });
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
                                rules={{ required: 'Korisničko ime je obavezno.'}}
                                render={({ field, fieldState }) => (
                                    <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} type="text" />
                                )} />
                    <label htmlFor="username" className={classNames({ 'p-error': errors.username })}>Korisničko ime*</label>
                </span>
                {getFormErrorMessage('username')}
            </div>
            <div className="p-field p-col-12">
              <span className="p-float-label">
                    <Controller name="password" control={control} rules={{ required: 'Zaporka je obavezna.' }} 
                      render={({ field, fieldState }) => (
                        <Password id={field.name} {...field} toggleMask
                                  className={classNames({ 'p-invalid': fieldState.invalid })}
                                  feedback={false}
                        />
                    )} />
                    <label htmlFor="password" className={classNames({ 'p-error': errors.password })}>Zaporka*</label>
                </span>
                {getFormErrorMessage('password')}
            </div>
            
            <div className="p-col-12 p-d-flex p-jc-center">
                  <div>
                      <Button type="submit" label="Prijavi se" className="p-mt-2"
                        loading={loading}/>
                  </div>
              </div>
        </form>
      </Card>
    </div>
    )
}

export default Login;
