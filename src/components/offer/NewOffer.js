import {Controller, useForm} from "react-hook-form";
import {classNames} from "primereact/utils";
import React, {useContext} from "react";
import {ToastContext} from "../../common/toast.context";
import {InputTextarea} from "primereact/inputtextarea";
import {Calendar} from "primereact/calendar";
import {Button} from "primereact/button";

const NewOffer = () => {

	const {control, formState: {errors}, handleSubmit} = useForm();
	const toastRef = useContext(ToastContext);
	const getFormErrorMessage = (name) => {
		return errors[name] && <small className="p-error">{errors[name].message}</small>
	};

	const onSubmit = (data) => {
		console.log(data);
		// toastRef.current.show({severity: 'succes', message: 'Predano'})
	};

	return (

		<form onSubmit={handleSubmit(onSubmit)} style={{width: '30rem'}}
			  className="p-grid p-fluid p-formgrid form-layout p-d-flex p-jc-center">
			<h2>Unesite svoju ponudu</h2>
			<div className="p-field p-col-12">
				<label htmlFor="suggestedTimeframe"
					   className={classNames({'p-error': errors.description})}>Predloženo vrijeme povratka alata</label>
				<Controller name="suggestedTimeframe" control={control}
							render={({field, fieldState}) => (
								<Calendar id={field.name} {...field} inline
										  onChange={(e) => field.onChange(e.value)}
										  dateFormat="dd.mm.yy."/>
							)}/>
				{getFormErrorMessage('location')}
			</div>
			<div className="p-field p-col-12 p-mt-4">
                        <span className="p-float-label">
                            <Controller name="message" control={control}
										render={({field, fieldState}) => (
											<InputTextarea id={field.name} {...field}
														   rows={3} autoResize
														   type="text"/>
										)}/>

                                    <label htmlFor="message"
										   className={classNames({'p-error': errors.description})}>Poruka</label>
                        </span>
				{getFormErrorMessage('location')}
			</div>

			<Button label="Predaj ponudu" type="submit"/>
		</form>
	);
}

export default NewOffer;
