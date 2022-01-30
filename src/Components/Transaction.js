import { Link } from "react-router-dom";

function Transaction({ transaction, index }) {
  return (
    <tr>
      <td>
        <a href={transaction.url} target="_blank" rel="noreferrer">
          {transaction.trans}
        </a>
      </td>
      <td>{transaction.date}</td>
      <td>{transaction.amount}</td>
      <td>
        <Link to={`/transactions/${index}`}>✏️</Link>
      </td>
    </tr>
  );
}

export default Transaction;
