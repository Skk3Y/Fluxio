
import { useMemo, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  TrendingUp,
  Wallet,
  ShoppingBag,
  Users,
  ArrowUpRight,
  CalendarDays,
} from "lucide-react";

const periods = {
  "7 дней": {
    labels: ["9 ноя", "10 ноя", "11 ноя", "12 ноя", "13 ноя", "14 ноя", "15 ноя"],
    values: [12500, 18000, 15000, 24000, 21000, 31000, 38500],
    total: "₽185 000",
    growth: "+8,4%",
  },
  "30 дней": {
    labels: ["1 ноя", "4 ноя", "7 ноя", "10 ноя", "13 ноя", "16 ноя", "19 ноя", "22 ноя", "25 ноя", "28 ноя", "30 ноя"],
    values: [12000, 18500, 15000, 26000, 22000, 34000, 29000, 41000, 36000, 52000, 48000],
    total: "₽4 829 400",
    growth: "+12,8%",
  },
  "12 месяцев": {
    labels: ["Дек", "Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя"],
    values: [18000, 22000, 26000, 21000, 35000, 31000, 42000, 39000, 48000, 44000, 57000, 65000],
    total: "₽38 420 000",
    growth: "+18,6%",
  },
};

const categories = [
  { name: "Премиум подписка", value: 45, color: "#7185f5" },
  { name: "Бизнес тариф", value: 30, color: "#a17bea" },
  { name: "Базовый тариф", value: 25, color: "#70c9d8" },
];

const money = (value: number) =>
  `₽${value.toLocaleString("ru-RU")}`;

export default function Analytics() {
  const [period, setPeriod] = useState<keyof typeof periods>("30 дней");
  const current = periods[period];

  const chartData = useMemo(
    () =>
      current.labels.map((label, index) => ({
        label,
        revenue: current.values[index],
      })),
    [current]
  );

  const metrics = [
    {
      title: "Выручка",
      value: current.total,
      change: current.growth,
      icon: Wallet,
    },
    {
      title: "Заказы",
      value: "1 284",
      change: "+8,2%",
      icon: ShoppingBag,
    },
    {
      title: "Клиенты",
      value: "842",
      change: "+5,4%",
      icon: Users,
    },
    {
      title: "Средний чек",
      value: "₽3 762",
      change: "+4,1%",
      icon: TrendingUp,
    },
  ];

  return (
    <main className="dashboard analytics-page">
      <div className="page-heading">
        <div>
          <h1>Аналитика</h1>
          <p>Изучайте показатели и следите за динамикой бизнеса.</p>
        </div>

        <div className="analytics-period">
          <CalendarDays size={17} />
          <span>Период:</span>
          <select
            value={period}
            onChange={(event) =>
              setPeriod(event.target.value as keyof typeof periods)
            }
          >
            {Object.keys(periods).map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
      </div>

      <section className="stats-grid">
        {metrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <div className="stat-card" key={metric.title}>
              <div className="stat-top">
                <span className="stat-title">{metric.title}</span>
                <div className="stat-icon">
                  <Icon size={19} />
                </div>
              </div>
              <div className="stat-value">{metric.value}</div>
              <div className="stat-bottom">
                <span className="stat-change positive">
                  <ArrowUpRight size={15} />
                  {metric.change}
                </span>
                <span className="stat-description">к прошлому периоду</span>
              </div>
            </div>
          );
        })}
      </section>

      <section className="analytics-panel">
        <div className="panel-heading">
          <div>
            <h2>Динамика выручки</h2>
            <p>Изменение дохода за выбранный период</p>
          </div>
          <div className="analytics-growth">
            <ArrowUpRight size={16} />
            {current.growth}
          </div>
        </div>

        <div className="analytics-chart">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="analyticsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7185f5" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#7185f5" stopOpacity={0.01} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="4 4" stroke="#dfe3ef" vertical={false} />
              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9299aa", fontSize: 11 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9299aa", fontSize: 11 }}
                tickFormatter={(value) => `${value / 1000}k`}
              />
              <Tooltip
                formatter={(value) => [money(Number(value)), "Выручка"]}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid rgba(255,255,255,.8)",
                  background: "rgba(255,255,255,.92)",
                  backdropFilter: "blur(12px)",
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#7185f5"
                strokeWidth={3}
                fill="url(#analyticsGradient)"
                activeDot={{ r: 6, strokeWidth: 0 }}
                animationDuration={700}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="analytics-bottom">
        <div className="analytics-panel category-panel">
          <div className="panel-heading">
            <div>
              <h2>Структура продаж</h2>
              <p>Распределение по тарифам</p>
            </div>
          </div>

          <div className="category-chart">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categories}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={5}
                  stroke="none"
                >
                  {categories.map((item) => (
                    <Cell key={item.name} fill={item.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, "Доля"]} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="category-legend">
            {categories.map((item) => (
              <div className="legend-item" key={item.name}>
                <span
                  className="legend-dot"
                  style={{ background: item.color }}
                />
                <span>{item.name}</span>
                <strong>{item.value}%</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="analytics-panel insights-panel">
          <div className="panel-heading">
            <div>
              <h2>Ключевые показатели</h2>
              <p>Сводка за выбранный период</p>
            </div>
          </div>

          <div className="insight-row">
            <span>Конверсия заказов</span>
            <strong>4,82%</strong>
          </div>
          <div className="insight-track">
            <div style={{ width: "48.2%" }} />
          </div>

          <div className="insight-row">
            <span>Повторные покупки</span>
            <strong>32,6%</strong>
          </div>
          <div className="insight-track">
            <div style={{ width: "32.6%" }} />
          </div>

          <div className="insight-row">
            <span>Удержание клиентов</span>
            <strong>76,4%</strong>
          </div>
          <div className="insight-track">
            <div style={{ width: "76.4%" }} />
          </div>

          <div className="insight-note">
            <TrendingUp size={18} />
            <span>Показатели представлены в демонстрационном режиме.</span>
          </div>
        </div>
      </section>
    </main>
  );
}
