import { Title } from "react-head";
import TransactionsUpload from "./TransactionsUpload";
import TransactionsList from "./TransactionsList";

export default function Transactions() {
  return (
    <>
      <Title>Transactions - Finance Dashboard</Title>
      <div className="container pt-3">
        <h2>Transactions</h2>
        <TransactionsUpload />
        <TransactionsList />
      </div>
    </>
  );
}
