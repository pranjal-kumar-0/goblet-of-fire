"use client";
import { useEffect, useState } from "react";
import { collection, getDocs, DocumentData } from "firebase/firestore";
import { db } from "../../firebase/firebase.config"; 
interface UserData {
  id: string; 
  fullName: string;
  email: string;
  regNum: string;
  phone: string;
  bloodStatus: string;
}

function Users() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [copyButtonText, setCopyButtonText] = useState<string>("Copy All Emails");

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        
        const allUsers = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as UserData));

        //  Filter out users with duplicate emails
        const uniqueUsersMap = new Map<string, UserData>();
        allUsers.forEach(user => {
          if (user.email && !uniqueUsersMap.has(user.email)) {
            uniqueUsersMap.set(user.email, user);
          }
        });
        const uniqueUsers = Array.from(uniqueUsersMap.values());

        setUsers(uniqueUsers);
        console.log("Unique Users Data:", uniqueUsers);

      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []); 

  const handleCopyEmails = () => {
    if (users.length === 0) return;
    
    const allEmails = users.map(user => user.email).join("\n");
    navigator.clipboard.writeText(allEmails)
      .then(() => {
        setCopyButtonText("Copied! 👍");
        setTimeout(() => setCopyButtonText("Copy All Emails"), 2000); 
      })
      .catch(err => {
        console.error("Failed to copy emails: ", err);
        setCopyButtonText("Failed to Copy");
      });
  };

  return (
    <>
      <style jsx>{`
        .user-container {
          font-family: sans-serif;
          padding: 20px;
          max-width: 1200px;
          margin: auto;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .copy-button {
          padding: 8px 16px;
          font-size: 14px;
          cursor: pointer;
          border-radius: 6px;
          border: 1px solid #ccc;
          background-color: #f0f0f0;
          transition: background-color 0.2s;
        }
        .copy-button:hover {
          background-color: #e0e0e0;
        }
        .user-table {
          width: 100%;
          border-collapse: collapse;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .user-table th, .user-table td {
          border: 1px solid #ddd;
          padding: 12px;
          text-align: left;
        }
        .user-table th {
          background-color: #f7f7f7;
          font-weight: bold;
        }
        .user-table tbody tr:nth-child(even) {
          background-color: #fdfdfd;
        }
        .loading-text {
          text-align: center;
          font-size: 18px;
          color: #555;
        }
      `}</style>

      <div className="user-container">
        <div className="header">
          <h2>User Database ({users.length} Unique Entries)</h2>
          <button onClick={handleCopyEmails} className="copy-button">
            {copyButtonText}
          </button>
        </div>

        {isLoading ? (
          <p className="loading-text">Loading user data...</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="user-table">
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Registration Num</th>
                  <th>Phone</th>
                  <th>Blood Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.fullName}</td>
                    <td>{user.email}</td>
                    <td>{user.regNum}</td>
                    <td>{user.phone}</td>
                    <td>{user.bloodStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default Users;