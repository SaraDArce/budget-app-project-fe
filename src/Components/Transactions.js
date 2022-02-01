import { useState, useEffect } from "react";
import Transaction from "./Transaction";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // http://www.localhost:3003/transactions
    axios
      .get(API_URL + "/transactions")
      .then((res) => {
        setTransactions(res.data);
        handleTotal(res.data);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  const handleTotal = (transactionsArr) => {
    let bal = transactionsArr
      .map((transaction) => Number(transaction.amount))
      .reduce((a, b) => a + b, 0);
    setTotal(bal);
  };

  return (
    <div className="Transactions">
      <h2>Balance: ${total.toFixed(2)} </h2>
      <section>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Edit Transaction</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => {
              return (
                <Transaction
                  key={index}
                  transaction={transaction}
                  index={index}
                />
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Transactions;
