import { useParams } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

export default function VideoDetails() {
  const { id } = useParams();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-6">
          <h1 className="dashboard-title mb-6">
            Video Player
          </h1>

          <div className="card p-0 overflow-hidden">
            <video
              controls
              crossOrigin="anonymous"
              className="w-full"
              src={`${import.meta.env.VITE_API_URL}/api/stream/${id}`}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
