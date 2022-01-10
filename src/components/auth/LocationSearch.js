import {Controller, useForm} from "react-hook-form";
import {ToastContext} from "../../common/toast.context";
import {useContext, useState} from "react";
import {InputText} from "primereact/inputtext";
import {classNames} from "primereact/utils";
import LocationSearchService from "../../service/location/LocationSearchService";
import {ListBox} from "primereact/listbox";

const LocationSearch = (props) => {

	const toastRef = useContext(ToastContext);
	const [resultsLoading, setResultLoading] = useState(false);

	const [searchResults, setSearchResults] = useState([]);

	const {control, formState: {errors}, handleSubmit} = useForm();
	const onSubmit = (data) => {
		setResultLoading(true);
		LocationSearchService.searchLocations(data.location).finally(() => setResultLoading(false))
			.then(result => {
				const results = result.data.results;
				setSearchResults(results);
			})
			.catch(() => {
				toastRef.current.show({
					severity: 'error',
					summary: 'Greška',
					detail: 'Greška prilikom dohvata lokacija'
				});
			});
	}

	const getFormErrorMessage = (name) => {
		return errors[name] && <small className="p-error">{errors[name].message}</small>
	};

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)} className="grid p-fluid p-formgrid form-layout">
				<div className="p-field col-12">
                        <span className="p-float-label">
                            <Controller name="location" control={control} rules={{required: 'Lokacija je obacezna.'}}
										render={({field, fieldState}) => (
											<span className="p-input-icon-left">
												<i className={!resultsLoading ? 'pi pi-search' : 'pi pi-spin pi-spinner'}/>
												<InputText id={field.name} {...field} autoFocus
														   disabled={resultsLoading}
														   placeholder="Unesite lokaciju"
														   className={classNames({'p-invalid': fieldState.invalid})}
														   type="text"/>
											</span>
										)}/>
                        </span>
					{getFormErrorMessage('location')}
				</div>
			</form>

			{searchResults.length > 0 &&
				<ListBox options={searchResults} onChange={props.onValueChanged}
						 optionLabel="formatted_address"/>
			}
		</div>
	);

}

export default LocationSearch;
