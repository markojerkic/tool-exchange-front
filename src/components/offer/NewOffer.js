import {Controller, useForm} from "react-hook-form";
import {classNames} from "primereact/utils";
import React, {useContext, useState} from "react";
import {ToastContext} from "../../common/toast.context";
import {InputTextarea} from "primereact/inputtextarea";
import {Calendar} from "primereact/calendar";
import {Button} from "primereact/button";
import OfferService from "../../service/offer.service";

const NewOffer = ({advertId, onComplete}) => {

	const {control, formState: {errors}, handleSubmit} = useForm();
	const {toastRef} = useContext(ToastContext);
	const [loading, setLoading] = useState(false);
	const getFormErrorMessage = (name) => {
		return errors[name] && <small className="p-error">{errors[name].message}</small>
	};

	const onSubmit = (data) => {
		const postBody = {
			...data,
			advert: {
				id: advertId
			}
		}
		setLoading(true);
		OfferService.addNewOffer(postBody).finally(() => setLoading(false)).then(() => {
			onComplete();
			toastRef.current.show({severity: 'success', summary: 'Uspjeh', detail: 'Ponuda poslana'});
		}).catch(() => {
			toastRef.current.show({severity: 'error', summary: 'Greška', detail: 'Greška prilikom slanja ponude'});
		});
	};

	return (

		<form onSubmit={handleSubmit(onSubmit)} style={{width: '30rem'}}
			  className="grid p-fluid p-formgrid form-layout flex justify-content-center">
			<h2 className="blue-title">Unesite svoju ponudu</h2>
			<div className="p-field col-12">
				<label htmlFor="suggestedTimeframe"
					   className={classNames({'p-error': errors.description})}>Predloženo vrijeme povratka alata</label>
				<Controller name="suggestedTimeframe" control={control} rules={{required: 'Datum povratka je obavezan'}}
							render={({field, fieldState}) => (
								<Calendar id={field.name} {...field} inline
										  onChange={(e) => field.onChange(e.value)}
										  disabled={loading}
										  dateFormat="dd.mm.yy."/>
							)}/>
				{getFormErrorMessage('suggestedTimeframe')}
			</div>
			<div className="p-field col-12 mt-4">
                        <span className="p-float-label">
                            <Controller name="message" control={control}
										render={({field, fieldState}) => (
											<InputTextarea id={field.name} {...field}
														   rows={3} autoResize
														   disabled={loading}
														   type="text"/>
										)}/>

                                    <label htmlFor="message"
										   className={classNames({'p-error': errors.description})}>Poruka</label>
                        </span>
				{getFormErrorMessage('location')}
			</div>

			<Button label="Predaj ponudu" disabled={loading} loading={loading} type="submit"/>
		</form>
	);
}

export default NewOffer;
