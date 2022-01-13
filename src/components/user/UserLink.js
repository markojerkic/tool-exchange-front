import checked from './check.png';
import './UserLink.css';
import {useHistory} from "react-router-dom";
import {Tooltip} from "primereact/tooltip";
import {Dialog} from "primereact/dialog";
import {useState} from "react";

const UserLink = ({username, isBest}) => {

	const history = useHistory();
	const [displayDialog, setDisplayDialog] = useState(false);

	return (
		<div className="ml-1 flex text-center align-items-start">
			<b className="font-italic clickable" onClick={() => history.push(`/user/${username}`)}>{username}</b>

			<Tooltip target=".best" />
			{	isBest &&
				<img className="ml-1 best" style={{cursor: 'pointer'}} data-pr-tooltip="Najmajstor"
					 onClick={() => setDisplayDialog(true)}
					src={checked} height="20px" width="20px"  alt="Verfied"/>
			}

			<Dialog header={`${username} je najmajstor`} visible={displayDialog}
					draggable={false}
					onHide={() => setDisplayDialog(false)}>
				Najmajstor je korisnik koji u periodu od prvoga do zadnjega dana prošloga mjeseca dobije najbolje ocjene
				drugih korisnika.
			</Dialog>
		</div>
	)
}

export default UserLink;
