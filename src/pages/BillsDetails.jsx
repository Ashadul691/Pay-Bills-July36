import React, { useState } from 'react';
import { useLoaderData, useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { BalanceContext } from "../contexts/BalanceContext";
import { 
  ArrowLeft, 
  CheckCircle, 
  XCircle, 
  Wallet, 
  Calendar, 
  Building, 
  CreditCard,
  AlertCircle 
} from "lucide-react";

const BillsDetails = () => {
  const bills = useLoaderData();
  const { id } = useParams();
  const navigate = useNavigate();
  const { balance, payBill } = useContext(BalanceContext);
  const [showModal, setShowModal] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const bill = bills.find(b => b.id === parseInt(id));

  const handlePay = () => {
    const success = payBill(bill.amount);
    setPaymentStatus(success);
    setShowModal(true);

    if (success) {
      setTimeout(() => {
        setShowModal(false);
        navigate('/bills');
      }, 2000);
    }
  };

  const newBalance = balance - bill.amount;
  const hasEnoughBalance = balance >= bill.amount;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <button 
            onClick={() => navigate('/bills')}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Bills</span>
          </button>
          <h1 className="text-3xl font-bold">Bill Payment</h1>
          <p className="text-blue-100 mt-2">Review and confirm your payment</p>
        </div>
      </div>

      
      <div className="max-w-6xl mx-auto px-6 -mt-6 pb-12">
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Left Col*/}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex flex-col items-center mb-6">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl flex items-center justify-center mb-4">
                <img 
                  src={bill.icon} 
                  alt={bill.organization}
                  className="w-24 h-24 object-contain" 
                />
              </div>
              <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold capitalize">
                {bill.bill_type}
              </span>
            </div>

            <div className="space-y-4">
              <div className="border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-1">
                  {bill.organization}
                </h2>
                <p className="text-gray-500">Official Bill Payment</p>
              </div>

              <div className="flex items-center justify-between py-3 border-b">
                <div className="flex items-center gap-3 text-gray-600">
                  <Building className="w-5 h-5" />
                  <span>Organization</span>
                </div>
                <span className="font-semibold text-gray-800">{bill.organization}</span>
              </div>

              <div className="flex items-center justify-between py-3 border-b">
                <div className="flex items-center gap-3 text-gray-600">
                  <Calendar className="w-5 h-5" />
                  <span>Due Date</span>
                </div>
                <span className="font-semibold text-gray-800">{bill.due_date}</span>
              </div>

              <div className="flex items-center justify-between py-3 border-b">
                <div className="flex items-center gap-3 text-gray-600">
                  <CreditCard className="w-5 h-5" />
                  <span>Bill Type</span>
                </div>
                <span className="font-semibold text-gray-800 capitalize">{bill.bill_type}</span>
              </div>

              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white mt-6">
                <p className="text-sm opacity-80 mb-1">Amount Due</p>
                <p className="text-4xl font-bold">৳ {bill.amount.toLocaleString()}</p>
              </div>
            </div>
          </div>

          
          <div className="space-y-6">
            
           
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Current Balance</p>
                  <p className="text-2xl font-bold text-gray-800">৳ {balance.toLocaleString()}</p>
                </div>
              </div>

              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Bill Amount</span>
                  <span className="font-semibold">৳ {bill.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-gray-600">After Payment</span>
                  <span className={`font-bold ${hasEnoughBalance ? 'text-green-600' : 'text-red-600'}`}>
                    ৳ {hasEnoughBalance ? newBalance.toLocaleString() : balance.toLocaleString()}
                  </span>
                </div>
              </div>

              {!hasEnoughBalance && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-red-800 mb-1">Insufficient Balance</p>
                    <p className="text-sm text-red-600">
                      You need ৳ {(bill.amount - balance).toLocaleString()} more to complete this payment.
                    </p>
                  </div>
                </div>
              )}
            </div>

           
            <button
              onClick={handlePay}
              disabled={!hasEnoughBalance}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                hasEnoughBalance
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-2xl hover:scale-105'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {hasEnoughBalance ? 'Confirm Payment' : 'Insufficient Balance'}
            </button>

            {/* Security Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                🔒 <strong>Secure Payment:</strong> Your transaction is encrypted and secure. 
                Payment will be processed immediately.
              </p>
            </div>
          </div>
        </div>
      </div>

     
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full animate-bounce-in">
            <div className="text-center">
              {paymentStatus ? (
                <>
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-12 h-12 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h3>
                  <p className="text-gray-600 mb-4">
                    Your payment of ৳{bill.amount.toLocaleString()} has been processed.
                  </p>
                  <p className="text-sm text-gray-500">
                    New Balance: <span className="font-bold text-green-600">৳{newBalance.toLocaleString()}</span>
                  </p>
                </>
              ) : (
                <>
                  <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <XCircle className="w-12 h-12 text-red-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Payment Failed</h3>
                  <p className="text-gray-600 mb-4">Insufficient balance to complete this transaction.</p>
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-6 py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-700"
                  >
                    Close
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillsDetails;