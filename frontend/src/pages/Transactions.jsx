import { Title } from "react-head";
import TransactionsUpload from "./TransactionsUpload";
import TransactionsList from "./TransactionsList";
import { useState } from "react";

export default function Transactions() {
  const [refreshList, setRefreshList] = useState(false);

  const handleUpload = () => {
    setRefreshList(true);
  };
  return (
    <>
      <Title>Transactions - Finance Dashboard</Title>
      <div className="container pt-3">
        <h2>Transactions</h2>
        <TransactionsUpload onUpload={handleUpload} />
        <TransactionsList refreshList={refreshList} />
      </div>
    </>
  );
}
