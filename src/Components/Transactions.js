import { useState, useEffect } from "react";
import Transaction from "./Transaction";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    // http://www.localhost:3003/transactions
    axios
      .get(API_URL + "/transactions")
      .then((res) => {
        setTransactions(res.data);
      })
      .catch((err) => {
        throw err;
      });

    // fetch(API_URL + "/transactions")
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((data) => {
    //     setTransactions(data);
    //   })
    //   .catch((err) => {
    //     throw err;
    //   });
  }, []);

  return (
    <div className="Transactions">
      <section>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Take me there</th>
              <th>View this transaction</th>
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
