import React, { useContext, useRef, useState } from "react";
import { Card } from "primereact/card";
import 'primeflex/primeflex.css'
import { Controller, useForm } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { useHistory } from 'react-router-dom';
import { ToastContext } from "../../common/toast.context";
import { classNames } from 'primereact/utils'
import { Button } from 'primereact/button';
import { Slider } from 'primereact/slider'
import { Dropdown } from "primereact/dropdown";
import { InputSwitch } from 'primereact/inputswitch';
import '../new-entry/fade-animation.css';
import FilterService from "../../service/filter/filter.service";
import { Checkbox } from 'primereact/checkbox';

const HomeFilter = () => {

    const defaultValues = {
        titleContains: '',
        maxRange: 40,
        electric: null,
        nonelectric: null,
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
            nonelectric: data.nonelectric,
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

                <form onSubmit={handleSubmit(onSubmit)} id="markoJeBog" className="p-grid p-dir-col">

                    <div className="p-col">
                        <span className="p-float-label">
                            <Controller name="titleContains" control={control}
                                render={({ field, fieldState }) => (
                                    <InputText id={field.titleContains} {...field}

                                        className="max-w-full"
                                        type="text" />
                                )} />
                            <label htmlFor="titleContains" className={classNames({ 'p-error': errors.title })}>Filtriranje po nazivu ili opisu</label>
                        </span>
                    </div>
                    <div className="p-col">

                        <Controller name="maxRange" control={control} defaultValue={defaultValues.maxRange}
                            render={({ field, fieldState }) => (

                                <div >
                                    <h4>Radijus pretrage: {field.value === 0 ? "1 km" : field.value === 10 ? "2 km" : field.value === 20 ? "5 km" : field.value === 30 ? "10 km" : field.value === 40 ? "20 km" : field.value === 50 ? "50 km" : field.value === 60 ? "100 km" : field.value === 70 ? "200 km" : "Sve"} </h4>
                                    <Slider className="mb-3 mx-3" value={field.value} onChange={(e) => field.onChange(e.value)} min={0} max={80} step={10} />
                                </div>
                            )} />
                    </div>

                    <div className="p-col">
                        <Controller name="nonelectric" control={control}
                            render={({ field, fieldState }) => (
                                <div className="p-field-checkbox mb-2">
                                    <h4 className="inline"> Neelektričan</h4>
                                    <Checkbox id={field.name} {...field} inputId={field.name} onChange={(e) => field.onChange(e.checked)}
                                        checked={field.value} className="ml-2" />
                                </div>
                            )} />
                    </div>

                    <div className="p-col">
                        <Controller name="electric" control={control}
                            render={({ field, fieldState }) => (
                                <div className="p-field-checkbox mb-3">
                                    <h4 className="inline"> Električan</h4>
                                    <Checkbox id={field.name} {...field} inputId={field.name} onChange={(e) => {
                                        field.onChange(e.checked);
                                        setElectric(e.checked);
                                    
                                    }}
                                    className="ml-2"
                                        checked={field.value} />
                                </div>
                            )} />
                    </div>

                    {electric &&

                        <div className="p-col mb-3" id="animDiv">
                            <hr ></hr>
                            <div className="p-col">
                                <Controller name="power" control={control} defaultValue={defaultValues.power}
                                    render={({ field, fieldState }) => (

                                        <div >
                                            <h4>Snaga: {field.value[0]} W - {field.value[1] == 5000 ? "max" : field.value[1] + " W"} </h4>
                                            <Slider className="mb-3 mx-3" value={field.value} onChange={(e) => field.onChange(e.value)} range min={0} max={5000} step={100} />
                                        </div>
                                    )} />
                            </div>

                            <div className="p-col">
                                <h4 className="inline"> Ima bateriju</h4>
                                <Controller name="hasBattery" control={control} className='col'
                                    render={({ field, fieldState }) => (
                                        <InputSwitch id={field.name} inputId={field.name}
                                            onChange={(e) => field.onChange(e.value)}
                                            checked={field.value}
                                            className="ml-2"
                                        />
                                    )} />
                            </div>

                        </div>
                    }


                    <div className="p-col">
                        <Controller name="condition" control={control} defaultValue={defaultValues.condition}
                            render={({ field, fieldState }) => (
                                <div className="mb-3" >
                                    <Dropdown value={field.value} options={initialConditions} onChange={(e) => field.onChange(e.value)} showClear optionLabel="name" placeholder="Stanje alata" />
                                </div>
                            )} />
                    </div>
                    <div className="p-col justify-content-center">
                        <div>
                            <Button type="submit" label="Filtriraj" className="p-button-raised p-button-rounded mt-3"
                                loading={loading} />

                        </div>

                    </div>

                </form>
            </div>

        </Card>

    )

}

export default HomeFilter;
