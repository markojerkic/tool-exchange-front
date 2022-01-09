import React, { useContext, useRef, useState } from "react";
import { Card } from "primereact/card";
import 'primeflex/primeflex.css'
import { Controller, useForm } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { useHistory } from 'react-router-dom';
import { ToastContext } from "../../common/toast.context";
import { classNames } from 'primereact/utils';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber'
import { Slider } from 'primereact/slider'
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from 'primereact/fileupload';
import { InputSwitch } from 'primereact/inputswitch';
import '../new-entry/fade-animation.css';
import Stepper from '../stepper/Stepper'
import AdService from "../../service/ads/ad.service";
import { InputMask } from "primereact/inputmask";
import ImageService from "../../service/image.service";



const HomeFilter = () => {

    const defaultValues = {
        titleSearch: '',
        condition: null,
        electric: null,
        hasBattery: null,
        maxRange: 30,
        minPower: 0,
        maxPower: 5000
    }


    const [loading, setLoading] = useState(false);

    const [filters, setFilters] = useState([])
    const { control, formState: { errors }, handleSubmit, reset, setValue } = useForm({ defaultValues });
    const history = useHistory();
    const { toastRef } = useContext(ToastContext);

    const onSubmit = (data) => {
        setLoading(true);

        let filters = {
            titleContains: data.titleContains,
            condition: data.condition,
            maxRange: data.maxRange,
            electric: data.electric,
            powerMin: data.powerMin,
            powerMax: data.powerMax,
            hasBattery: data.hasBattery,
        }

        history.push('/?' + filters.titleContains);
        setLoading(false);

    }

    return (

        <Card className="card-container" title="Filtriraj rezultate">
            <form onSubmit={handleSubmit(onSubmit)} className="grid p-fluid p-formgrid form-layout">

                <div className="p-field col-12 md:col-6 lg:col-6 sm:col-12">
                    <span className='p-float-label'>
                        <InputText type="text"
                            autoResize />
                        <label htmlFor='float-input'>Naziv ili opis</label>
                    </span>
                </div>

                Snaga:

                <div className="flex justify-content-center m-6">
                    <InputNumber value={null}
                        size={5}
                        onChange={(e) => { }}
                        suffix=" W"
                    />
                    <h5>
                        do
                    </h5>
                    <InputNumber value={null}
                        size={5}
                        onChange={(e) => { }}
                        suffix=" W"
                    />
                </div>

                <div className="flex justify-content-left m-3">
                    <h5>
                        Radijus pretrage:
                    </h5>
                    <InputNumber value={defaultValues.maxRange}
                        size={5}
                        suffix=" km"
                    />
                </div>

                <div className="p-field col-15 md:col-6 lg:col-6 sm:col-12">
                    <h5>Snaga: {defaultValues.minPower} W - {defaultValues.maxPower} W</h5>
                    <Slider
                        value={[defaultValues.minPower, defaultValues.maxPower]}

                        range={true}
                        style={{ width: '14em' }}
                        min={0}
                        step={100}
                        max={5000}
                    />
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
