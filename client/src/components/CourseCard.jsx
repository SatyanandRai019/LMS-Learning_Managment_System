import { Link } from "react-router-dom";

function CourseCard({ course }) {
  const { title, description, category, thumbnail, createdBy } = course;

  return (
    <div className="card w-80 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <figure className="h-48 bg-slate-100">
        {thumbnail?.secure_url ? (
          <img
            src={thumbnail.secure_url}
            alt={title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">
            No image available
          </div>
        )}
      </figure>

      <div className="card-body gap-2 p-5">
        <h2 className="line-clamp-1 text-lg font-bold text-[#0a1f44]">
          {title}
        </h2>

        <p className="line-clamp-2 text-sm text-slate-500">{description}</p>

        <div className="mt-1 flex flex-wrap gap-2">
          <span className="rounded-full bg-[#0a1f44]/5 px-3 py-1 text-xs font-semibold text-[#0a1f44]">
            {category}
          </span>
          <span className="rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-500">
            {createdBy}
          </span>
        </div>

        <Link
          to={`/course/${course._id}`}
          className="mt-4 w-full rounded-xl bg-[#0a1f44] py-2.5 text-center text-sm font-semibold text-white transition-all duration-200 hover:bg-[#112d5c]"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default CourseCard;