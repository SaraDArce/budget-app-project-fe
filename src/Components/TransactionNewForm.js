import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function TransactionNewForm() {
  const [transaction, setTransaction] = useState({
    trans: "",
    date: "",
    amount: null,
    type: "",
    category: "",
    description: "",
    tags: "",
  });

  const dateNum = (Str) => {
    const monthArr = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const newMonthArr = Str.split("-");
    return monthArr[Number(newMonthArr[1]) - 1] + " " + newMonthArr[2];
  };

  const navigate = useNavigate();

  const handleTextChange = (event) => {
    setTransaction({ ...transaction, [event.target.id]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newTransDate = { ...transaction, date: dateNum(transaction.date) };

    axios
      .post(`${process.env.REACT_APP_API_URL}/transactions`, newTransDate)
      .then((res) => {
        navigate("/transactions");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="newtrans">
      <form onSubmit={handleSubmit}>
        <label htmlFor="trans">Trans:</label>
        <input
          id="trans"
          value={transaction.trans}
          type="text"
          onChange={handleTextChange}
          placeholder="Transaction"
          required
        />
        <label htmlFor="date">Date:</label>
        <input
          id="date"
          value={transaction.date}
          type="date"
          onChange={handleTextChange}
          placeholder="Date"
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
    </div>
  );
}

export default TransactionNewForm;
