import React, {useContext, useEffect, useState} from "react";
import UserService from "../../service/user.service";
import {DataTable} from 'primereact/datatable';
import {Column} from "primereact/column";
import './UserList.css';
import {Button} from 'primereact/button';
import {ToastContext} from "../../common/toast.context";
import {Dropdown} from "primereact/dropdown";

const UserList = () => {
    const [blockReload, setBlockReload] = useState();
    const [usersData, setUsersData] = useState([]);
    const [expandedRows, setExpandedRows] = useState();
    const [lastFilters, setLastFilters] = useState();
    const [loading, setLoading] = useState(false);
    const [rows] = useState(10);
    const [offset, setOffset] = useState(0);
    const [sort, setSort] = useState(-1);
    const [sortOrder, setSortOrder] = useState('DESC');
    const [sortField, setSortField] = useState('id');
    const [isDisabling, setIsDisabling] = useState(false);
    const [totalUsers, setTotalUsers] = useState(0);

    const {toastRef} = useContext(ToastContext);

    const statuses = [
        {
            label: 'Aktivan', value: false, css: 'normal'
        },
        {
            label: 'Deaktiviran', value: true, css: 'blocked'
        }
    ]

    const mapStatus = (userStatus) => {
        if (userStatus)
            return {label: 'BLOKIRAN', css: 'blocked'};
        else
            return {label: 'NORMALAN', css: 'normal'};

    };

    const onFilter = (filters) => {
        setLastFilters(filters.filters);
    }

    useEffect(() => {
        setLoading(true);
        UserService.getUsers(offset / rows, rows, lastFilters, `${sortField},${sortOrder}`)
            .then((users) => {
                const data = users.content.map((e) => {
                    return {
                        ...e,
                        status: mapStatus(e.isDisabled)
                    }
                });
                setTotalUsers(users.totalElements);
                setUsersData(data);
        }).catch((err) => {
            if (err.forbidden) {
                toastRef.current.show({
                    severity: 'warn',
                    summary: 'Nemate prava',
                    detail: 'Nemate potrebna prava za tu akciju'
                });
            }
        }).finally(() => setLoading(false));
    }, [blockReload, lastFilters, toastRef, offset, rows, sortField, sortOrder]);

    const statusBodyTemplate = (rowData) => {
        return (<span className={`badge status-${rowData.status.css}`}>{rowData.status.label}</span>);
    };

    const actionTemplate = (rowData) => {
        return (
            <span>
                {rowData.isDisabled ?
                    (<Button label="Odblokiraj" loading={isDisabling} icon="pi pi-check"
                             className="p-button-rounded p-button-success p-button-outlined"
                             onClick={() => blockButton(rowData.id)}/>) :
                    (<Button label="Blokiraj" loading={isDisabling} icon="pi pi-times"
                             className="p-button-rounded p-button-danger p-button-outlined"
                             onClick={() => blockButton(rowData.id)}/>)
                }
            </span>
        )
    }

    const blockButton = (id) => {
        setIsDisabling(true);
        UserService.disableUser(id).finally(() => setIsDisabling(false)).catch((err) => {
            if (err.forbidden) {
                toastRef.current.show({
                    severity: 'warn',
                    summary: 'Nemate prava',
                    detail: 'Nemate potrebna prava za tu akciju'
                });
            }
        }).then(() => reload());
    }

    const reload = () => {
        setBlockReload(Math.random());
    }

    const rowExpansionTemplate = (data) => {
        return (
            <div className="orders-subtable">
                <DataTable value={[data]}>
                    <Column field="firstName" header="Ime"/>
                    <Column field="lastName" header="Prezime"/>
                    <Column field="formattedAddress" header="Adresa"/>
                </DataTable>
            </div>
        );
    }

    const onPage = ({first}) => {
        setOffset(first);
    }

    const onSort = (srtField) => {
        setSort(sort === -1 ? 1 : -1);
        setSortOrder(sort === 1 ? 'DESC' : 'ASC');
        setSortField(srtField.sortField);
    }

    const statusFiltersTemplate = (options) => {
        return (
            <Dropdown options={statuses}
                      placeholder='Odaberite status'
                      value={options.value}
                      onChange={(e) => options.filterApplyCallback(e.value)}/>
        );
    }

    return (
        <DataTable value={usersData} expandedRows={expandedRows}
                   loading={loading} lazy rows={rows} onPage={onPage} onFilter={onFilter}
                   onRowToggle={(e) => setExpandedRows(e.data)}
                   paginator={true} emptyMessage="Korisnici nisu pronađeni"
                   sortOrder={sort} onSort={onSort}
                   globalFilterFields={['username', 'id', 'isBlocked', 'email']}
                   totalRecords={totalUsers}
                   rowExpansionTemplate={rowExpansionTemplate} dataKey="id" stripedRows
                   responsiveLayout="stack" breakpoint='960px'
                   sortField={sortField} filters={lastFilters} filterDisplay="row">
            <Column sortable field="id" header="Id"/>
            <Column filter sortable field="username" filterPlaceholder="Pretražite po korisničkom imenu"
                    header="Korisničko ime" showFilterMenu={false}/>
            <Column filter showFilterMenu={false} field="email" filterPlaceholder="Pretražite po e-pošti"
                    header="Email"/>
            <Column field="isBlocked" filter
                    showClear={false}
                    showFilterMenu={false}
                    filterElement={statusFiltersTemplate}
                    filterPlaceholder='Odaberite status'
                    header="Status profila"
                    body={statusBodyTemplate}/>
            <Column header="Akcija" body={actionTemplate}/>
            <Column header="Osobni podatci" expander style={{width: '10em'}}/>
        </DataTable>
    );
}

export default UserList;
