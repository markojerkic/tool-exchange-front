import React, {useEffect, useState} from "react";
import {Card} from "primereact/card";
import AuthService from "../../service/auth/auth.service";
import {Button} from "primereact/button"
import {InputText} from "primereact/inputtext";
import UserService from "../../service/user.service";
import history from "../../common/history";


const UserUpdate = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        AuthService.getCurrentLoggedInUser().then((user) => {
            setFirstName(user.firstName);
            setLastName(user.lastName);
        })
    }, []);

    const updateUser = (data) => {
        setLoading(true);
        console.log(data)
        UserService.updateUser(data).then( () => {
            history.push("/user");
            setLoading(false);
        })
    };

    return (
        <div className="flex justify-content-center m-4">
            <Card className="card-container" title="Promjena osobnih informacija">
                <form onSubmit={() => updateUser} className="grid p-fluid p-formgrid form-layout">
                    <span className="field col-12">
                        <label htmlFor="firstNameInput">Novo ime:</label>
                        <InputText id="firstNameInput" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </span>
                    <div className="field col-12">
                        <label htmlFor="lastNameInput">Novo prezime:</label>
                        <InputText id="lastNameInput" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>
                    <div className="col-12 flex justify-content-center">
                        <div>
                            <Button type="submit" label="Prijavi se" className="mt-2" loading={loading}/>
                        </div>
                    </div>
                </form>
            </Card>
        </div>
    )
}

export default UserUpdate;
