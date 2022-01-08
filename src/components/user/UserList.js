import React, {useEffect, useState, useContext} from "react";
import UserService from "../../service/user.service";
import {DataTable} from 'primereact/datatable';
import {Column} from "primereact/column";
import {ToastContext} from "../../common/toast.context";
import './UserList.css';

const UserList = () => {
    const [usersData, setUsersData] = useState([]);
    const [expandedRows, setExpandedRows] = useState(null);
    const {toastRef} = useContext(ToastContext);

    const mapStatus = (userStatus) => {
        if(userStatus)
            return {label: 'BLOKIRAN', css: 'blocked'};
        else
            return {label: 'NORMALAN', css: 'normal'};

    };

    useEffect(() => {
        UserService.getUsers().then((users) => {
            const data = users.content.map((e) => {
                return {
                    ...e,
                    status: mapStatus(e.isDisabled)
                }
            });
            setUsersData(data);
        });
    }, []);

    const statusBodyTemplate = (rowData) => {
        return (
            <span className={`badge status-${rowData.status.css}`}>{rowData.status.label}</span>
        );
    };

    const rowExpansionTemplate = (data) => {
        return (
            <div className="orders-subtable">
                {console.log(data)}
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
            <Column field="status" header="Blokiran"> body={statusBodyTemplate}</Column>
        </DataTable>
    );

}

export default UserList;
