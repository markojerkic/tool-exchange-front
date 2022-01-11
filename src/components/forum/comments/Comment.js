import React from "react";
import 'primeflex/primeflex.css'
import Moment from 'moment';
import {Button} from "primereact/button";
import './Comment.css';
import CommentService from "../../../service/comment.service";
import {Badge} from "primereact/badge";

const Comment = ({comment, reload}) => {

	const toggleLike = () => {
		CommentService.likeComment({
			adviceId: comment.id,
			toggleAction: comment.isLikedByMe ? 'DISLIKE' : 'LIKE'
		}).then((count) => {
			reload(true);
		})
	}

	return (
		<div className="flex justify-content-center">
			<div className="comment flex flex-column justify-content-start">
				<h3>{comment.message}</h3>

				<div className="flex justify-content-between">
					<p>Objavio korisnik: <b>{comment.userCreated}</b></p>
					<p>Objavljeno datuma: <b>{Moment(comment.lastModified).format('DD.MM.yyyy.')}</b></p>
				</div>
				<div className="w-full flex justify-content-end align-items-center">
					{comment.numLikes > 0 &&
						<Badge value={comment.numLikes} severity="warning" className="mr-1"/>
					}
					<Button className={`p-button-rounded ${comment.isLikedByMe ? '' : 'p-button-text'}`}
							onClick={() => toggleLike()}
							icon="pi pi-thumbs-up p-text-secondary p-overlay-badge"/>
				</div>
			</div>
		</div>
	)
}

export default Comment;
