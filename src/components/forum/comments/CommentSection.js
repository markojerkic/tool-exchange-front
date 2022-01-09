import React, {useEffect, useState, useContext} from "react";
import 'primeflex/primeflex.css'
import {useHistory} from 'react-router-dom';
import {useParams} from "react-router";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Paginator } from "primereact/paginator";
import Comment from "./Comment";
import CommentService from "../../../service/comment.service";
import { ToastContext } from "../../../common/toast.context";
import {Controller, useForm } from "react-hook-form";

const CommentSection = ({threadId}) => {
	const {id} = useParams(threadId);
    
    const defaultValues = {
		message: '',
        parentThread: { id: null }
	};
    
    const [loading, setLoading] = useState(false);

    const {toastRef} = useContext(ToastContext);

    const [totalComments, setTotalComments] = useState(0);
	const [offset, setOffset] = useState(0);
	const [comments, setComments] = useState([]);
    const [rows] = useState(10);

    const {control, formState: {errors}, handleSubmit, reset} = useForm({defaultValues});

	useEffect(() => {
		CommentService.getComments(offset / rows, rows, id).then((data) => {
			setTotalComments(data.totalElements);
			setComments(data.content);
		});
	}, [offset, rows, id]);

    const onSubmit = (data) => {

        let parentThreadId = {
            id: id
        }

        let podatci = {
            message: data.message,
            parentThread: parentThreadId
        }

		setLoading(true);
		CommentService.addNewComment(podatci).then((response) => {
			reset();
			setLoading(false);
			toastRef.current.show({severity: 'success', summary: 'Uspjeh', detail: 'Komentar spremljen'});
            window.location.reload();
		}, () => {
			setLoading(false);
			toastRef.current.show({severity: 'error', summary: 'Greška', detail: 'Greška prilikom spremanja komentara'});
		});
	}

	const history = useHistory();
	
	return (
		<div className="flex justify-content-center m-6">
            <Card className="card-container" title="Komentari" style={{width: '50rem'}}>
                <form onSubmit={handleSubmit(onSubmit)} className="grid p-fluid p-formgrid form-layout">
                    <div className="p-field col-12 lg:col-12 sm:col-12">
                    <Controller name="message" control={control}
										render={({field}) => (
											<InputTextarea id={field.name} {...field} type="text" rows={2} cols={60}
														   autoResize/>
										)}/>
                    </div>

                    <div className="p-field col-4 lg:col-4 sm:col-4">
                        <Button label="Dodaj komentar" loading={loading} />
                    </div>
                </form>

            {
				comments?.map(com => {
					return <Comment key={com.id} com={com}/>
				})
			}

            <div className="m-3">

			<Paginator rows={rows} first={offset} totalRecords={totalComments}
					   onPageChange={(event) => setOffset(event.first)} />
            </div>
            </Card>
            
        </div>
	)
}
export default CommentSection;
