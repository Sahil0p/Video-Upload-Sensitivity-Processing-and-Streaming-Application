export default function UserTable({ users, onRoleChange }) {
    return (
      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="py-2">Name</th>
              <th>Email</th>
              <th>Role</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>
  
          <tbody>
            {users.map(user => (
              <tr key={user._id} className="border-b last:border-0">
                <td className="py-2 font-medium">{user.name}</td>
                <td>{user.email}</td>
  
                <td>
                  <select
                    value={user.role}
                    onChange={e =>
                      onRoleChange(user._id, e.target.value)
                    }
                  >
                    <option value="viewer">Viewer</option>
                    <option value="editor">Editor</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
  
                <td className="text-right">
                  <button className="text-red-500 hover:underline">
                    Disable
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  