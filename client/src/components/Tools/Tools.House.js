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

const ToolsHouse = ({ handleFloatBlur, handleIntBlur }) => {
  const [purchasePrice, setPurchasePrice] = useState(100);
  const [deposit, setDeposit] = useState(10);
  const [mortgageRate, setMortgageRate] = useState(3);
  const [years, setYears] = useState(10);
  const [growth, setGrowth] = useState(5);

  const isValid = () =>
    purchasePrice && deposit && mortgageRate && years && growth;

  const defaultData = [{ year: 0, house: 0, mortgage: 0 }];
  let data = [];

  const dataSetCalc = () => {
    const g = growth / 100;
    const r = mortgageRate / 100;
    let openingBalance = 0;
    let closingBalance = 0;

    for (let x = 0; x <= years; x++) {
      const acquisition = x === 0 ? purchasePrice : null;

      const sale = x === years ? purchasePrice * Math.pow(1 + g, x) : null;

      const debtUse = x === 0 ? purchasePrice - deposit : null;
      const equityUse = x === 0 ? deposit : null;

      openingBalance = closingBalance + debtUse;

      const openingBalanceInterest = openingBalance * (1 + r);

      const annualMortgagePayment =
        ((purchasePrice - deposit) * r) / (1 - Math.pow(1 + r, -30));

      const loanInstallment =
        annualMortgagePayment > openingBalanceInterest
          ? openingBalanceInterest
          : annualMortgagePayment;

      const principalRepayment =
        x === years ? openingBalanceInterest - loanInstallment : null;

      closingBalance =
        openingBalanceInterest - loanInstallment - principalRepayment;

      const preFinanceCashflow = -acquisition + sale;

      const postFinanceCashflow =
        preFinanceCashflow + debtUse - loanInstallment - principalRepayment;

      const cumulativePostFinanceCashflow =
        x === 0
          ? postFinanceCashflow
          : data[x - 1].cumulativePostFinanceCashflow + postFinanceCashflow;

      data.push({
        year: x,
        acquisition,
        sale,
        preFinanceCashflow,
        openingBalance,
        equityUse,
        debtUse,
        interest: openingBalanceInterest - openingBalance,
        loanInstallment,
        principalRepayment,
        closingBalance,
        postFinanceCashflow,
        cumulativePostFinanceCashflow,
      });
    }
  };
  dataSetCalc();

  console.log("data: ", data);

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
              payload[0].payload.cumulativePostFinanceCashflow
            )}`}
          </p>
        </div>
      );
    }

    return null;
  };

  const handleLink = (e) => {
    e.preventDefault();
    const win = window.open("https://www.propertyinvestordash.com", "_blank");
    if (win != null) {
      win.focus();
    }
  };

  return (
    <>
      <div className="tool-header-wrapper">
        <h2>buy a house</h2>
        <Divider width={"100%"} />
        <ToolsToTopBtn />
      </div>
      <div className="w100 tool-instruction-wrapper">
        <h3>inputs</h3>
        <ol>
          <li>
            <b>purchase price:</b> the amount the house costs
          </li>
          <li>
            <b>desposit:</b> the size of the deposit
          </li>
          <li>
            <b>mortgage rate:</b> the interest rate of the mortgage repayments
            (assumming 30 year principal and interest repayment)
          </li>
          <li>
            <b>years:</b> the total number of years you will own the house
          </li>
          <li>
            <b>growth:</b> the annual compounding growth in price of the house
          </li>
        </ol>
      </div>
      <div className="flex-col tool-inputs-wrapper">
        <div className="w100 flex-row-center tool-input-wrapper">
          <input
            placeholder="purchase price"
            value={purchasePrice}
            onChange={({ target }) =>
              setPurchasePrice(parseInt(target.value) || "")
            }
            onBlur={({ target }) => handleIntBlur(target, setPurchasePrice)}
            type="number"
            min="0"
            max="100000000"
            step="1"
          />
        </div>
        <div className="w100 flex-row-center tool-input-wrapper">
          <input
            placeholder="deposit"
            value={deposit}
            onChange={({ target }) => setDeposit(parseInt(target.value) || "")}
            onBlur={({ target }) => handleIntBlur(target, setDeposit)}
            type="number"
            min="0"
            max="100000000"
            step="1"
          />
        </div>
        <div className="w100 flex-row-center tool-input-wrapper">
          <input
            placeholder="mortgage rate"
            value={mortgageRate}
            onChange={({ target }) =>
              setMortgageRate(parseFloat(target.value) || "")
            }
            onBlur={({ target }) => handleFloatBlur(target, setMortgageRate)}
            type="number"
            min="0"
            max="100"
            step="0.1"
          />
          <span>{mortgageRate > 0 ? "% p.a." : null}</span>
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
        {/* {isValid()
          ? `you made ${new Intl.NumberFormat("en").format(
              data[data.length - 1].balance
            )} bucks after ${years} years`
          : "...waiting for inputs"} */}
      </div>
      <div className="tool-chart-wrapper">
        <ResponsiveContainer>
          <LineChart data={isValid() ? data : defaultData}>
            <Line
              type="monotone"
              dataKey="cumulativePostFinanceCashflow"
              stroke="#000000"
            />
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
      <p>
        for a more detailed calculation, visit our partners at{" "}
        <span className="tool-link" onClick={handleLink}>
          <u>PropertyInvestorDASH</u>
        </span>
      </p>
    </>
  );
};

export default ToolsHouse;
