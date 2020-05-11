import React, { useState, useContext } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import ToolsToTopBtn from "./Tools.ToTopBtn";
import ToolsBudgetTable from "./Tools.Budget.Table";
import Context from "../../context/Context";
import { Divider } from "../../styles/StyledComponents";

const ToolsBudget = ({ handleIntBlur }) => {
  const { setNotification } = useContext(Context);
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [budgetView, setBudgetView] = useState("annual");

  //Colors of the pie chart slices
  const colors = [
    "#000000",
    "#333333",
    "#666666",
    "#999999",
    "#CCCCCC",
    "#EEEEEE",
  ];

  const isValid = () => income.length > 0 && expenses.length > 0;

  const defaultData = [
    {
      description: "",
      amount: 0,
    },
  ];

  //Find total income & expenses if data is input
  let totalIncome;
  let totalExpenses;
  if (isValid()) {
    totalIncome =
      income.length === 1
        ? income[0].amount
        : income.reduce((a, c) => a + (c.amount || 0), 0);
    totalExpenses =
      expenses.length === 1
        ? expenses[0].amount
        : expenses.reduce((a, c) => a + (c.amount || 0), 0);
  }

  //Transform data to be weekly/monthly/annual
  //data is stored as annual by default
  let viewData;
  let per;
  switch (budgetView) {
    case "weekly":
      totalIncome = Math.round(totalIncome / 52);
      totalExpenses = Math.round(totalExpenses / 52);
      viewData = expenses.map((e) => ({
        ...e,
        amount: Math.round(e.amount / 52),
      }));
      viewData = [
        ...viewData,
        { description: "savings", amount: totalIncome - totalExpenses },
      ];
      per = "per week";
      break;
    case "monthly":
      totalIncome = Math.round(totalIncome / 12);
      totalExpenses = Math.round(totalExpenses / 12);
      viewData = expenses.map((e) => ({
        ...e,
        amount: Math.round(e.amount / 12),
      }));
      viewData = [
        ...viewData,
        { description: "savings", amount: totalIncome - totalExpenses },
      ];
      per = "per month";
      break;
    case "annual":
      viewData = expenses;
      viewData = [
        ...viewData,
        {
          description: "savings",
          amount: Math.round(totalIncome - totalExpenses),
        },
      ];
      per = "per year";
      break;
    default:
      viewData = expenses;
  }

  //Handle "show" view
  const handleChange = (e) => {
    if (isValid()) {
      setBudgetView(e.target.value);
    } else {
      setNotification({
        type: "fail",
        title: "¯\\_(ツ)_/¯",
        message: "add income and expenses to see results",
      });
    }
  };

  const handleClear = (e) => {
    e.preventDefault();
    setIncome([]);
    setExpenses([]);
  };

  return (
    <>
      <div className="tool-header-wrapper">
        <h2>budget calculator</h2>
        <Divider width={"100%"} />
        <ToolsToTopBtn />
      </div>
      <div className="w100 tool-instruction-wrapper">
        <h3>inputs</h3>
        <ol>
          <li>
            <b>income:</b> add up to 6 income sources, and input either
            weekly/monthly/annual allowance
          </li>
          <li>
            <b>add expense:</b> add up to 6 recurring expenses, and input either
            weekly/monthly/annual allowance
          </li>
        </ol>
      </div>
      <div className="flex-col tool-tables-wrapper">
        <ToolsBudgetTable
          handleIntBlur={handleIntBlur}
          title={"income"}
          data={income}
          setData={setIncome}
        />
        <ToolsBudgetTable
          handleIntBlur={handleIntBlur}
          title={"expenses"}
          data={expenses}
          setData={setExpenses}
        />
        <button
          onClick={handleClear}
          className="tool-clear-btn tool-budget-clear secondary-btn"
        >
          clear
        </button>
      </div>
      <div className="tool-summary-wrapper">
        <h2>show</h2>
        <div className="tool-radio-wrapper" onChange={handleChange}>
          <div className="flex-row tool-radio">
            <input
              type="radio"
              name="output"
              value="weekly"
              defaultChecked={budgetView === "weekly"}
            />
            <label htmlFor="weekly">weekly</label>
          </div>
          <div className="flex-row tool-radio">
            <input
              type="radio"
              name="output"
              value="monthly"
              defaultChecked={budgetView === "monthly"}
            />
            <label htmlFor="monthly">monthly</label>
          </div>
          <div className="flex-row tool-radio">
            <input
              type="radio"
              name="output"
              value="annual"
              defaultChecked={budgetView === "annual"}
            />
            <label htmlFor="annual">annual</label>
          </div>
        </div>
        <h2>results</h2>
        <p className="tool-result">
          {isValid()
            ? `you earn ${new Intl.NumberFormat("en").format(
                totalIncome
              )}, spend ${new Intl.NumberFormat("en").format(
                totalExpenses
              )}, and ${
                totalIncome - totalExpenses > 0 ? "save" : "lose"
              } ${new Intl.NumberFormat("en").format(
                totalIncome - totalExpenses
              )} ${per}. See below for summary of expenses`
            : "...waiting for inputs"}
        </p>
      </div>
      <div className="tool-chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={isValid() ? viewData : defaultData}>
            <XAxis dataKey="description" />
            <YAxis
              tickFormatter={(value) =>
                new Intl.NumberFormat("en").format(value)
              }
            />
            <Bar dataKey="amount" fill="#8884d8" label={{ position: "top" }}>
              {viewData.map((d, i) => (
                <Cell key={`cell-${i}`} fill={colors[i % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="tool-chart-footer">
        <b>note:</b>
        <ul>
          <li>this calculator doesn't account for tax</li>
        </ul>
      </div>
    </>
  );
};

export default ToolsBudget;
