import React, { useContext, useRef, useState } from "react";
import { Card } from "primereact/card";
import 'primeflex/primeflex.css'
import { Controller, useForm } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { useHistory } from 'react-router-dom';
import { ToastContext } from "../../common/toast.context";
import { classNames } from 'primereact/utils';
import { MultiSelect } from 'primereact/multiselect';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber'
import { Slider } from 'primereact/slider'
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from 'primereact/fileupload';
import { InputSwitch } from 'primereact/inputswitch';
import '../new-entry/fade-animation.css';
import Stepper from '../stepper/Stepper'
import FilterService from "../../service/filter/filter.service";



const HomeFilter = () => {

    const defaultValues = {
        titleContains: '',
        maxRange: 30,
        electric: null,
        hasBattery: null,
        power: [0, 5000],
        condition: null
    }

    const initialConditions = [
        { name: 'Novo', code: 'NEW' },
        { name: 'Rabljeno', code: 'USED' },
        { name: 'Neispravno/Oštećeno', code: 'DAMAGED' }
    ];


    const [loading, setLoading] = useState(false);
    const { control, formState: { errors }, handleSubmit, reset, setValue } = useForm({ defaultValues });
    const history = useHistory();
    const { toastRef } = useContext(ToastContext);
    const [electric, setElectric] = useState(false);

    const onSubmit = (data) => {
        setLoading(true);

        let filters = {
            titleContains: data.titleContains,
            maxRange: data.maxRange,
            condition: data.condition,
            electric: data.electric,
            power: data.power,
            hasBattery: data.hasBattery,
        }
        console.log(filters)
        FilterService.addFilter(filters).then((response) => {
            reset();
            history.push('/' + response.data.id);
            setLoading(false);
            toastRef.current.show({ severity: 'success', summary: 'Uspjeh', detail: 'Oglas napravljen' });
        }, () => {
            setLoading(false);
            toastRef.current.show({ severity: 'error', summary: 'Greška', detail: 'Greška prilikom slanja filtera' });
        });
    }

    return (

        <Card className="card-container" title="Filtriraj rezultate">
            <form onSubmit={handleSubmit(onSubmit)} className="grid p-fluid p-formgrid form-layout">

                <div>
                    <span className="p-float-label">
                        <Controller name="titleContains" control={control}
                            render={({ field, fieldState }) => (
                                <InputText id={field.titleContains} {...field}
                                    size={30}
                                    className={classNames({ 'p-invalid': fieldState.invalid })}
                                    type="text" />
                            )} />
                        <label htmlFor="titleContains" className={classNames({ 'p-error': errors.title })}>Pretraga po nazivu ili opisu</label>
                    </span>
                </div>

                <div className="p-field col-15 md:col-6 lg:col-6 sm:col-12">
                    <h5>
                        Radijus pretrage:
                    </h5>
                    <InputNumber value={defaultValues.maxRange}
                        size={5}
                        suffix=" km"
                    />
                </div>

                <div className="p-field col-15 md:col-6 lg:col-6 sm:col-12"></div>

                <div className="p-field col-15 md:col-6 lg:col-6 sm:col-12">

                    <Controller name="electric" control={control}
                        render={({ field, fieldState }) => (
                            <InputSwitch id={field.name} inputId={field.name}
                                onChange={(e) => {
                                    field.onChange(e.value);
                                    setElectric(e.value);
                                }}
                                checked={field.value}
                                className={classNames({ 'p-invalid': fieldState.invalid })} />
                        )} />
                    <label className='col' htmlFor="electric">Električan</label>
                </div>

                {electric &&

                    <div className="grid p-dir-col col-12 md:col-8 lg:col-8 sm:col-8" id="animDiv">
                        <div className="p-field col-15 md:col-6 lg:col-6 sm:col-12">

                            <Controller name="power" control={control} defaultValue={defaultValues.power}
                                render={({ field, fieldState }) => (

                                    <div>
                                        <h5>Snaga: {field.value[0]} W - {field.value[1]} W</h5>
                                        <Slider value={field.value} onChange={(e) => field.onChange(e.value)} range min={0} max={5000} step={100} />
                                    </div>
                                )} />
                        </div>
                        <div className='p-field grid p-dir-col ml-2'>
                            <Controller name="hasBattery" control={control} className='col'
                                render={({ field, fieldState }) => (
                                    <InputSwitch id={field.name} inputId={field.name}
                                        onChange={(e) => field.onChange(e.value)}
                                        checked={field.value}
                                        className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                            <label className='col' htmlFor="hasBattery">Ima bateriju</label>
                        </div>
                    </div>

                }

                <div className="p-field col-15 md:col-6 lg:col-6 sm:col-12"></div>

                <div className="p-field col-15 md:col-6 lg:col-6 sm:col-12">
                    <Controller name="condition" control={control} defaultValue={defaultValues.condition}
                        render={({ field, fieldState }) => (
                            <div>
                                <h5>Stanje alata</h5>
                                <MultiSelect value={field.value} options={initialConditions} maxSelectedLabels={2} selectedItemsLabel=" Ozanačena 3 stanja" onChange={(e) => field.onChange(e.value)} optionLabel="name" placeholder="Stanje" />
                            </div>
                        )} />
                </div>
                <div className="col-12 flex justify-content-center">
                    <div>
                        <Button type="submit" label="Filtriraj" className="mt-2"
                            loading={loading} />
                    </div>

                </div>

            </form>

        </Card>

    )

}

export default HomeFilter;
