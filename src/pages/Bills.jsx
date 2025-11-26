import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, Calendar, TrendingUp } from "lucide-react";

const Bills = () => {
  const [bills, setBills] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    fetch("/bills.json")
      .then(res => res.json())
      .then(data => setBills(data));
  }, []);

  const filteredBills = bills.filter(bill => {
    const matchesSearch = bill.organization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || bill.bill_type === filterType;
    return matchesSearch && matchesFilter;
  });

  const totalAmount = filteredBills.reduce((sum, bill) => sum + bill.amount, 0);
  const billTypes = [...new Set(bills.map(b => b.bill_type))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Pay Your Bills</h1>
          <p className="text-blue-100">Manage and pay all your bills in one place</p>
          
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm opacity-80">Total Bills</p>
                  <p className="text-2xl font-bold">{filteredBills.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm opacity-80">Total Amount</p>
                  <p className="text-2xl font-bold">৳ {totalAmount.toLocaleString()}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Filter className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm opacity-80">Categories</p>
                  <p className="text-2xl font-bold">{billTypes.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-6 -mt-6">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search bills by organization..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

           
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer"
              >
                <option value="all">All Types</option>
                {billTypes.map(type => (
                  <option key={type} value={type} className="capitalize">
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

    
      <div className="max-w-7xl mx-auto px-6 pb-12">
        {filteredBills.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No bills found</h3>
            <p className="text-gray-500">Try adjusting your search or filter</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBills.map(bill => (
              <Link
                key={bill.id}
                to={`/bills/${bill.id}`}
                className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 p-8 flex justify-center items-center">
                  <img 
                    src={bill.icon} 
                    alt={bill.organization}
                    className="w-24 h-24 object-contain group-hover:scale-110 transition-transform duration-300" 
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-700 capitalize">
                      {bill.bill_type}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {bill.organization}
                  </h2>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-500">Amount Due</span>
                    <span className="text-2xl font-bold text-blue-600">৳ {bill.amount}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>Due: {bill.due_date}</span>
                  </div>
                  
                  <button className="mt-4 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold group-hover:shadow-lg transition-all duration-300">
                    Pay Now
                  </button>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bills;