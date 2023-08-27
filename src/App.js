import { useState } from "react";
import Form from "./components/Form/Form";
import Header from "./components/Header/Header";
import Table from "./components/Table/Table";

const App = () => {
  const [userInput, setUserInput] = useState(null);
  const calculateHandler = (userInput) => {
    setUserInput(userInput);
  };

  const yearlyData = [];
  if (userInput) {
    let currentSavings = +userInput["current-savings"];
    const yearlyContribution = +userInput["yearly-contribution"];
    const expectedReturn = +userInput["expected-return"] / 100;
    const duration = +userInput["duration"];

    // The below code calculates yearly results (total savings, interest etc)
    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyData.push({
        year: i + 1,
        yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution,
      });
    }
  }

  return (
    <div>
      <Header />

      <Form onCalculate={calculateHandler} />

      {!userInput && <p>No Investment Data.</p>}
      {userInput && (
        <Table
          data={yearlyData}
          initialInvestment={userInput["current-savings"]}
        />
      )}
    </div>
  );
};

export default App;
