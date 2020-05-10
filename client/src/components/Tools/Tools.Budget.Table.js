import React, { useState, useContext } from "react";
import Context from "../../context/Context";
import { v4 as uuid } from "uuid";

const ToolsBudgetTable = ({ handleIntBlur, title, data, setData }) => {
  const { setNotification } = useContext(Context);
  const [description, setDescription] = useState("");
  const [weekly, setWeekly] = useState("");
  const [monthly, setMonthly] = useState("");
  const [annual, setAnnual] = useState("");

  const addItem = (e) => {
    e.preventDefault();
    if (isValid()) {
      setData([
        ...data,
        {
          description,
          amount: annual,
          id: uuid(),
        },
      ]);
      setWeekly("");
      setMonthly("");
      setAnnual("");
    } else {
      setNotification({
        type: "fail",
        title: "¯\\_(ツ)_/¯",
        message: "fill in description and amount to add",
      });
    }
  };

  const deleteItem = (id) => {
    const newData = data.filter((e) => e.id !== id);
    setData(newData);
  };

  const handleNumberChange = (e) => {
    if (e.target.name === "weekly") {
      setWeekly(parseInt(e.target.value) || "");
      setMonthly(parseInt((e.target.value * 52) / 12) || "");
      setAnnual(parseInt(e.target.value * 52) || "");
    } else if (e.target.name === "monthly") {
      setWeekly(parseInt((e.target.value * 12) / 52) || "");
      setMonthly(parseInt(e.target.value) || "");
      setAnnual(parseInt(e.target.value * 12) || "");
    } else if (e.target.name === "annual") {
      setWeekly(parseInt(e.target.value / 52) || "");
      setMonthly(parseInt(e.target.value / 12) || "");
      setAnnual(parseInt(e.target.value) || "");
    }
  };

  const isValid = () => description && weekly && monthly && annual;

  return (
    <table className="w100 tool-table-wrapper">
      <thead>
        <tr className="flex-row">
          <th className="flex-1">{title}</th>
          <th className="flex-1">amount p.w.</th>
          <th className="flex-1">amount p.m.</th>
          <th className="flex-1">amount p.a.</th>
          <th className="tool-table-action"></th>
        </tr>
      </thead>
      <tbody>
        <tr key={title} className="flex-row">
          <td className="flex-1">
            <input
              placeholder="description"
              value={description}
              onChange={({ target }) => setDescription(target.value || "")}
              type="text"
              minLength={0}
              maxLength={50}
            />
          </td>
          <td className="flex-1">
            <input
              placeholder="weekly amount"
              name="weekly"
              value={weekly}
              onChange={handleNumberChange}
              onBlur={({ target }) => handleIntBlur(target, setWeekly)}
              type="number"
              min="0"
              max="1000000"
              step="1"
            />
          </td>
          <td className="flex-1">
            <input
              name="monthly"
              placeholder="monthly amount"
              value={monthly}
              onChange={handleNumberChange}
              onBlur={({ target }) => handleIntBlur(target, setMonthly)}
              type="number"
              min="0"
              max="1000000"
              step="1"
            />
          </td>
          <td className="flex-1">
            <input
              name="annual"
              placeholder="annual amount"
              value={annual}
              onChange={handleNumberChange}
              onBlur={({ target }) => handleIntBlur(target, setAnnual)}
              type="number"
              min="0"
              max="1000000"
              step="1"
            />
          </td>
          <td className="tool-table-action">
            <button
              onClick={addItem}
              type="button"
              className="primary-btn tool-table-add"
              // disabled={!isValid()}
            >
              add
            </button>
          </td>
        </tr>
        {data.map((d) => (
          <tr className="flex-row tool-table-row" key={d.id}>
            <td className="flex-1">{d.description}</td>
            <td className="flex-1">{parseInt(d.amount / 52)}</td>
            <td className="flex-1">{parseInt(d.amount / 12)}</td>
            <td className="flex-1">{parseInt(d.amount)}</td>
            <td className="tool-table-action">
              <button
                onClick={() => deleteItem(d.id)}
                type="button"
                className="secondary-btn tool-table-delete"
              >
                x
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ToolsBudgetTable;
