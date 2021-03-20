import "./App.css";
import LoanCard from "./components/LoanCard";
import CurrentLoansData from "./dataService/current-loans.json";

function App() {
  const { loans } = CurrentLoansData;
  return (
    <div className="app">
      <div className="grey-box">
        <h1 className="heading">Current Loans</h1>
        {loans.map((loan) => {
          return <LoanCard loan={loan} />;
        })}
      </div>
    </div>
  );
}

export default App;
