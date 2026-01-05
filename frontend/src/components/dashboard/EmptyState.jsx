import { Link } from "react-router-dom";

export default function EmptyState() {
  return (
    <div className="card text-center py-16">
  <p className="text-xl font-semibold mb-2">
    No videos yet
  </p>
  <p className="text-muted mb-6">
    Upload your first video to start analysis
  </p>

      <Link to="/upload" className="btn-primary">
        Upload Video
      </Link>
    </div>
  );
}
