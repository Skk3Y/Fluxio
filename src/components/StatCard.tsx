
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  positive: boolean;
  description: string;
}

export default function StatCard({
  title,
  value,
  change,
  positive,
  description,
}: StatCardProps) {
  return (
    <div className="stat-card">
      <div className="stat-top">
        <span className="stat-title">{title}</span>
        <span className={`stat-change ${positive ? "positive" : "negative"}`}>
          {positive ? (
            <ArrowUpRight size={15} />
          ) : (
            <ArrowDownRight size={15} />
          )}
          {change}
        </span>
      </div>

      <div className="stat-value">{value}</div>
      <div className="stat-description">{description}</div>
    </div>
  );
}
