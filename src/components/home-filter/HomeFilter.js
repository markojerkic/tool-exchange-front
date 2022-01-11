import React, {useEffect, useState} from "react";
import {Card} from "primereact/card";
import 'primeflex/primeflex.css'
import {Controller, useForm} from 'react-hook-form';
import {InputText} from 'primereact/inputtext';
import {classNames} from 'primereact/utils'
import {Button} from 'primereact/button';
import {Slider} from 'primereact/slider'
import {Dropdown} from "primereact/dropdown";
import {InputSwitch} from 'primereact/inputswitch';
import '../new-entry/fade-animation.css';
import './HomeFilter.css';

const HomeFilter = ({onFilter}) => {

    const defaultValues = {
        title: '',
        maxRange: 40,
        electric: null,
        nonelectric: null,
        hasBattery: null,
        power: [0, 5000],
        condition: null
    }

    const initialConditions = [
        { name: 'Novo', value: 'NEW' },
        { name: 'Rabljeno', value: 'USED' },
        { name: 'Neispravno/Oštećeno', value: 'DAMAGED' }
    ];

    const [loading] = useState(false);
    const { control, formState: { errors }, handleSubmit, reset, watch } = useForm({ defaultValues });
    const [electric, setElectric] = useState(false);

    const onSubmit = (data) => {
        onFilter({...data, ...(!electric && {power: undefined}), ...(electric && {
                power: undefined, minPower: data.power[0], maxPower: data.power[1]
            })});
    }

    useEffect(() => {
        // watch(onSubmit);
    }, [watch]);

    return (

        <Card className="card-container" title="Filtriraj rezultate">

            <div className="p-grid p-dir-col">

                <form onSubmit={handleSubmit(onSubmit)} id="markoJeBog" className="grid p-fluid p-formgrid form-layout">

                    <div className="p-field sm:col-6 md:col-6 lg:col-12 xl:col-12 col-12">
                        <span className="p-float-label">
                            <Controller name="title" control={control}
                                render={({ field, fieldState }) => (
                                    <InputText id={field.title} {...field}
                                       tooltip="Filtriranje po nazivu ili opisu"
                                        className="max-w-full"
                                        type="text" />
                                )} />
                            <label htmlFor="title" className={classNames({ 'p-error': errors.title })}>Pretraga</label>
                        </span>
                    </div>

                    <div className="p-field sm:col-6 md:col-6 lg:col-12 xl:col-12 col-12">
                        <Controller name="maxRange" control={control} defaultValue={defaultValues.maxRange}
                            render={({ field, fieldState }) => (
                                <div >
                                    <h4>Radijus pretrage: {field.value === 0 ? "1 km" : field.value === 10 ? "2 km" : field.value === 20 ? "5 km" : field.value === 30 ? "10 km" : field.value === 40 ? "20 km" : field.value === 50 ? "50 km" : field.value === 60 ? "100 km" : field.value === 70 ? "200 km" : "Sve"} </h4>
                                    <Slider className="mb-3 mx-3" value={field.value} onChange={(e) => field.onChange(e.value)} min={0} max={80} step={10} />
                                </div>
                            )} />
                    </div>

                    <div className="p-field sm:col-6 md:col-6 lg:col-12 xl:col-12 col-12">
                        <Controller name="nonelectric" control={control}
                            render={({ field, fieldState }) => (
                                <div className="p-field-checkbox mb-2 flex align-items-center">
                                    <h4 className="inline"> Neelektričan</h4>
                                    <InputSwitch id={field.name} {...field} inputId={field.name}
                                                 onChange={(e) => field.onChange(e.value)}
                                                 checked={field.value} className="ml-2" />
                                </div>
                            )} />
                    </div>

                    <div className="p-field sm:col-6 md:col-6 lg:col-12 xl:col-12 col-12">
                        <Controller name="electric" control={control}
                            render={({ field, fieldState }) => (
                                <div className="p-field-checkbox mb-3 flex align-items-center">
                                    <h4 className="inline"> Električan</h4>
                                    <InputSwitch id={field.name} {...field} inputId={field.name} onChange={(e) => {
                                        field.onChange(e.value);
                                        setElectric(e.value);
                                    }}
                                    className="ml-2"
                                        checked={field.value} />
                                </div>
                            )} />
                    </div>

                    {electric &&

                        <div className="p-field sm:col-6 md:col-6 lg:col-12 xl:col-12 col-12">
                            <hr />
                            <div className="p-col">
                                <Controller name="power" control={control} defaultValue={defaultValues.power}
                                    render={({ field, fieldState }) => (
                                        <div >
                                            <h4>Snaga: {field.value[0]} W - {field.value[1] === 5000 ? "max" : field.value[1] + " W"} </h4>
                                            <Slider className="mb-3 mx-3" value={field.value}
                                                    onChange={(e) => field.onChange(e.value)}
                                                    disabled={!electric}
                                                    range min={0} max={5000} step={100} />
                                        </div>
                                    )} />
                            </div>

                            <div className="p-field sm:col-6 md:col-6 lg:col-12 xl:col-12 col-12  flex align-items-center">
                                <h4 className="inline"> Ima bateriju</h4>
                                <Controller name="hasBattery" control={control} className='col'
                                    render={({ field, fieldState }) => (
                                        <InputSwitch id={field.name} disabled={!electric} inputId={field.name}
                                            onChange={(e) => field.onChange(e.value)}
                                            checked={field.value}
                                            className="ml-2"
                                        />
                                    )} />
                            </div>

                        </div>
                    }


                    <div className="p-field sm:col-6 md:col-6 lg:col-12 xl:col-12 col-12">
                        <Controller name="condition" control={control} defaultValue={defaultValues.condition}
                            render={({ field}) => (
                                <div className="mb-3" >
                                    <Dropdown value={field.value} options={initialConditions}
                                              onChange={(e) => field.onChange(e.value)} showClear
                                              optionLabel="name" placeholder="Stanje alata" />
                                </div>
                            )} />
                    </div>
                    <div className="sm:col-6 md:col-6 lg:col-12 xl:col-12 col-12 grid">
                        <div className="col-6">
                            <Button type="submit" label="Filtriraj" className="p-button-raised p-button-rounded mt-3"
                                    loading={loading} />
                        </div>
                        <div className="col-6">
                            <Button label="Očisti filtere" onClick={() => {
                                reset();
                                onSubmit({});
                            }}
                                    className="p-button-raised p-button-danger p-button-rounded mt-3"
                                    loading={loading} />
                        </div>
                    </div>

                </form>
            </div>

        </Card>

    )

}

export default HomeFilter;
