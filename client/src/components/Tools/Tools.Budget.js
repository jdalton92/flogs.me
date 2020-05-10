import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import ToolsToTopBtn from "./Tools.ToTopBtn";
import ToolsBudgetTable from "./Tools.Budget.Table";
import { Divider } from "../../styles/StyledComponents";

const ToolsBudget = ({ handleIntBlur }) => {
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const colors = [
    "#000000",
    "#333333",
    "#666666",
    "#999999",
    "#CCCCCC",
    "#EEEEEE",
  ];

  const data = [
    { name: "Group A", value: 5 },
    { name: "Group B", value: 4 },
    { name: "Group C", value: 1 },
    { name: "Group D", value: 1 },
  ];

  const isValid = () => null; //TO DO

  const defaultData = [
    //TO DO
  ];

  const CustomTooltip = ({ payload, active }) => {
    // if (active && isValid()) {
    //   return (
    //     <div className="custom-tooltip">
    //       <p className="year">
    //         year:{" "}
    //         {`${new Intl.NumberFormat("en").format(payload[0].payload.year)}`}
    //       </p>
    //       <p className="position">
    //         cumulative position:{" "}
    //         {`${new Intl.NumberFormat("en").format(
    //           payload[0].payload[dataKey]
    //         )}`}
    //       </p>
    //     </div>
    //   );
    // }

    return null;
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
            <b>income:</b> income after tax
          </li>
          <li>
            <b>add expense:</b> add up to [PLACEHOLDER] expenses
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
        <button onClick={handleClear} className="tool-clear-btn secondary-btn">
          clear
        </button>
      </div>
      <div className="tool-summary-wrapper">
        <h2>results</h2>
        <p className="tool-result">
          {isValid() ? "PLACEHOLDER" : "...waiting for inputs"}
        </p>
      </div>
      <div className="tool-chart-wrapper">
        <ResponsiveContainer>
          <PieChart>
            <Pie dataKey="value" data={data}>
              {data.map((d, i) => (
                <Cell key={i} fill={colors[i % colors.length]} label />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default ToolsBudget;
