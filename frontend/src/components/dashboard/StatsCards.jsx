export default function StatsCards({ videos }) {
    const total = videos.length;
    const safe = videos.filter(v => v.classification === "safe").length;
    const flagged = videos.filter(v => v.classification === "flagged").length;
    const processing = videos.filter(v => v.status === "processing").length;
  
    const stats = [
      { label: "Total", value: total },
      { label: "Safe", value: safe },
      { label: "Flagged", value: flagged },
      { label: "Processing", value: processing },
    ];
  
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map(s => (
            <div className="card stat-card">
  <span className="text-muted">{s.label}</span>
  <span className="stat-value">{s.value}</span>
</div>

        ))}
      </div>
    );
  }
  