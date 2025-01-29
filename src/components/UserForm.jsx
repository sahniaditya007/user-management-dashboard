import {useState} from 'react';
import UserService from '../services/UserService';
import { validateEmail, validateRequired } from '../utils/validators';

export default function UserForm({ user, onSuccess}){

    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        company: {name: user?.company?.name || ''}
    });
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = {};
        if (!validateRequired(formData.name)) validationErrors.name = 'Name is required';
        if (!validateEmail(formData.email)) validationErrors.email = 'Invalid email';

        if(Object.keys(validateError).length > 0){
            setErrors(validateError);
            return;
        }

        try{
            if (user){
                await UserService.updateUser(user.id, formData);
            } else{
                await UserService, createUser(formData);
            }
            onSuccess();
        } catch (err){
            setErrors({ form: err.message});
        }
        return (
            <form onSubmit={handleSubmit} className="space-y-4">
                {error.form && <p className="text-red-500">{errors.form}</p>}

                <div>
                    <label>
                        Name:
                    </label>
                    <input>
                    value = {formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className = "border p-2 w-full"
                    </input>
                    {errors.name && <p className="text-red-500">{errors.name}</p>}
                </div>

                <div>
                    <label>
                        Email:
                    </label>
                    <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="border p-2 w-full"
                    />
                    {errors.email && <p className="text-red-500">{errors.email}</p>}
                </div>
                
                <div>
                    <label>
                        Company:
                    </label>
                    <input
                    value={formData.company.name}
                    onChange={(e) => setFormData({
                        ...formData,
                        company: { ...formData.company, name: e.target.value }
                    })}
                    className="border p-2 w-full"
                    />
                </div>

                <button type="submit" className="bg-green-500 text-white p-2 rounded">
                    {user ? 'Update' : 'Create'} User
                </button>
            </form>
        );
    }
}