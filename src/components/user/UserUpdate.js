import React, {useContext, useEffect, useState} from "react";
import {Card} from "primereact/card";
import AuthService from "../../service/auth/auth.service";
import {Button} from "primereact/button"
import {InputText} from "primereact/inputtext";
import UserService from "../../service/user.service";
import {useHistory} from "react-router-dom";
import {Controller, useForm} from "react-hook-form";
import {classNames} from "primereact/utils";
import {ToastContext} from "../../common/toast.context";


const UserUpdate = () => {

    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const {toastRef} = useContext(ToastContext);

    const {control, formState: {errors}, handleSubmit, setValue } = useForm({});

    useEffect(() => {
        AuthService.getCurrentLoggedInUser().then((user) => {
            setValue('firstName', user.firstName);
            setValue('lastName', user.lastName);
            setValue('id', user.id);
        })
    }, [setValue]);

    const updateUser = (data) => {
        setLoading(true);
        UserService.updateUser(data).then(() => {
            history.push('/user');
            setLoading(false);
        }).catch(() => {
            toastRef.current.show({severity: 'error', summary: 'Greška', message: 'Greška prilikom ažuriranja'});
        })
    };

    return (
        <div className="flex justify-content-center m-4">
            <Card className="card-container" title="Promjena osobnih informacija">
                <form onSubmit={handleSubmit(updateUser)} className="grid p-fluid p-formgrid form-layout">
                    <div className="p-field col-12">
                        <span className="p-float-label">
                            <Controller name="firstName" control={control}
                                        rules={{required: 'Ime je obavezno.'}}
                                        render={({field, fieldState}) => (
                                            <InputText id={field.name} {...field} autoFocus
                                                       className={classNames({'p-invalid': fieldState.invalid})} type="text"/>
                                        )}/>
                            <label htmlFor="firstName"
                                   className={classNames({'p-error': errors.username})}>Ime *</label>
                        </span>
                    </div>
                    <div className="p-field col-12 mt-2">
                        <span className="p-float-label">
                            <Controller name="lastName" control={control}
                                        rules={{required: 'Prezime je obavezno.'}}
                                        render={({field, fieldState}) => (
                                            <InputText id={field.name} {...field} autoFocus
                                                       className={classNames({'p-invalid': fieldState.invalid})} type="text"/>
                                        )}/>
                            <label htmlFor="lastName"
                                   className={classNames({'p-error': errors.username})}>Prezime *</label>
                        </span>
                    </div>

                    <div className="col-12 flex justify-content-center">
                        <div>
                            <Button type="submit" label="Ažuriraj podatke" className="mt-2" loading={loading}/>
                        </div>
                    </div>
                </form>
            </Card>
        </div>
    )
}

export default UserUpdate;
