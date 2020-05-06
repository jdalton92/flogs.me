import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ToolsToTopBtn from "./Tools.ToTopBtn";
import { Divider } from "../../styles/StyledComponents";

const ToolsCompounding = ({ handleFloatBlur, handleIntBlur }) => {
  const [annualContribution, setAnnualContribution] = useState("");
  const [years, setYears] = useState("");
  const [growth, setGrowth] = useState("");

  const isValid = () => annualContribution && years && growth;
  const defaultData = [{ year: 0, balance: 0 }];
  let data = [];
  const dataSetCalc = () => {
    for (let x = 0; x <= years; x++) {
      data.push({
        year: x,
        balance: Math.round(
          data.length > 0
            ? annualContribution + data[x - 1].balance * (1 + growth / 100)
            : annualContribution
        ),
      });
    }
  };
  dataSetCalc();

  const CustomTooltip = ({ payload, active }) => {
    if (active && isValid()) {
      return (
        <div className="custom-tooltip">
          <p className="year">
            year:{" "}
            {`${new Intl.NumberFormat("en").format(payload[0].payload.year)}`}
          </p>
          <p className="balance">
            balance:{" "}
            {`${new Intl.NumberFormat("en").format(
              payload[0].payload.balance
            )}`}
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <div className="tool-header-wrapper">
        <h2>compounding savings calculator</h2>
        <Divider width={"100%"} />
        <ToolsToTopBtn />
      </div>
      <div className="w100 tool-instruction-wrapper">
        <h3>inputs</h3>
        <ol>
          <li>
            <b>annual contribution:</b> the amount you will be savings each year
          </li>
          <li>
            <b>years:</b> the total number of years you will be saving for (up
            to 100 years)
          </li>
          <li>
            <b>growth:</b> the annual compounding percent return on your savings
            (up to 100% p.a.)
          </li>
        </ol>
      </div>
      <div className="flex-col tool-inputs-wrapper">
        <div className="w100 flex-row-center tool-input-wrapper">
          <input
            placeholder="annual contribution"
            value={annualContribution}
            onChange={({ target }) =>
              setAnnualContribution(parseInt(target.value) || "")
            }
            onBlur={({ target }) =>
              handleIntBlur(target, setAnnualContribution)
            }
            type="number"
            min="0"
            max="1000000"
            step="1"
          />
          <span>{annualContribution > 0 ? "p.a." : null}</span>
        </div>
        <div className="w100 flex-row-center tool-input-wrapper">
          <input
            placeholder="years"
            value={years}
            onChange={({ target }) => setYears(parseInt(target.value) || "")}
            onBlur={({ target }) => handleIntBlur(target, setYears)}
            type="number"
            min="0"
            max="100"
            step="1"
          />
          <span>{years > 0 ? "years" : null}</span>
        </div>
        <div className="w100 flex-row-center tool-input-wrapper">
          <input
            placeholder="annual growth"
            value={growth}
            onChange={({ target }) => setGrowth(parseFloat(target.value) || "")}
            onBlur={({ target }) => handleFloatBlur(target, setGrowth)}
            type="number"
            min="0"
            max="100"
            step="0.1"
          />
          <span>{growth > 0 ? "% p.a." : null}</span>
        </div>
      </div>
      <div className="tool-summary-wrapper">
        <h2>results</h2>
        {isValid()
          ? `you have ${new Intl.NumberFormat("en").format(
              data[data.length - 1].balance
            )} bucks after ${years} years`
          : "...waiting for inputs"}
      </div>
      <div className="tool-chart-wrapper">
        <ResponsiveContainer>
          <LineChart data={isValid() ? data : defaultData}>
            <Line type="monotone" dataKey="balance" stroke="#000000" />
            <XAxis dataKey="year" />
            <YAxis
              tickFormatter={(value) =>
                new Intl.NumberFormat("en").format(value)
              }
            />
            <Tooltip content={<CustomTooltip />} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default ToolsCompounding;
