import React, {useEffect, useState, useContext} from "react";
import UserService from "../service/user.service";
import {DataTable} from 'primereact/datatable';
import {Column} from "primereact/column";
import {ToastContext} from "../common/toast.context";
import './offer/OfferList.css';

const UserList = () => {
    const [usersData, setUsersData] = useState([]);
    const [expandedRows, setExpandedRows] = useState(null);
    const {toastRef} = useContext(ToastContext);

    useEffect(() => {
        UserService.getUsers().then((users) => {
            // const data = users.map((e) => {
            //     return {
            //         ...e,
            //         status: e.isDisabled ? "Blokiran" : "Nije blokiran"
            //     }
            // })
            setUsersData(users);
        });
    }, []);

    const disabledStatusBodyTemplate = (rowData) => {
        return rowData.isDisabled ? <span className="badge status-rejected">Blokiran</span> : <span className="badge status-accepted">Nije blokiran</span>;
    }

    const rowExpansionTemplate = (data) => {
        return (
            <div className="orders-subtable">
                <DataTable value={[data]}>
                    <Column field="id" header="Id"></Column>
                    <Column field="firstName" header="Ime"></Column>
                    <Column field="lastName" header="Prezime"></Column>
                    <Column field="formattedAddress" header="Adresa"></Column>
                </DataTable>
            </div>
        );
    }

    return (
        <DataTable value={usersData} expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}
                   rowExpansionTemplate={rowExpansionTemplate} dataKey="id">
            <Column expander style={{ width: '3em' }} />
            <Column field="username" header="Korisničko ime"></Column>
            <Column field="email" header="Email"></Column>
            <Column header="Blokiran"> body={disabledStatusBodyTemplate}</Column>
        </DataTable>
    );

}

export default UserList;
