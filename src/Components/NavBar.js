import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav>
      <h3>
        <Link to="/transactions">Transactions</Link>
      </h3>
      <button>
        <Link to="/transactions/new">New Transaction</Link>
      </button>
    </nav>
  );
}
