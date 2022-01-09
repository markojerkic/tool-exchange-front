import React, {useEffect, useState} from "react";
import UserService from "../../service/user.service";
import {DataTable} from 'primereact/datatable';
import {Column} from "primereact/column";
//import {ToastContext} from "../../common/toast.context";
import './UserList.css';
import {Button} from 'primereact/button';

const UserList = () => {
    const [blockReload, setBlockReload] = useState();
    const [usersData, setUsersData] = useState([]);
    const [expandedRows, setExpandedRows] = useState(null);
    const [lastFilters, setLastFilters] = useState();
    //const {toastRef} = useContext(ToastContext);

    const mapStatus = (userStatus) => {
        if(userStatus)
            return {label: 'BLOKIRAN', css: 'blocked'};
        else
            return {label: 'NORMALAN', css: 'normal'};

    };

    const onFilter = (filters) => {
        setLastFilters(filters.filters);
    }

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
    }, [blockReload, lastFilters]);

    const statusBodyTemplate = (rowData) => {
        return (<span className={`badge status-${rowData.status.css}`}>{rowData.status.label}</span>);
    };

    const akcijaTempalte = (rowData) => {
        return (
            <span>
                {rowData.isDisabled ? <Button label="Odblokiraj" icon="pi pi-check" className="p-button-rounded p-button-success p-button-outlined"
                                              onClick={ () => blockButton(rowData.id) } />
                                    : <Button label="Blokiraj" icon="pi pi-times" className="p-button-rounded p-button-danger p-button-outlined"
                                              onClick={ () => blockButton(rowData.id) } />
                }
            </span>
        )
    }

    function blockButton(id){
        UserService.disableUser(id).then(() => reload())
    }

    function reload(){
        setBlockReload(Math.random());
    }

    const rowExpansionTemplate = (data) => {
        return (
            <div className="orders-subtable">
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
                   rowExpansionTemplate={rowExpansionTemplate} dataKey="id" stripedRows
                   sortField="username" sortOrder={1} onFilter={onFilter} filters={lastFilters} filterDisplay="menu">
            <Column sortable field="id" header="Id"></Column>
            <Column filter sortable field="username" header="Korisničko ime"></Column>
            <Column field="email" header="Email"></Column>
            <Column sortable field="status" header="Status profila"body={statusBodyTemplate}></Column>
            <Column header="Akcija" body={akcijaTempalte}></Column>
            <Column header="Osobni podatci" expander style={{ width: '10em' }} />
        </DataTable>
    );
}

export default UserList;
