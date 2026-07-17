import { useState } from "react";
import { CATEGORY_COLORS, FALLBACK_COLOR } from "./categoryColors";

const money = (n) =>
  n.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const ledgerDate = (isoDate) => {
  const [year, month, day] = isoDate.split("-");
  return `${month}.${day}.${year.slice(2)}`;
};

function TransactionList({ transactions, categories, onDelete }) {
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  // Running balance reflects the true account order regardless of the
  // active filter, so a filtered view still shows each entry's real
  // balance-as-of that point — not a balance over just the visible rows.
  let running = 0;
  const balanceById = new Map();
  transactions.forEach((t) => {
    running += t.type === "income" ? t.amount : -t.amount;
    balanceById.set(t.id, running);
  });

  let filtered = transactions;
  if (filterType !== "all") {
    filtered = filtered.filter((t) => t.type === filterType);
  }
  if (filterCategory !== "all") {
    filtered = filtered.filter((t) => t.category === filterCategory);
  }

  return (
    <div className="transactions">
      <div className="transactions-header">
        <h2>Register</h2>
        <div className="filters">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th className="numeric">Debit</th>
              <th className="numeric">Credit</th>
              <th className="numeric">Balance</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr className="empty-row">
                <td colSpan={7}>No entries match these filters.</td>
              </tr>
            ) : (
              filtered.map((t) => {
                const badgeColor = CATEGORY_COLORS[t.category] || FALLBACK_COLOR;
                return (
                  <tr key={t.id}>
                    <td className="date">{ledgerDate(t.date)}</td>
                    <td>{t.description}</td>
                    <td>
                      <span
                        className="category-badge"
                        style={{ color: badgeColor }}
                      >
                        {t.category}
                      </span>
                    </td>
                    <td className="numeric debit-cell">
                      {t.type === "expense" ? money(t.amount) : ""}
                    </td>
                    <td className="numeric credit-cell">
                      {t.type === "income" ? money(t.amount) : ""}
                    </td>
                    <td className="numeric balance-cell">
                      {money(balanceById.get(t.id))}
                    </td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => {
                          if (window.confirm("Are you sure you want to delete this transaction?")) {
                            onDelete(t.id);
                          }
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionList;
