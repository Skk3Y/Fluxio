import {
  LayoutDashboard,
  ChartNoAxesCombined,
  ShoppingBag,
  Users,
  Settings,
  HelpCircle,
  Activity,
} from "lucide-react";

interface SidebarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
  onOpenPanel: (panel: "help" | "settings") => void;
}

const navigation = [
  { name: "Обзор", icon: LayoutDashboard },
  { name: "Аналитика", icon: ChartNoAxesCombined },
  { name: "Заказы", icon: ShoppingBag },
  { name: "Клиенты", icon: Users },
];

export default function Sidebar({ activeSection, onNavigate, onOpenPanel }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="brand"><div className="brand-icon"><Activity size={21} /></div><span>FLUXIO</span></div>
      <div className="nav-label">РАБОЧЕЕ ПРОСТРАНСТВО</div>
      <nav className="navigation" aria-label="Основная навигация">
        {navigation.map(({ name, icon: Icon }) => (
          <button key={name} onClick={() => onNavigate(name)} className={`nav-item ${activeSection === name ? "active" : ""}`} aria-current={activeSection === name ? "page" : undefined}>
            <Icon size={19} /><span>{name}</span>
          </button>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <button className="nav-item" onClick={() => onOpenPanel("help")}><HelpCircle size={19} /><span>Центр помощи</span></button>
        <button className="nav-item" onClick={() => onOpenPanel("settings")}><Settings size={19} /><span>Настройки</span></button>
        <div className="profile"><div className="avatar">S</div><div><div className="profile-name">SKK3Y</div><div className="profile-role">Администратор</div></div></div>
      </div>
    </aside>
  );
}


