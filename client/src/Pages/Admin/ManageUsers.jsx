import { useEffect, useState } from "react";
import axiosInstance from "../../Helpers/axiosInstance";

function ManageUsers() {

    const [users, setUsers] = useState([]);

    useEffect(() => {

        async function fetchUsers() {

            const res = await axiosInstance.get("/user");

            setUsers(res.data.users);

        }

        fetchUsers();

    }, []);

    return (
        <div className="p-8">

            <h1 className="text-3xl font-bold mb-6">
                Users
            </h1>

            <table className="table">

                <thead>

                    <tr>

                        <th>Name</th>

                        <th>Email</th>

                        <th>Role</th>

                    </tr>

                </thead>

                <tbody>

                    {users.map((user) => (

                        <tr key={user._id}>

                            <td>{user.fullName}</td>

                            <td>{user.email}</td>

                            <td>{user.role}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default ManageUsers;