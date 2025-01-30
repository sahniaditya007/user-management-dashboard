import {useEffect, useState} from 'react';
import { Container, Row, Col, Card, Button, Alert, Spinner } from 'react-bootstrap';
import { UilPlus, UilEdit, UilTrashAlt } from '@iconscout/react-unicons';
import UserService from '../services/userService';
import Modal from './CustomModal';
import UserForm from "./UserForm";


export default function UserList(){

    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectUser] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            const data = await UserService.getUsers();
            setUsers(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (userId) => {
        try {
            await UserService.deleteUser(userId);
            setUsers(user.filter(user => user.id != userId));
        } catch (err) {
            setError(err.message);
        }
    };
    if (loading) {
        return (
          <div className="d-flex justify-content-center mt-5">
            <Spinner animation="border" variant="primary" />
          </div>
        );
      }
    
      return (
        <Container className="py-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="text-primary fw-bold">User Management</h1>
            <Button 
              variant="primary" 
              onClick={() => setShowModal(true)}
              className="d-flex align-items-center gap-2"
            >
              <UilPlus size="20" />
              Add New User
            </Button>
          </div>
    
          {error && <Alert variant="danger" className="mb-4">{error}</Alert>}
    
          <Row xs={1} md={2} lg={3} className="g-4">
            {users.map(user => (
              <Col key={user.id}>
                <Card className="h-100 custom-card p-3">
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <div className="avatar">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <h5 className="mb-0 fw-bold">{user.name}</h5>
                      <small className="text-muted">#{user.id}</small>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="text-muted mb-1">
                      <span className="d-block">Email:</span>
                      <strong>{user.email}</strong>
                    </div>
                    <div className="text-muted">
                      <span className="d-block">Company:</span>
                      <strong>{user.company?.name}</strong>
                    </div>
                  </div>
    
                  <div className="d-flex gap-2 mt-auto">
                    <Button 
                      variant="outline-primary" 
                      className="d-flex align-items-center gap-1 flex-grow-1"
                      onClick={() => {
                        setSelectedUser(user);
                        setShowModal(true);
                      }}
                    >
                      <UilEdit size="16" />
                      Edit
                    </Button>
                    <Button 
                      variant="outline-danger" 
                      className="d-flex align-items-center gap-1"
                      onClick={() => handleDelete(user.id)}
                    >
                      <UilTrashAlt size="16" />
                    </Button>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
    
          <CustomModal 
            show={showModal} 
            onHide={() => setShowModal(false)}
            title={selectedUser ? "Edit User" : "New User"}
          >
            <UserForm 
              user={selectedUser}
              onSuccess={() => {
                setShowModal(false);
                loadUsers();
              }}
            />
          </CustomModal>
        </Container>
    );
}
