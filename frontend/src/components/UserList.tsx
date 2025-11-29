import React from 'react';
import { User } from '../types/User';
import { formatDate } from '../utils/formatters';

interface UserListProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

export function UserList({ users, onEdit, onDelete }: UserListProps) {
  if (users.length === 0) {
    return (
      <div className="empty-state">
        <p>Nenhum usuário cadastrado ainda.</p>
        <p>Clique em "Novo Usuário" para começar.</p>
      </div>
    );
  }

  return (
    <div className="user-list">
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>CPF</th>
            <th>Telefone</th>
            <th>Data Nascimento</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.cpf}</td>
              <td>{user.phone}</td>
              <td>{formatDate(user.birthDate)}</td>
              <td className="actions">
                <button
                  onClick={() => onEdit(user)}
                  className="btn-edit"
                  title="Editar"
                >
                  ✏️
                </button>
                <button
                  onClick={() => {
                    if (window.confirm(`Deseja realmente excluir ${user.name}?`)) {
                      onDelete(user.id);
                    }
                  }}
                  className="btn-delete"
                  title="Excluir"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
