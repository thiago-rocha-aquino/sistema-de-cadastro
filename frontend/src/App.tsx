import React, { useState, useEffect } from 'react';
import { UserList } from './components/UserList';
import { UserForm } from './components/UserForm';
import { userService } from './services/api';
import { User, CreateUserData, UpdateUserData } from './types/User';
import './App.css';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await userService.getAll();
      setUsers(data);
    } catch (error) {
      showMessage('error', 'Erro ao carregar usuários');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  const handleCreate = async (data: CreateUserData) => {
    await userService.create(data);
    showMessage('success', 'Usuário cadastrado com sucesso!');
    setShowForm(false);
    loadUsers();
  };

  const handleUpdate = async (data: UpdateUserData) => {
    if (!editingUser) return;
    await userService.update(editingUser.id, data);
    showMessage('success', 'Usuário atualizado com sucesso!');
    setEditingUser(null);
    setShowForm(false);
    loadUsers();
  };

  const handleDelete = async (id: string) => {
    try {
      await userService.delete(id);
      showMessage('success', 'Usuário removido com sucesso!');
      loadUsers();
    } catch (error) {
      showMessage('error', 'Erro ao remover usuário');
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingUser(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Sistema de Cadastro de Usuários</h1>
        <p>Gerenciamento completo com CRUD</p>
      </header>

      {message && (
        <div className={`message message-${message.type}`}>
          {message.text}
        </div>
      )}

      <main className="app-main">
        {!showForm ? (
          <>
            <div className="toolbar">
              <button
                onClick={() => setShowForm(true)}
                className="btn-primary btn-new"
              >
                + Novo Usuário
              </button>
              <div className="user-count">
                Total: {users.length} usuário{users.length !== 1 ? 's' : ''}
              </div>
            </div>

            {loading ? (
              <div className="loading">Carregando...</div>
            ) : (
              <UserList users={users} onEdit={handleEdit} onDelete={handleDelete} />
            )}
          </>
        ) : (
          <div className="form-container">
            <UserForm
              user={editingUser}
              onSubmit={editingUser ? handleUpdate : handleCreate}
              onCancel={handleCancel}
            />
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>Desenvolvido por Thiago</p>
      </footer>
    </div>
  );
}

export default App;
