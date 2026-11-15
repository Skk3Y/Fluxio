import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Analytics from "./pages/Analytics";
import Clients from "./pages/Clients";

const sections = ["Обзор", "Аналитика", "Заказы", "Клиенты"] as const;
type SectionName = (typeof sections)[number];
type UtilityPanel = "settings" | "help" | "account" | "notifications" | null;

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionName>("Обзор");
  const [panel, setPanel] = useState<UtilityPanel>(null);
  const [query, setQuery] = useState("");
  const [compact, setCompact] = useState(false);
  const [dark, setDark] = useState(false);
  const [emailUpdates, setEmailUpdates] = useState(true);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        document.getElementById("global-search")?.focus();
      }
      if (event.key === "Escape") setPanel(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const chooseSection = (section: string) => {
    if (sections.includes(section as SectionName)) {
      setActiveSection(section as SectionName);
      setQuery("");
      document.getElementById("global-search")?.blur();
    }
  };

  const matches = sections.filter((section) => section.toLocaleLowerCase("ru").includes(query.toLocaleLowerCase("ru")));

  const exportReport = () => {
    const rows = [
      ["Показатель", "Значение"],
      ["Выручка", "4829400 ₽"],
      ["Заказы", "1284"],
      ["Активные клиенты", "842"],
      ["Возвраты", "2,14%"],
      ["Дата отчёта", new Date().toLocaleDateString("ru-RU")],
    ];
    const csv = "\uFEFF" + rows.map((row) => row.map((cell) => `"${cell.replaceAll('"', '""')}"`).join(";")).join("\r\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `fluxio-report-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`app-layout ${compact ? "compact-mode" : ""} ${dark ? "dark-mode" : ""}`}>
      <Sidebar activeSection={activeSection} onNavigate={chooseSection} onOpenPanel={setPanel} />
      <div className="main-area">
        <Header activeSection={activeSection} onOpenPanel={setPanel} query={query} setQuery={setQuery} matches={matches} onNavigate={chooseSection} />
        {activeSection === "Обзор" && <Dashboard onExport={exportReport} />}
        {activeSection === "Заказы" && <Orders />}
        {activeSection === "Аналитика" && <Analytics />}
        {activeSection === "Клиенты" && <Clients />}
      </div>
      {panel && <div className="utility-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setPanel(null); }}>
        <section className="utility-panel" role="dialog" aria-modal="true" aria-labelledby="utility-title">
          <button className="client-modal-close" onClick={() => setPanel(null)} aria-label="Закрыть">×</button>
          {panel === "settings" && <><span className="utility-eyebrow">ПЕРСОНАЛИЗАЦИЯ</span><h2 id="utility-title">Настройки</h2><p>Настройте рабочее пространство под себя.</p>
            <label className="setting-row"><span><strong>Компактный режим</strong><small>Уменьшить отступы в интерфейсе</small></span><input type="checkbox" checked={compact} onChange={(e) => setCompact(e.target.checked)} /></label>
            <label className="setting-row"><span><strong>Тёмная тема</strong><small>Переключить оформление рабочего пространства</small></span><input type="checkbox" checked={dark} onChange={(e) => setDark(e.target.checked)} /></label>
            <label className="setting-row"><span><strong>Обновления продукта</strong><small>Показывать новости и подсказки</small></span><input type="checkbox" checked={emailUpdates} onChange={(e) => setEmailUpdates(e.target.checked)} /></label>
            <div className="utility-footnote">Настройки сохраняются до перезагрузки демо.</div></>}
          {panel === "help" && <><span className="utility-eyebrow">FLUXIO • СПРАВКА</span><h2 id="utility-title">Центр помощи</h2><p>Коротко о разделах рабочего пространства.</p>
            <div className="help-list"><article><strong>Обзор</strong><span>Ключевые показатели и последние заказы.</span></article><article><strong>Аналитика</strong><span>Динамика выручки и распределение показателей.</span></article><article><strong>Заказы и клиенты</strong><span>Поиск, фильтры и карточки демо-данных.</span></article></div><div className="utility-footnote">Это портфолио-демо: данные представлены для примера.</div></>}
          {panel === "account" && <><span className="utility-eyebrow">АККАУНТ</span><h2 id="utility-title">SKK3Y</h2><p>Администратор рабочего пространства</p><div className="account-card"><div className="avatar">S</div><div><strong>SKK3Y</strong><span>admin@fluxio.demo</span></div><span className="account-badge">DEMO</span></div><button className="secondary-button utility-action" onClick={() => { setPanel(null); setActiveSection("Обзор"); }}>Вернуться к обзору</button><div className="utility-footnote">Профиль демонстрационный, вход и личные данные не подключены.</div></>}
          {panel === "notifications" && <><span className="utility-eyebrow">ЦЕНТР СОБЫТИЙ</span><h2 id="utility-title">Уведомления</h2><p>Последние события в рабочем пространстве.</p><div className="help-list"><article><strong>Отчёт за сегодня готов</strong><span>Показатели обновлены • только что</span></article><article><strong>Новый заказ #FL-2841</strong><span>Заказ добавлен в демо-список • 12 минут назад</span></article><article><strong>База клиентов синхронизирована</strong><span>6 профилей доступно для просмотра • сегодня</span></article></div></>}
        </section>
      </div>}
    </div>
  );
}
