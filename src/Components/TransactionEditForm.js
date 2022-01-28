import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

function TransactionEditForm() {
  let { index } = useParams();
  const [transaction, setTransaction] = useState({
    date: "",
    trans: "",
    amount: Number,
    type: "",
    category: "",
    description: "",
    tags: "",
  });
  const navigate = useNavigate();

  const handleTextChange = (ev) => {
    setTransaction({ ...transaction, [ev.target.id]: ev.target.value });
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/transactions/${index}`)
      .then((res) => {
        setTransaction(res.data);
      })
      .catch((err) => {
        navigate("/not-found");
      });
  }, [index]);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/transactions/${index}`,
        transaction
      )
      .then((res) => {
        navigate("/transactions");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="Edit">
      <form onSubmit={handleSubmit}>
        {/* <div>
          <DatePicker
            selected={date}
            onSelect={handleDateSelect} //when day is clicked
            onChange={handleDateChange} //only when value has changed
          />
        </div> */}
        <label htmlFor="trans">Trans:</label>
        <input
          id="trans"
          value={transaction.trans}
          type="text"
          onChange={handleTextChange}
          placeholder="Transaction"
          required
        />
        <label htmlFor="amount">Amount:</label>
        <input
          id="amount"
          type="number"
          name="amount"
          value={transaction.amount}
          placeholder="$"
          onChange={handleTextChange}
        />
        <label htmlFor="type">Type:</label>
        <input
          id="type"
          type="text"
          name="Business | Personal"
          value={transaction.type}
          placeholder="Business, Personal, Split"
          onChange={handleTextChange}
        />
        <label htmlFor="category">Category:</label>
        <input
          id="category"
          type="text"
          name="category"
          value={transaction.category}
          placeholder="Groceries, Household, ..."
          onChange={handleTextChange}
        />
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={transaction.description}
          onChange={handleTextChange}
          placeholder="Transaction Description"
        />
        <label htmlFor="tags">Tags:</label>
        <input
          id="tags"
          type="text"
          name="tags"
          value={transaction.tags}
          placeholder="#"
          onChange={handleTextChange}
        />
        <br />
        <input type="submit" />
      </form>
      <Link to={`/transactions/${index}`}>
        <button>Cancel!</button>
      </Link>
    </div>
  );
}

export default TransactionEditForm;
