import {useState} from 'react';
import { UilCheck } from '@iconscout/react-unicons';
import UserService from '../services/UserService';
import { validateEmail, validateRequired } from '../utils/validators';

export default function UserForm({user, onSuccess}){
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        company: { name: user?.company?.name || '' }
    });
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = {};
        if (!validateRequired(formData.name)) validationErrors.name = 'Required field';
        if (!validateEmail(formData.email)) validationErrors.email = 'Invalid email';
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        try {
            if(user){
                await UserService.updateUser(user.id, formData);
            } else {
                await UserService.createUser(formData);
            }
            onSuccess();
        } catch (err){
            setErrors({ form: err.message });
        }
    };
    return (
        <Form onSubmit={handleSubmit} className="d-grid gap-3">
          {errors.form && <Alert variant="danger">{errors.form}</Alert>}
    
          <FloatingLabel label="Full Name">
            <Form.Control
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              isInvalid={!!errors.name}
              placeholder="John Doe"
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </FloatingLabel>
    
          <FloatingLabel label="Email Address">
            <Form.Control
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              isInvalid={!!errors.email}
              placeholder="name@example.com"
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </FloatingLabel>
    
          <FloatingLabel label="Company Name">
            <Form.Control
              value={formData.company.name}
              onChange={(e) => setFormData({
                ...formData,
                company: { ...formData.company, name: e.target.value }
              })}
              placeholder="Company Inc."
            />
          </FloatingLabel>
    
          <Button 
            type="submit" 
            variant="primary" 
            className="mt-3 d-flex align-items-center gap-2 justify-content-center"
          >
            <UilCheck size="20" />
            {user ? 'Update User' : 'Create User'}
          </Button>
        </Form>
      );
}