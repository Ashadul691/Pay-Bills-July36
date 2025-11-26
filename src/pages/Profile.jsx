import { useContext } from "react";
import { BalanceContext } from "../contexts/BalanceContext";
import { AuthContext } from "../Provider/AuthProvider";
import { User, Wallet, TrendingUp, Clock } from "lucide-react";
import userr from "../assets/user.png";

const Profile = () => {
  const { balance } = useContext(BalanceContext);
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-4xl mx-auto">
       
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Your Profile</h1>
          <p className="text-slate-600">Manage your account and view your balance</p>
        </div>

        
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-blue-100">
              {user && user.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt={user.displayName || "User"} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <img 
                  src={userr} 
                  alt="Default User" 
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">
                {user && user.displayName ? user.displayName : "Welcome Back!"}
              </h2>
              <p className="text-slate-500">
                {user && user.email ? user.email : "Account Overview"}
              </p>
            </div>
          </div>

          
          <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-xl p-6 text-white shadow-xl">
            <div className="flex items-center gap-2 mb-2">
              <Wallet className="w-5 h-5" />
              <span className="text-sm font-medium opacity-90">Available Balance</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold">৳ {balance.toLocaleString()}</span>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm opacity-80">
              <Clock className="w-4 h-4" />
              <span>Last updated: just now</span>
            </div>
          </div>
        </div>

       
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm mb-1">This Month</p>
                <p className="text-2xl font-bold text-slate-800">৳ 0</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm mb-1">Transactions</p>
                <p className="text-2xl font-bold text-slate-800">0</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Wallet className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm mb-1">Status</p>
                <p className="text-2xl font-bold text-slate-800">Active</p>
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        
        
      </div>
    </div>
  );
};

export default Profile;