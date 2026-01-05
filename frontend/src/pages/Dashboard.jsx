import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import VideoGrid from "../components/dashboard/VideoGrid";
import PageContainer from "../components/layout/PageContainer";

const PAGE_SIZE = 8;

export default function Dashboard() {
  const [videos, setVideos] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    safe: 0,
    flagged: 0,
    processing: 0,
  });

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  /* ---------------- LOAD STATS ---------------- */
  useEffect(() => {
    api.get("/api/videos/stats").then(res => {
      setStats(res.data);
    });
  }, []);

  /* ---------------- LOAD VIDEOS ---------------- */
  useEffect(() => {
    api
      .get(
        `/api/videos?page=${page}&limit=${PAGE_SIZE}`
      )
      .then(res => {
        setVideos(res.data.videos);
        setTotalPages(res.data.totalPages);
      });
  }, [page]);

  /* ---------------- FILTER CLIENT SIDE ---------------- */
  const filtered = videos.filter(v => {
    if (filter !== "all" && v.classification !== filter)
      return false;
    if (
      search &&
      !v.title.toLowerCase().includes(search.toLowerCase())
    )
      return false;
    return true;
  });

  return (
    <div className="flex min-h-screen bg-[var(--bg-main)]">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <PageContainer>
          {/* TITLE */}
          <h1 className="dashboard-title">Dashboard</h1>

          {/* STATS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Stat label="Total Videos" value={stats.total} icon="🎬" />
            <Stat label="Safe Videos" value={stats.safe} icon="✅" />
            <Stat label="Flagged Videos" value={stats.flagged} icon="⚠️" />
            <Stat label="Processing" value={stats.processing} icon="⏳" />
          </div>

          {/* TOOLS */}
          <div className="flex flex-wrap gap-4 items-center mb-6">
            <input
              placeholder="Search videos…"
              className="w-64"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />

            <div className="flex gap-2">
              {["all", "safe", "flagged", "processing"].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`filter-pill ${
                    filter === f ? "filter-pill-active" : ""
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* CONTENT */}
          {filtered.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <VideoGrid videos={filtered} />

              {/* PAGINATION */}
              {/* <div className="flex justify-between items-center mt-6">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(p => p - 1)}
                  className="btn-secondary"
                >
                  Prev
                </button>

                <span className="text-sm text-muted">
                  Page {page} of {totalPages}
                </span>

                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(p => p + 1)}
                  className="btn-secondary"
                >
                  Next
                </button>
              </div> */}
              <div className="flex justify-center items-center gap-6 mt-6">
  {/* PREVIOUS */}
  <button
    onClick={() => setPage(p => p - 1)}
    disabled={page === 1}
    className={`w-10 h-10 flex items-center justify-center rounded-full 
      ${
        page === 1
          ? "bg-blue-200 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700"
      }
      text-white transition`}
    aria-label="Previous page"
  >
    ◀
  </button>

  {/* PAGE INFO */}
  <span className="text-sm text-muted">
    Page {page} of {totalPages}
  </span>

  {/* NEXT */}
  <button
    onClick={() => setPage(p => p + 1)}
    disabled={page === totalPages}
    className={`w-10 h-10 flex items-center justify-center rounded-full 
      ${
        page === totalPages
          ? "bg-blue-200 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700"
      }
      text-white transition`}
    aria-label="Next page"
  >
    ▶
  </button>
</div>

            </>
          )}
        </PageContainer>
      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function Stat({ label, value, icon }) {
  return (
    <div className="card flex items-center justify-between">
      <div>
        <p className="text-sm text-muted mb-1">{label}</p>
        <p className="text-3xl font-bold tracking-tight">{value}</p>
      </div>
      <div className="text-3xl opacity-80">{icon}</div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="card text-center py-16 text-muted">
      <div className="text-5xl mb-4">📁</div>
      <p className="text-lg font-medium">No videos found</p>
      <p className="text-sm">Upload a video to get started</p>
    </div>
  );
}
