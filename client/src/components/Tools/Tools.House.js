import React, { useState, useContext } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Context from "../../context/Context";
import ToTopBtn from "../ToTopBtn";
import { Divider } from "../../styles/styled/StyledComponents";

const ToolsHouse = ({ handleFloatBlur, handleIntBlur }) => {
  const { setNotification } = useContext(Context);
  const [houseView, setHouseView] = useState("overall");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [deposit, setDeposit] = useState("");
  const [mortgageRate, setMortgageRate] = useState("");
  const [years, setYears] = useState("");
  const [growth, setGrowth] = useState("");

  const isValid = () =>
    purchasePrice && deposit && mortgageRate && years && growth;

  const defaultData = [
    {
      year: 0,
      cumulativePostFinanceCashflow: 0,
      cumulativeMortgagePayment: 0,
      cumulativeHouseCashflow: 0,
    },
  ];

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
          ? Math.round(postFinanceCashflow)
          : Math.round(
              data[x - 1].cumulativePostFinanceCashflow + postFinanceCashflow
            );

      const cumulativeMortgagePayment =
        x === 0
          ? Math.round(-loanInstallment - principalRepayment)
          : Math.round(
              data[x - 1].cumulativeMortgagePayment -
                loanInstallment -
                principalRepayment
            );

      const cumulativeHouseCashflow =
        x === 0
          ? Math.round(-purchasePrice)
          : Math.round(data[x - 1].cumulativeHouseCashflow + sale);

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
        cumulativeMortgagePayment,
        cumulativeHouseCashflow,
      });
    }
  };
  dataSetCalc();

  let dataKey;
  let message;
  switch (houseView) {
    case "house":
      dataKey = "cumulativeHouseCashflow";
      message = `you flipped the house for a ${
        data[data.length - 1].cumulativeHouseCashflow > 0 ? "profit" : "loss"
      } of ${new Intl.NumberFormat("en").format(
        data[data.length - 1].cumulativeHouseCashflow
      )} bucks`;
      break;
    case "mortgage":
      dataKey = "cumulativeMortgagePayment";
      message = `the mortgage costs you ${new Intl.NumberFormat("en").format(
        -data[data.length - 1].cumulativeMortgagePayment
      )} bucks`;
      break;
    case "overall":
      dataKey = "cumulativePostFinanceCashflow";
      message = `you ${
        data[data.length - 1].cumulativePostFinanceCashflow > 0
          ? "made"
          : "lost"
      } ${new Intl.NumberFormat("en").format(
        data[data.length - 1].cumulativePostFinanceCashflow
      )} bucks after ${years} years`;
      break;
    default:
      dataKey = "cumulativePostFinanceCashflow";
      message = `you ${
        data[data.length - 1].cumulativePostFinanceCashflow > 0
          ? "made"
          : "lost"
      } ${new Intl.NumberFormat("en").format(
        data[data.length - 1].cumulativePostFinanceCashflow
      )} bucks after ${years} years`;
  }

  const CustomTooltip = ({ payload, active }) => {
    if (active && isValid()) {
      return (
        <div className="custom-tooltip">
          <p className="year">
            year:{" "}
            {`${new Intl.NumberFormat("en").format(payload[0].payload.year)}`}
          </p>
          <p className="position">
            cumulative position:{" "}
            {`${new Intl.NumberFormat("en").format(
              payload[0].payload[dataKey]
            )}`}
          </p>
        </div>
      );
    }

    return null;
  };

  const handleChange = (e) => {
    if (isValid()) {
      setHouseView(e.target.value);
    } else {
      setNotification({
        type: "fail",
        title: "¯\\_(ツ)_/¯",
        message: "update all inputs to see results",
      });
    }
  };

  const handleClear = (e) => {
    e.preventDefault();
    setPurchasePrice("");
    setDeposit("");
    setMortgageRate("");
    setYears("");
    setGrowth("");
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
        <ToTopBtn />
      </div>
      <div className="w100 tool-instruction-wrapper">
        <h3>inputs</h3>
        <ol>
          <li>
            <b>purchase price:</b> the amount the house costs to buy today
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
            <b>growth:</b> the annual growth in price of the house
          </li>
        </ol>
      </div>
      <div className="flex-col tool-inputs-wrapper">
        <div className="w100 flex-row-center tool-input-wrapper">
          <input
            className="box-shadow-3"
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
          <span>{purchasePrice > 0 ? "price" : null}</span>
        </div>
        <div className="w100 flex-row-center tool-input-wrapper">
          <input
            className="box-shadow-3"
            placeholder="deposit"
            value={deposit}
            onChange={({ target }) => setDeposit(parseInt(target.value) || "")}
            onBlur={({ target }) => handleIntBlur(target, setDeposit)}
            type="number"
            min="0"
            max="100000000"
            step="1"
          />
          <span>{deposit > 0 ? "deposit" : null}</span>
        </div>
        <div className="w100 flex-row-center tool-input-wrapper">
          <input
            className="box-shadow-3"
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
            className="box-shadow-3"
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
            className="box-shadow-3"
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
        <button
          onClick={handleClear}
          className="tool-clear-btn secondary-btn box-shadow-3"
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
              value="house"
              defaultChecked={houseView === "house"}
            />
            <label htmlFor="house">
              house purchase/sale only (excl. mortgage payments)
            </label>
          </div>
          <div className="flex-row tool-radio">
            <input
              type="radio"
              name="output"
              value="mortgage"
              defaultChecked={houseView === "mortgage"}
            />
            <label htmlFor="mortgage">
              mortgage payments only (excl. house purchase/sale)
            </label>
          </div>
          <div className="flex-row tool-radio">
            <input
              type="radio"
              name="output"
              value="overall"
              defaultChecked={houseView === "overall"}
            />
            <label htmlFor="other">
              total (house puchase/sale + mortage payments)
            </label>
          </div>
        </div>
        <h2>results</h2>
        <p className="tool-result">
          {isValid() ? message : "...waiting for inputs"}
        </p>
      </div>
      <div className="tool-chart-wrapper">
        <ResponsiveContainer>
          <LineChart data={isValid() ? data : defaultData}>
            <Line type="monotone" dataKey={dataKey} stroke="#000000" />
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
      <div className="tool-chart-footer">
        <b>note:</b>
        <ul>
          <li>
            this calculator doesn't factor in tax, agents fees, legal costs, or
            operatings costs of ownership etc
          </li>
          <li>
            for a more detailed calculation, visit our partners at{" "}
            <span className="tool-link" onClick={handleLink}>
              <u>PropertyInvestorDASH</u>
            </span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default ToolsHouse;
