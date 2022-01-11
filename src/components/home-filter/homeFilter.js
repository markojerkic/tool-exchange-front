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
import { Divider } from 'primereact/divider';


const HomeFilter = () => {

    const defaultValues = {
        titleContains: '',
        maxRange: 40,
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
            maxRange: data.maxRange == 0 ? 1 : data.maxRange == 10 ? 2 : data.maxRange == 20 ? 5 : data.maxRange == 30 ? 10 : data.maxRange == 40 ? 20 : data.maxRange == 50 ? 50 : data.maxRange == 60 ? 100 : data.maxRange == 70 ? 200 : 10000,
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

            <div className="p-grid p-dir-col">

                <form onSubmit={handleSubmit(onSubmit)} className="p-grid p-dir-col">

                    <div className="p-col">
                        <span className="p-float-label">
                            <Controller name="titleContains" control={control}
                                render={({ field, fieldState }) => (
                                    <InputText id={field.titleContains} {...field}

                                        className={classNames({ 'p-invalid': fieldState.invalid })}
                                        type="text" />
                                )} />
                            <label htmlFor="titleContains" className={classNames({ 'p-error': errors.title })}>Pretraga po nazivu ili opisu</label>
                        </span>
                    </div>
                    <div className="p-col">

                        <Controller name="maxRange" control={control} defaultValue={defaultValues.maxRange}
                            render={({ field, fieldState }) => (

                                <div>
                                    <h5>Radijus pretrage: {field.value == 0 ? "1 km" : field.value == 10 ? "2 km" : field.value == 20 ? "5 km" : field.value == 30 ? "10 km" : field.value == 40 ? "20 km" : field.value == 50 ? "50 km" : field.value == 60 ? "100 km" : field.value == 70 ? "200 km" : "Sve"} </h5>
                                    <Slider value={field.value} onChange={(e) => field.onChange(e.value)} min={0} max={80} step={10} />
                                </div>
                            )} />
                    </div>
                    <div className="p-col">

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

                        <div className="p-col" id="animDiv">
                            <div className="p-col">
                                <Controller name="power" control={control} defaultValue={defaultValues.power}
                                    render={({ field, fieldState }) => (

                                        <div>
                                            <h5>Snaga: {field.value[0]} W - {field.value[1] == 5000 ? "max" : field.value[1] + " W"} </h5>
                                            <Slider value={field.value} onChange={(e) => field.onChange(e.value)} range min={0} max={5000} step={100} />
                                        </div>
                                    )} />
                            </div>
                            <div className="p-col">
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


                    <div className="p-col">
                        <Controller name="condition" control={control} defaultValue={defaultValues.condition}
                            render={({ field, fieldState }) => (
                                <div>
                                    <h5>Stanje alata</h5>
                                    <Dropdown value={field.value} options={initialConditions} onChange={(e) => field.onChange(e.value)} showClear optionLabel="name" placeholder="Stanje" />
                                </div>
                            )} />
                    </div>
                    <div className="p-col justify-content-center">
                        <div>
                            <Button type="submit" label="Filtriraj" className="mt-2"
                                loading={loading} />
                        </div>

                    </div>

                </form>
            </div>

        </Card>

    )

}

export default HomeFilter;
