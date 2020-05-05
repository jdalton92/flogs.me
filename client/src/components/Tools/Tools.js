import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "../../styles/Tools.css";

const Tools = () => {
  const [annualContribution, setAnnualContribution] = useState("");
  const [years, setYears] = useState("");
  const [growth, setGrowth] = useState("");

  const handleFloatBlur = (target, setFunction) => {
    const { value, min, max } = target;

    if (isNaN(value) || value === "") {
      return;
    }

    if (value > parseInt(max)) {
      setFunction(parseFloat(max).toFixed(2));
    } else if (value < parseInt(min)) {
      setFunction(parseFloat(min).toFixed(2));
    } else {
      setFunction(parseFloat(value).toFixed(2));
    }
  };

  const handleIntBlur = (target, setFunction) => {
    const { value, min, max } = target;

    if (isNaN(value) || value === "") {
      return;
    }

    if (value > parseInt(max)) {
      setFunction(parseInt(max));
    } else if (value < parseInt(min)) {
      setFunction(parseInt(min));
    } else {
      setFunction(parseInt(value));
    }
  };

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
    <section className="flex-col-center tools-section">
      <div className="flex-col tools-inputs-wrapper">
        <div className="w100 flex-row-center tools-input-wrapper">
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
        <div className="w100 flex-row-center tools-input-wrapper">
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
        <div className="w100 flex-row-center tools-input-wrapper">
          <input
            placeholder="annual growth"
            name="growth"
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
      <div className="tools-summary-wrapper">
        {isValid()
          ? `you have ${new Intl.NumberFormat("en").format(
              data[data.length - 1].balance
            )} bucks after ${years} years`
          : "input some assumptions above, and your savings growth will be forecast below"}
      </div>
      <div className="tools-chart-wrapper">
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
    </section>
  );
};

export default Tools;
