import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  LabelList,
  ResponsiveContainer,
} from "recharts";
import { CATEGORY_COLORS, FALLBACK_COLOR } from "./categoryColors";

const currency = (value) =>
  `$${Math.round(value).toLocaleString()}`;

function ChartTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) return null;
  const { category, amount, color } = payload[0].payload;
  return (
    <div className="chart-tooltip">
      <span className="chart-tooltip-key" style={{ backgroundColor: color }} />
      <span className="chart-tooltip-value">{currency(amount)}</span>
      <span className="chart-tooltip-label">{category}</span>
    </div>
  );
}

function CategoryChart({ transactions }) {
  const totals = {};
  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      totals[t.category] = (totals[t.category] || 0) + t.amount;
    });

  const data = Object.entries(totals)
    .map(([category, amount]) => ({
      category,
      amount,
      color: CATEGORY_COLORS[category] || FALLBACK_COLOR,
    }))
    .sort((a, b) => b.amount - a.amount);

  return (
    <div className="category-chart">
      <h2>Spending by Category</h2>
      {data.length === 0 ? (
        <p className="chart-empty">No expenses yet — add a transaction to see the breakdown.</p>
      ) : (
        <ResponsiveContainer width="100%" height={Math.max(data.length * 40, 80)}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 4, right: 48, bottom: 4, left: 8 }}
            barCategoryGap="28%"
          >
            <CartesianGrid horizontal={false} stroke="var(--chart-grid)" />
            <XAxis
              type="number"
              tick={{ fill: "var(--chart-muted)", fontSize: 12 }}
              tickFormatter={currency}
              axisLine={{ stroke: "var(--chart-axis)" }}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="category"
              tickFormatter={(value) => value[0].toUpperCase() + value.slice(1)}
              tick={{ fill: "var(--chart-text)", fontSize: 13 }}
              axisLine={{ stroke: "var(--chart-axis)" }}
              tickLine={false}
              width={90}
            />
            <Tooltip cursor={{ fill: "var(--chart-hover)" }} content={<ChartTooltip />} />
            <Bar dataKey="amount" barSize={20} radius={[0, 4, 4, 0]}>
              {data.map((entry) => (
                <Cell key={entry.category} fill={entry.color} />
              ))}
              <LabelList
                dataKey="amount"
                position="right"
                formatter={currency}
                fill="var(--chart-text)"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default CategoryChart;
