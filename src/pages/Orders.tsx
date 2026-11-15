
import { useMemo, useState } from "react";
import {
  Search,
  ShoppingBag,
  SlidersHorizontal,
  X,
} from "lucide-react";

const initialOrders = [
  { id: "#FL-2841", customer: "Александр Смирнов", email: "alex@example.com", product: "Премиум подписка", amount: 12900, status: "Завершён", date: "15 ноя 2026" },
  { id: "#FL-2840", customer: "Мария Иванова", email: "maria@example.com", product: "Базовый тариф", amount: 4900, status: "В обработке", date: "15 ноя 2026" },
  { id: "#FL-2839", customer: "Дмитрий Козлов", email: "dmitry@example.com", product: "Бизнес тариф", amount: 24900, status: "Завершён", date: "14 ноя 2026" },
  { id: "#FL-2838", customer: "Екатерина Волкова", email: "kate@example.com", product: "Премиум подписка", amount: 12900, status: "Отменён", date: "14 ноя 2026" },
  { id: "#FL-2837", customer: "Илья Морозов", email: "ilya@example.com", product: "Базовый тариф", amount: 4900, status: "В обработке", date: "13 ноя 2026" },
  { id: "#FL-2836", customer: "Анна Петрова", email: "anna@example.com", product: "Бизнес тариф", amount: 24900, status: "Завершён", date: "12 ноя 2026" },
  { id: "#FL-2835", customer: "Максим Соколов", email: "max@example.com", product: "Премиум подписка", amount: 12900, status: "Завершён", date: "11 ноя 2026" },
];

const filters = ["Все", "Завершён", "В обработке", "Отменён"];

export default function Orders() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("Все");

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase();

    return initialOrders.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(query) ||
        order.customer.toLowerCase().includes(query) ||
        order.email.toLowerCase().includes(query) ||
        order.product.toLowerCase().includes(query);

      const matchesStatus = status === "Все" || order.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  const formatMoney = (amount: number) =>
    `₽${amount.toLocaleString("ru-RU")}`;

  return (
    <main className="dashboard orders-page">
      <div className="page-heading">
        <div>
          <h1>Заказы</h1>
          <p>Управляйте заказами и отслеживайте их состояние.</p>
        </div>
        <div className="orders-total-badge">
          <ShoppingBag size={16} />
          {initialOrders.length} заказов
        </div>
      </div>

      <section className="orders-panel">
        <div className="orders-toolbar">
          <div className="orders-search">
            <Search size={18} />
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Поиск по заказам, клиентам..."
            />
            {search && (
              <button
                className="clear-search"
                onClick={() => setSearch("")}
                aria-label="Очистить поиск"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="orders-filter">
            <SlidersHorizontal size={16} />
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              aria-label="Фильтр по статусу"
            >
              {filters.map((filter) => (
                <option key={filter} value={filter}>
                  {filter === "Все" ? "Все статусы" : filter}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="orders-results">
          Показано <strong>{filteredOrders.length}</strong> из{" "}
          <strong>{initialOrders.length}</strong> заказов
        </div>

        <div className="orders-table-wrap">
          <table className="orders-table">
            <thead>
              <tr>
                <th>НОМЕР</th>
                <th>КЛИЕНТ</th>
                <th>ПРОДУКТ</th>
                <th>ДАТА</th>
                <th>СУММА</th>
                <th>СТАТУС</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td className="order-id">{order.id}</td>
                  <td>
                    <div className="order-customer">{order.customer}</div>
                    <div className="order-email">{order.email}</div>
                  </td>
                  <td>{order.product}</td>
                  <td>{order.date}</td>
                  <td className="order-amount">{formatMoney(order.amount)}</td>
                  <td>
                    <span
                      className={`order-status ${
                        order.status === "Завершён"
                          ? "completed"
                          : order.status === "Отменён"
                          ? "cancelled"
                          : "pending"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredOrders.length === 0 && (
            <div className="orders-empty">
              <Search size={25} />
              <strong>Ничего не найдено</strong>
              <span>Попробуйте изменить запрос или фильтр.</span>
              <button
                className="secondary-button"
                onClick={() => {
                  setSearch("");
                  setStatus("Все");
                }}
              >
                Сбросить фильтры
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
