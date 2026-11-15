import { Bell, ChevronDown, Search } from "lucide-react";

export default function Header({ activeSection, onOpenPanel, query, setQuery, matches, onNavigate }: {
  activeSection: string; onOpenPanel: (panel: "notifications" | "account") => void;
  query: string; setQuery: (value: string) => void; matches: readonly string[]; onNavigate: (section: string) => void;
}) {
  return <header className="header">
    <div className="breadcrumb">Рабочее пространство <span>/</span> <strong>{activeSection}</strong></div>
    <div className="header-actions">
      <div className="global-search-wrap"><label className="search-button"><Search size={17} /><input id="global-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Поиск раздела..." /><kbd>⌘ K</kbd></label>
        {query && <div className="search-popover">{matches.length ? matches.map((item) => <button key={item} onClick={() => onNavigate(item)}>{item}<span>Открыть раздел</span></button>) : <p>Раздел не найден</p>}</div>}
      </div>
      <button className="icon-button notification" aria-label="Уведомления" onClick={() => onOpenPanel("notifications")}><Bell size={19} /><span /></button>
      <div className="header-divider" />
      <button className="workspace-button" onClick={() => onOpenPanel("account")} aria-label="Открыть аккаунт"><div className="avatar small">S</div><span>SKK3Y</span><ChevronDown size={15} /></button>
    </div>
  </header>;
}


