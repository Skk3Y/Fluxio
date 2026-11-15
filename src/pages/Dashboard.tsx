
import {
  ArrowUpRight,
  ArrowDownRight,
  CalendarDays,
  Download,
  TrendingUp,
  ShoppingBag,
  Users,
  Wallet,
  MoreHorizontal,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

const chartData = [
  { day: "1 ноя", revenue: 12000 },
  { day: "4 ноя", revenue: 18500 },
  { day: "7 ноя", revenue: 15000 },
  { day: "10 ноя", revenue: 26000 },
  { day: "13 ноя", revenue: 22000 },
  { day: "16 ноя", revenue: 34000 },
  { day: "19 ноя", revenue: 29000 },
  { day: "22 ноя", revenue: 41000 },
  { day: "25 ноя", revenue: 36000 },
  { day: "28 ноя", revenue: 52000 },
  { day: "30 ноя", revenue: 48000 },
];

const stats = [
  {
    title: "Общая выручка",
    value: "₽4 829 400",
    change: "+12,8%",
    description: "к предыдущему периоду",
    icon: Wallet,
    positive: true,
  },
  {
    title: "Всего заказов",
    value: "1 284",
    change: "+8,2%",
    description: "к предыдущему периоду",
    icon: ShoppingBag,
    positive: true,
  },
  {
    title: "Активные клиенты",
    value: "842",
    change: "+5,4%",
    description: "к предыдущему периоду",
    icon: Users,
    positive: true,
  },
  {
    title: "Возвраты",
    value: "2,14%",
    change: "-0,8%",
    description: "к предыдущему периоду",
    icon: TrendingUp,
    positive: true,
  },
];

const orders = [
  { id: "#FL-2841", customer: "Александр Смирнов", product: "Премиум подписка", amount: "₽12 900", status: "Завершён" },
  { id: "#FL-2840", customer: "Мария Иванова", product: "Базовый тариф", amount: "₽4 900", status: "В обработке" },
  { id: "#FL-2839", customer: "Дмитрий Козлов", product: "Бизнес тариф", amount: "₽24 900", status: "Завершён" },
  { id: "#FL-2838", customer: "Екатерина Волкова", product: "Премиум подписка", amount: "₽12 900", status: "Отменён" },
];

export default function Dashboard({ onExport }: { onExport: () => void }) {
  return (
    <main className="dashboard">
      <motion.div
        className="page-heading"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1>Добрый день, SKK3Y 👋</h1>
          <p>Вот что происходит с вашим бизнесом сегодня.</p>
        </div>

        <div className="heading-actions">
          <button className="secondary-button">
            <CalendarDays size={17} />
            Последние 30 дней
          </button>
          <button className="primary-button" onClick={onExport}>
            <Download size={17} />
            Экспорт отчёта
          </button>
        </div>
      </motion.div>

      <section className="stats-grid">
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <motion.div
              className="stat-card"
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <div className="stat-top">
                <span className="stat-title">{stat.title}</span>
                <div className="stat-icon">
                  <Icon size={19} />
                </div>
              </div>

              <div className="stat-value">{stat.value}</div>

              <div className="stat-bottom">
                <span className="stat-change positive">
                  {stat.positive ? <ArrowUpRight size={15} /> : <ArrowDownRight size={15} />}
                  {stat.change}
                </span>
                <span className="stat-description">{stat.description}</span>
              </div>
            </motion.div>
          );
        })}
      </section>

      <motion.section
        className="analytics-panel"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="panel-heading">
          <div>
            <h2>Динамика выручки</h2>
            <p>Изменение дохода за ноябрь 2026</p>
          </div>
          <button className="icon-button">
            <MoreHorizontal size={20} />
          </button>
        </div>

        <div className="chart-summary">
          <strong>₽4 829 400</strong>
          <span className="stat-change positive">
            <ArrowUpRight size={15} /> 12,8%
          </span>
        </div>

        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7185f5" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#7185f5" stopOpacity={0.01} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="4 4" stroke="#dfe3ef" vertical={false} />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#9299aa", fontSize: 12 }} />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9299aa", fontSize: 12 }}
                tickFormatter={(value) => `${value / 1000}k`}
              />
              <Tooltip
                formatter={(value) => [`₽${Number(value).toLocaleString("ru-RU")}`, "Выручка"]}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid rgba(255,255,255,.8)",
                  background: "rgba(255,255,255,.9)",
                  backdropFilter: "blur(12px)",
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#7185f5"
                strokeWidth={3}
                fill="url(#revenueGradient)"
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.section>

      <motion.section
        className="orders-panel"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="panel-heading">
          <div>
            <h2>Последние заказы</h2>
            <p>Недавно поступившие операции</p>
          </div>
          <button className="secondary-button">Все заказы <ArrowUpRight size={15} /></button>
        </div>

        <div className="orders-table-wrap">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Заказ</th>
                <th>Клиент</th>
                <th>Продукт</th>
                <th>Сумма</th>
                <th>Статус</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="order-id">{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.product}</td>
                  <td className="order-amount">{order.amount}</td>
                  <td>
                    <span className={`order-status ${
                      order.status === "Завершён"
                        ? "completed"
                        : order.status === "Отменён"
                        ? "cancelled"
                        : "pending"
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>
    </main>
  );
}
