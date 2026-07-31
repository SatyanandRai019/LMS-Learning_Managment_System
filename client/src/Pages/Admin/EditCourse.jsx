import { useParams } from "react-router-dom";

function EditCourse() {
  const { id } = useParams();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Edit Course</h1>

      <form className="space-y-4 max-w-xl">
        <input
          type="text"
          placeholder="Course Title"
          className="input input-bordered w-full"
        />

        <textarea
          placeholder="Description"
          className="textarea textarea-bordered w-full"
        />

        <input
          type="text"
          placeholder="Category"
          className="input input-bordered w-full"
        />

        <button className="btn btn-primary">
          Update Course
        </button>
      </form>
    </div>
  );
}

export default EditCourse;