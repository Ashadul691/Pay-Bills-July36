import { createContext, useState } from "react";

export const BalanceContext = createContext();

export default function BalanceProvider({ children }) {
  const [balance, setBalance] = useState(10000);

  const payBill = (amount) => {
    if (balance >= amount) {
      setBalance(balance - amount);
      return true;
    }
    return false;
  };

  return (
    <BalanceContext.Provider value={{ balance, payBill }}>
      {children}
    </BalanceContext.Provider>
  );
}
