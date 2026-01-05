import { Link } from "react-router-dom";

export default function VideoCard({ video }) {
  return (
    <div className="card flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg">{video.title}</h3>
          <span className={`badge badge-${video.classification}`}>
            {video.classification}
          </span>
        </div>

        <p className="text-sm text-muted">
          Status: {video.status}
        </p>
      </div>

      <Link
        to={`/video/${video._id}`}
        className="mt-6 text-blue-600 font-medium hover:underline"
      >
        View Video →
      </Link>
    </div>
  );
}
