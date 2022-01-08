import React, {useEffect, useState, useContext} from "react";
import UserService from "../../service/user.service";
import {DataTable} from 'primereact/datatable';
import {Column} from "primereact/column";
import {ToastContext} from "../../common/toast.context";
import './UserList.css';
import {Button} from 'primereact/button';

const UserList = () => {
    const [blockReload, setBlockReload] = useState();
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
    }, [blockReload]);

    const statusBodyTemplate = (rowData) => {
        return (<span className={`badge status-${rowData.status.css}`}>{rowData.status.label}</span>);
    };

    const akcijaTempalte = (rowData) => {
        return (
            <span>
                {rowData.isDisabled ? <Button label="Odblokiraj" icon="pi pi-check" className="p-button-rounded p-button-success p-button-outlined"
                                              onClick={() => blockButton(rowData.id)} />
                                    : <Button label="Blokiraj" icon="pi pi-times" className="p-button-rounded p-button-danger p-button-outlined"
                                              onClick={() => blockButton(rowData.id)} />
                }
                {console.log(rowData)}
            </span>
        )
    }

    function blockButton(id){
        UserService.disableUser(id);
        setBlockReload(Math.random());
    }

    const rowExpansionTemplate = (data) => {
        return (
            <div className="orders-subtable">
                {console.log(data)}
                <DataTable value={[data]}>
                    <Column field="firstName" header="Ime"></Column>
                    <Column field="lastName" header="Prezime"></Column>
                    <Column field="formattedAddress" header="Adresa"></Column>
                </DataTable>
            </div>
        );
    }

    return (
        <DataTable value={usersData} expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}
                   rowExpansionTemplate={rowExpansionTemplate} dataKey="id" stripedRows>
            <Column field="id" header="Id"></Column>
            <Column field="username" header="Korisničko ime"></Column>
            <Column field="email" header="Email"></Column>
            <Column field="status" header="Status profila"body={statusBodyTemplate}></Column>
            <Column header="Akcija" body={akcijaTempalte}></Column>
            <Column expander style={{ width: '3em' }} />
        </DataTable>
    );

}

export default UserList;
