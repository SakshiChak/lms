import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/student/Loading";
import { toast } from "react-toastify";
import axios from "axios";

const MyCourses = () => {
  const { currency, backendUrl, isEducator, getToken } = useContext(AppContext);

  const [courses, setCourses] = useState(null);

  const fetchEducatorCourses = async () => {
    try {
      const token = await getToken()
      const {data} = await axios.get(backendUrl + '/api/educator/courses', {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      data.success && setCourses(data.courses)
    } catch (error) {
      toast.error(error.message)
    }
  };

  useEffect(() => {
    if (!isEducator) {
      fetchEducatorCourses();
    }
  }, [isEducator]);

  return courses ? (
    <div className="min-h-screen flex flex-col items-start justify-start md:p-10 p-6 bg-gray-50">
      <div className="w-full">
        <h2 className="pb-6 text-2xl font-semibold text-gray-800">My Courses</h2>
        <div className="flex flex-col items-center max-w-6xl w-full overflow-hidden rounded-lg bg-white shadow-md">
          <table className="table-auto w-full">
            <thead className="text-gray-700 bg-gray-100 text-sm text-left">
              <tr>
                <th className="px-6 py-4 font-semibold">All Courses</th>
                <th className="px-6 py-4 font-semibold">Earnings</th>
                <th className="px-6 py-4 font-semibold">Students</th>
                <th className="px-6 py-4 font-semibold">Published On</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {courses.map((course) => (
                <tr key={course._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 flex items-center space-x-4">
                  <img src={course.courseThumbnail} alt="Course Image" className="w-16" />
                    <span className="truncate text-gray-800 font-medium">{course.courseTitle}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {currency}
                    {Math.floor(
                      course.enrolledStudents.length *
                        (course.coursePrice - (course.discount * course.coursePrice) / 100)
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{course.enrolledStudents.length}</td>
                  <td className="px-6 py-4 text-gray-500 text-sm">
                    {new Date(course.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default MyCourses;
