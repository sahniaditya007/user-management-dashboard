import {useEffect, useState} from 'react';
import UserService from '../services/UserService';
import UserFrom from './UserFrom';
import Modal from './Modal';
import Alert from './Alert';

export default function UserList(){

    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectUser] = useState(null);
    const [error, setError] = useState('');

    useEffect(() =>{
        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            const data = await UserService.getUsers();
            setUsers(data);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDelete = async (userId) => {
        try {
            await UserService.deleteUser(userId);
            setUser(user.filter(user => user.id != userId));
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="container mx-auto p-4">
            {error && <Alert message = {error}/>}

            <button
            onClick={() => {
                setSelectedUser(null);
                setShowModal(true);
            }}
            className="bg-blue-500 text-white p-2 rounded mb-4"
            >
                Add User
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {user.map(user =>(
                    <div key = {user.id} className = "border p-4 rounded shadow">
                        <h3 className="font-bold">{user.name}</h3>
                        <p>{user.email}</p>
                        <p>{user.company?.name}</p>
                        <div className="mt-2">

                            <button
                            onClick={() => {
                                setSelectUser(user);
                                setShowModal(true);
                            }}
                            className = "mr-2 text-blue-500"
                            >
                                Edit
                            </button>
                            
                            <button
                                onClick={() => handleDelete(user.id)}
                                className="text-red-500"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <UserForm
                        user = {selectedUser}
                        onSuccess={() => {
                            setShowModal(false);
                            loadUser();
                        }}
                    />
                </Modal>
            )}
        </div>
    );

}