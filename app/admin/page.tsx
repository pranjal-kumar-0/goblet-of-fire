"use client";
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase.config";

const auth = getAuth();

interface DataItem {
  id: string;
  [key: string]: any;
}

type TabType = 'users' | 'teams';

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<TabType>('users');
  const [data, setData] = useState<Record<TabType, DataItem[]>>({ users: [], teams: [] });
  const [selected, setSelected] = useState<Record<TabType, string[]>>({ users: [], teams: [] });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      if (user) loadData();
    });
    return () => unsubscribe();
  }, []);

  const loadData = async () => {
    try {
      const collections = await Promise.all([
        getDocs(collection(db, "users")),
        getDocs(collection(db, "teams"))
      ]);
      
      setData({
        users: collections[0].docs.map(doc => ({ id: doc.id, ...doc.data() })),
        teams: collections[1].docs.map(doc => ({ id: doc.id, ...doc.data() }))
      });
    } catch (error) {
      setMessage("Error loading data");
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    try {
      await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
    } catch (error: any) {
      setLoginError(error.message);
    }
  };

  const apiCall = async (endpoint: string, method: string, body?: any) => {
    try {
      const idToken = await user?.getIdToken();
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        body: body ? JSON.stringify(body) : undefined
      });
      return response.ok;
    } catch {
      return false;
    }
  };

  const performAction = async (action: string, items: string[], confirmMsg: string) => {
    if (!items.length || !confirm(confirmMsg)) return;
    
    const isSuccess = activeTab === 'users' 
      ? await apiCall('/api/admin/users', 'POST', { userIds: items, action })
      : await apiCall('/api/admin/teams', 'POST', { teamIds: items, action });
    
    if (isSuccess) {
      setMessage(`${action} completed for ${items.length} items`);
      setSelected(prev => ({ ...prev, [activeTab]: [] }));
      loadData();
    } else {
      setMessage(`Error performing ${action}`);
    }
  };

  const singleAction = async (id: string, action: string, confirmMsg: string) => {
    if (!confirm(confirmMsg)) return;
    
    const endpoint = activeTab === 'users' ? '/api/admin/users' : '/api/admin/teams';
    const method = action === 'delete' ? 'DELETE' : 'PUT';
    const url = method === 'DELETE' ? `${endpoint}?${activeTab.slice(0, -1)}Id=${id}` : endpoint;
    const body = method === 'PUT' ? { [`${activeTab.slice(0, -1)}Id`]: id, action } : undefined;
    
    const isSuccess = await apiCall(url, method, body);
    setMessage(isSuccess ? `${action} completed` : `Error performing ${action}`);
    if (isSuccess) loadData();
  };

  const toggleSelection = (id: string) => {
    setSelected(prev => ({
      ...prev,
      [activeTab]: prev[activeTab].includes(id)
        ? prev[activeTab].filter(item => item !== id)
        : [...prev[activeTab], id]
    }));
  };

  const toggleSelectAll = () => {
    const allIds = data[activeTab].map(item => item.id);
    setSelected(prev => ({
      ...prev,
      [activeTab]: prev[activeTab].length === allIds.length ? [] : allIds
    }));
  };

  const currentData = data[activeTab];
  const currentSelected = selected[activeTab];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-red-950 to-black">
        <div className="text-yellow-300 font-['Cinzel_Decorative'] text-2xl animate-pulse">Accessing the Ministry...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-red-950 to-black px-4">
        <div className="relative max-w-md w-full">
          <div className="absolute -top-6 -left-6 w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-red-700 flex items-center justify-center shadow-[0_0_25px_5px_rgba(255,215,0,0.9)] animate-pulse z-20">
            <span className="text-3xl">⚡</span>
          </div>
          <div className="w-full rounded-2xl shadow-2xl border-4 border-yellow-700 p-8 bg-[#4f2800]">
            <h1 className="font-['Cinzel_Decorative'] text-3xl text-yellow-200 text-center mb-6 tracking-wider">
              Ministry Access
            </h1>
            <form onSubmit={handleAuth} className="space-y-6">
              <div>
                <label className="block text-yellow-200 font-['Cinzel_Decorative'] mb-2 text-lg">Wizard Email</label>
                <input
                  type="email"
                  value={credentials.email}
                  onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="wizard@ministry.magic"
                  className="w-full px-4 py-3 rounded-lg border-2 border-yellow-800 bg-[#3a1d00]/80 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-yellow-100 placeholder-yellow-300/50"
                  required
                />
              </div>
              <div>
                <label className="block text-yellow-200 font-['Cinzel_Decorative'] mb-2 text-lg">Secret Spell</label>
                <input
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="Enter your magical password"
                  className="w-full px-4 py-3 rounded-lg border-2 border-yellow-800 bg-[#3a1d00]/80 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-yellow-100 placeholder-yellow-300/50"
                  required
                />
              </div>
              {loginError && <div className="text-red-400 text-sm text-center">{loginError}</div>}
              <button
                type="submit"
                className="w-full px-6 py-3 text-xl font-['Cinzel_Decorative'] text-black bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500 rounded-full shadow-[0_0_20px_rgba(255,215,0,0.8)] hover:scale-105 transition-all duration-300"
              >
                Enter the Ministry
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-red-950 to-black p-4 font-serif">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="bg-[#4f2800] rounded-2xl shadow-2xl border-4 border-yellow-700 p-6">
          <div className="flex justify-between items-center">
            <h1 className="font-['Cinzel_Decorative'] text-3xl md:text-4xl text-yellow-200 tracking-wider drop-shadow-[0_3px_8px_rgba(0,0,0,0.9)]">
              Ministry of Magic - Admin
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-yellow-300 font-['Cinzel_Decorative']">{user.email}</span>
              <button
                onClick={() => signOut(auth)}
                className="px-4 py-2 bg-red-800 hover:bg-red-700 text-white rounded-lg transition-colors font-['Cinzel_Decorative']"
              >
                Disapparate
              </button>
            </div>
          </div>
          {message && (
            <div className="mt-4 p-3 bg-green-900/80 border border-green-600 text-green-200 rounded-lg font-['Cinzel_Decorative']">
              {message}
            </div>
          )}
        </div>
      </div>

      {/* Tabs & Content */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#4f2800] rounded-2xl shadow-2xl border-4 border-yellow-700 p-6">
          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-6">
            {(['users', 'teams'] as TabType[]).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-['Cinzel_Decorative'] text-lg rounded-lg transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500 text-black shadow-[0_0_15px_rgba(255,215,0,0.7)]'
                    : 'bg-yellow-800/30 text-yellow-200 hover:bg-yellow-700/50'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)} ({currentData.length})
              </button>
            ))}
          </div>

          {/* Actions Bar */}
          <div className="flex justify-between items-center mb-4">
            <div className="space-x-2">
              <button
                onClick={() => performAction(
                  activeTab === 'users' ? 'bulkDelete' : 'bulkClearQuestions',
                  currentSelected,
                  `${activeTab === 'users' ? 'Delete' : 'Clear questions for'} ${currentSelected.length} ${activeTab}?`
                )}
                disabled={!currentSelected.length}
                className="px-4 py-2 bg-red-700 hover:bg-red-600 disabled:bg-gray-600 text-white rounded-lg font-['Cinzel_Decorative'] transition-colors"
              >
                {activeTab === 'users' ? 'Delete' : 'Clear Questions'} ({currentSelected.length})
              </button>
            </div>
            <button
              onClick={loadData}
              className="px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white rounded-lg font-['Cinzel_Decorative'] transition-colors"
            >
              Refresh Scroll
            </button>
          </div>

          {/* Data Table */}
          <div className="overflow-x-auto rounded-lg border-2 border-yellow-800">
            <table className="min-w-full bg-[#3a1d00]/80">
              <thead className="bg-yellow-800/50">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <input
                      type="checkbox"
                      aria-label={`Select all ${activeTab}`}
                      checked={currentSelected.length === currentData.length && currentData.length > 0}
                      onChange={toggleSelectAll}
                      className="accent-yellow-500"
                    />
                  </th>
                  {activeTab === 'users' ? (
                    <>
                      <th className="px-4 py-3 text-left text-yellow-200 font-['Cinzel_Decorative']">Name</th>
                      <th className="px-4 py-3 text-left text-yellow-200 font-['Cinzel_Decorative']">Email</th>
                      <th className="px-4 py-3 text-left text-yellow-200 font-['Cinzel_Decorative']">Status</th>
                    </>
                  ) : (
                    <>
                      <th className="px-4 py-3 text-left text-yellow-200 font-['Cinzel_Decorative']">Team</th>
                      <th className="px-4 py-3 text-left text-yellow-200 font-['Cinzel_Decorative']">House</th>
                      <th className="px-4 py-3 text-left text-yellow-200 font-['Cinzel_Decorative']">Questions</th>
                    </>
                  )}
                  <th className="px-4 py-3 text-left text-yellow-200 font-['Cinzel_Decorative']">Spells</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((item) => (
                  <tr key={item.id} className="border-t border-yellow-800/50 hover:bg-yellow-900/20">
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        aria-label={`Select ${activeTab === 'users' ? item.fullName || item.email : item.name || item.id}`}
                        checked={currentSelected.includes(item.id)}
                        onChange={() => toggleSelection(item.id)}
                        className="accent-yellow-500"
                      />
                    </td>
                    {activeTab === 'users' ? (
                      <>
                        <td className="px-4 py-3 text-yellow-100">{item.fullName || "Unknown Wizard"}</td>
                        <td className="px-4 py-3 text-yellow-100">{item.email || "No Owl Post"}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded text-xs ${
                            item.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                          }`}>
                            {item.status || "pending"}
                          </span>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-4 py-3 text-yellow-100 font-mono">{item.name || item.id}</td>
                        <td className="px-4 py-3 text-yellow-100">{item.house || "Sorting Hat Pending"}</td>
                        <td className="px-4 py-3 text-yellow-100">{item.questionsAttempted?.length || 0}</td>
                      </>
                    )}
                    <td className="px-4 py-3">
                      <div className="space-x-1">
                        {activeTab === 'users' ? (
                          <>
                            <button
                              onClick={() => singleAction(item.id, 'clearData', 'Clear this wizard\'s data?')}
                              className="bg-orange-600 hover:bg-orange-500 text-white px-2 py-1 rounded text-xs transition-colors"
                            >
                              Obliviate
                            </button>
                            <button
                              onClick={() => singleAction(item.id, 'delete', 'Banish this wizard?')}
                              className="bg-red-600 hover:bg-red-500 text-white px-2 py-1 rounded text-xs transition-colors"
                            >
                              Avada Kedavra
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => singleAction(item.id, 'clearQuestions', 'Clear team\'s memory?')}
                              className="bg-orange-600 hover:bg-orange-500 text-white px-2 py-1 rounded text-xs transition-colors"
                            >
                              Memory Charm
                            </button>
                            <button
                              onClick={() => singleAction(item.id, 'delete', 'Dissolve this team?')}
                              className="bg-red-600 hover:bg-red-500 text-white px-2 py-1 rounded text-xs transition-colors"
                            >
                              Evanesco
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}