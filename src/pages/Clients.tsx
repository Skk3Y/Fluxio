
import { useMemo, useState } from "react";
import {
  Search,
  Users,
  ShoppingBag,
  Wallet,
  Mail,
  Phone,
  ArrowUpRight,
  ChevronRight,
  UserRound,
  X,
} from "lucide-react";

const clients = [
  {
    id: 1,
    name: "Александр Морозов",
    email: "a.morozov@mail.ru",
    phone: "+7 900 123-45-67",
    orders: 18,
    spent: 124800,
    lastOrder: "15 ноября 2026",
    status: "Постоянный",
    initials: "АМ",
  },
  {
    id: 2,
    name: "Екатерина Волкова",
    email: "e.volkova@mail.ru",
    phone: "+7 901 234-56-78",
    orders: 12,
    spent: 87300,
    lastOrder: "14 ноября 2026",
    status: "Постоянный",
    initials: "ЕВ",
  },
  {
    id: 3,
    name: "Дмитрий Соколов",
    email: "d.sokolov@mail.ru",
    phone: "+7 902 345-67-89",
    orders: 3,
    spent: 12400,
    lastOrder: "12 ноября 2026",
    status: "Новый",
    initials: "ДС",
  },
  {
    id: 4,
    name: "Мария Кузнецова",
    email: "m.kuznetsova@mail.ru",
    phone: "+7 903 456-78-90",
    orders: 7,
    spent: 45600,
    lastOrder: "10 ноября 2026",
    status: "Активный",
    initials: "МК",
  },
  {
    id: 5,
    name: "Иван Петров",
    email: "i.petrov@mail.ru",
    phone: "+7 904 567-89-01",
    orders: 1,
    spent: 5900,
    lastOrder: "8 ноября 2026",
    status: "Новый",
    initials: "ИП",
  },
  {
    id: 6,
    name: "Анастасия Смирнова",
    email: "a.smirnova@mail.ru",
    phone: "+7 905 678-90-12",
    orders: 24,
    spent: 186500,
    lastOrder: "15 ноября 2026",
    status: "Постоянный",
    initials: "АС",
  },
];

const money = (value: number) =>
  `₽${value.toLocaleString("ru-RU")}`;

export default function Clients() {
  const [search, setSearch] = useState("");
  const [selectedClient, setSelectedClient] =
    useState<(typeof clients)[number] | null>(null);

  const filteredClients = useMemo(() => {
    const query = search.toLowerCase().trim();

    return clients.filter((client) =>
      [
        client.name,
        client.email,
        client.phone,
        String(client.id),
      ].some((value) => value.toLowerCase().includes(query))
    );
  }, [search]);

  const totalSpent = clients.reduce(
    (sum, client) => sum + client.spent,
    0
  );

  const totalOrders = clients.reduce(
    (sum, client) => sum + client.orders,
    0
  );

  return (
    <main className="dashboard clients-page">
      <div className="page-heading">
        <div>
          <h1>Клиенты</h1>
          <p>Управляйте клиентской базой и изучайте историю покупок.</p>
        </div>
        <div className="clients-count">
          <Users size={17} />
          {clients.length} клиентов
        </div>
      </div>

      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-top">
            <span className="stat-title">Всего клиентов</span>
            <div className="stat-icon"><Users size={19} /></div>
          </div>
          <div className="stat-value">{clients.length}</div>
          <div className="stat-bottom">
            <span className="stat-change positive">
              <ArrowUpRight size={15} /> +12,5%
            </span>
            <span className="stat-description">к прошлому месяцу</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <span className="stat-title">Заказов клиентов</span>
            <div className="stat-icon"><ShoppingBag size={19} /></div>
          </div>
          <div className="stat-value">{totalOrders}</div>
          <div className="stat-bottom">
            <span className="stat-change positive">
              <ArrowUpRight size={15} /> +8,2%
            </span>
            <span className="stat-description">к прошлому месяцу</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <span className="stat-title">Сумма покупок</span>
            <div className="stat-icon"><Wallet size={19} /></div>
          </div>
          <div className="stat-value">{money(totalSpent)}</div>
          <div className="stat-bottom">
            <span className="stat-change positive">
              <ArrowUpRight size={15} /> +16,4%
            </span>
            <span className="stat-description">к прошлому месяцу</span>
          </div>
        </div>
      </section>

      <section className="analytics-panel clients-panel">
        <div className="panel-heading">
          <div>
            <h2>База клиентов</h2>
            <p>Все зарегистрированные покупатели</p>
          </div>
        </div>

        <div className="clients-toolbar">
          <div className="clients-search">
            <Search size={17} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Поиск по имени, email или телефону..."
            />
            {search && (
              <button onClick={() => setSearch("")} aria-label="Очистить поиск">
                <X size={15} />
              </button>
            )}
          </div>
          <span className="clients-results">
            Найдено: {filteredClients.length}
          </span>
        </div>

        <div className="clients-table-wrap">
          <table className="clients-table">
            <thead>
              <tr>
                <th>КЛИЕНТ</th>
                <th>ЗАКАЗЫ</th>
                <th>ПОКУПКИ</th>
                <th>ПОСЛЕДНИЙ ЗАКАЗ</th>
                <th>СТАТУС</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => (
                <tr
                  key={client.id}
                  onClick={() => setSelectedClient(client)}
                  className="client-row"
                >
                  <td>
                    <div className="client-person">
                      <div className="client-avatar">{client.initials}</div>
                      <div>
                        <strong>{client.name}</strong>
                        <span>{client.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>{client.orders}</td>
                  <td className="client-spent">{money(client.spent)}</td>
                  <td>{client.lastOrder}</td>
                  <td>
                    <span className={`client-status ${client.status === "Постоянный" ? "regular" : client.status === "Активный" ? "active" : "new"}`}>
                      {client.status}
                    </span>
                  </td>
                  <td><ChevronRight size={17} /></td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredClients.length === 0 && (
            <div className="clients-empty">
              <UserRound size={28} />
              <strong>Клиенты не найдены</strong>
              <span>Попробуй изменить поисковый запрос.</span>
            </div>
          )}
        </div>
      </section>

      {selectedClient && (
        <div
          className="client-modal-backdrop"
          onClick={() => setSelectedClient(null)}
        >
          <section
            className="client-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="client-modal-close"
              onClick={() => setSelectedClient(null)}
              aria-label="Закрыть"
            >
              <X size={19} />
            </button>

            <div className="client-modal-profile">
              <div className="client-modal-avatar">
                {selectedClient.initials}
              </div>
              <div>
                <h2>{selectedClient.name}</h2>
                <span>Клиент #{selectedClient.id}</span>
              </div>
            </div>

            <div className="client-modal-stats">
              <div>
                <span>Заказов</span>
                <strong>{selectedClient.orders}</strong>
              </div>
              <div>
                <span>Потрачено</span>
                <strong>{money(selectedClient.spent)}</strong>
              </div>
            </div>

            <div className="client-contact">
              <div><Mail size={17} /><span>{selectedClient.email}</span></div>
              <div><Phone size={17} /><span>{selectedClient.phone}</span></div>
            </div>

            <div className="client-modal-footer">
              <span>Последний заказ</span>
              <strong>{selectedClient.lastOrder}</strong>
            </div>

            <div className="client-demo-note">
              Демонстрационные данные. История заказов будет подключена на следующем этапе.
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
