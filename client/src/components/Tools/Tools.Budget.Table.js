import React, { useState, useContext } from "react";
import Context from "../../context/Context";
import { v4 as uuid } from "uuid";

const ToolsBudgetTable = ({ handleIntBlur, title, data, setData }) => {
  const { setNotification } = useContext(Context);
  const [description, setDescription] = useState("");
  const [weekly, setWeekly] = useState("");
  const [monthly, setMonthly] = useState("");
  const [annual, setAnnual] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();

    if (data.length > 6) {
      setNotification({
        type: "fail",
        title: "¯\\_(ツ)_/¯",
        message: "max 6 income, or expense items",
      });
      return;
    }
    if (isValid()) {
      setData([
        ...data,
        {
          description,
          amount: annual,
          id: uuid(),
        },
      ]);
      setDescription("");
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
    <form className="tool-table-form" onSubmit={handleAdd}>
      <table className="w100 tool-table-wrapper">
        <thead>
          <tr className="flex-row">
            <th className="flex-1">{title}</th>
            <th className="flex-1">amount p.w.</th>
            <th className="flex-1 tool-desktop-input">amount p.m.</th>
            <th className="flex-1 tool-desktop-input">amount p.a.</th>
            <th className="tool-table-action"></th>
          </tr>
        </thead>
        <tbody>
          <tr key={title} className="flex-row">
            <td className="flex-1">
              <input
                className="box-shadow-3"
                placeholder="description"
                value={description}
                onChange={({ target }) => setDescription(target.value || "")}
                type="text"
                minLength={0}
                maxLength={50}
                required
              />
            </td>
            <td className="flex-1">
              <input
                className="box-shadow-3"
                placeholder="weekly amount"
                name="weekly"
                value={weekly}
                onChange={handleNumberChange}
                onBlur={({ target }) => handleIntBlur(target, setWeekly)}
                type="number"
                min="0"
                max="1000000"
                step="1"
                required
              />
            </td>
            <td className="flex-1 tool-desktop-input">
              <input
                className="box-shadow-3"
                name="monthly"
                placeholder="monthly amount"
                value={monthly}
                onChange={handleNumberChange}
                onBlur={({ target }) => handleIntBlur(target, setMonthly)}
                type="number"
                min="0"
                max="4000000"
                step="1"
                required
              />
            </td>
            <td className="flex-1 tool-desktop-input">
              <input
                className="box-shadow-3"
                name="annual"
                placeholder="annual amount"
                value={annual}
                onChange={handleNumberChange}
                onBlur={({ target }) => handleIntBlur(target, setAnnual)}
                type="number"
                min="0"
                max="52000000"
                step="1"
                required
              />
            </td>
            <td className="tool-table-action">
              <button
                type="submit"
                className="primary-btn tool-table-add box-shadow-3"
                // disabled={!isValid()}
              >
                add
              </button>
            </td>
          </tr>
          {data.map((d) => (
            <tr className="flex-row tool-table-row" key={d.id}>
              <td className="flex-1">{d.description}</td>
              <td className="flex-1">
                {new Intl.NumberFormat("en").format(parseInt(d.amount / 52))}
              </td>
              <td className="flex-1 tool-desktop-input">
                {new Intl.NumberFormat("en").format(parseInt(d.amount / 12))}
              </td>
              <td className="flex-1 tool-desktop-input">
                {new Intl.NumberFormat("en").format(parseInt(d.amount))}
              </td>
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
    </form>
  );
};

export default ToolsBudgetTable;
