import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Line } from "rc-progress";
import Footer from "../../components/student/Footer";

const MyEnrollments = () => {
  const { enrolledCourses, calculateCourseDuration, navigate } = useContext(AppContext);

  const [progressArray, setProgressArray] = useState([
    { lectureCompleted: 2, totalLectures: 4 },
    { lectureCompleted: 1, totalLectures: 3 },
    { lectureCompleted: 3, totalLectures: 5 },
    { lectureCompleted: 2, totalLectures: 6 },
    { lectureCompleted: 4, totalLectures: 4 },
    { lectureCompleted: 3, totalLectures: 7 },
    { lectureCompleted: 2, totalLectures: 4 },
    { lectureCompleted: 0, totalLectures: 6 },
    { lectureCompleted: 1, totalLectures: 3 },
    { lectureCompleted: 2, totalLectures: 4 },
    { lectureCompleted: 2, totalLectures: 4 },
    { lectureCompleted: 1, totalLectures: 2 },
    { lectureCompleted: 2, totalLectures: 4 },
  ]);

  return (
    <>
      <div className="px-6 sm:px-12 lg:px-36 pt-8 mb-5">
        <h1 className="text-2xl font-bold text-gray-800">My Enrollments</h1>
        <table className="w-full mt-8 border border-gray-300 rounded-md overflow-hidden">
          <thead className="bg-gray-100 text-gray-700 text-sm font-medium">
            <tr>
              <th className="px-4 py-3">Course</th>
              <th className="px-4 py-3 hidden sm:table-cell">Duration</th>
              <th className="px-4 py-3 hidden sm:table-cell">Completed</th>
              <th className="px-4 py-3 ">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {enrolledCourses.map((course, index) => (
              <tr key={index} className="border-b last:border-b-0">
                <td className="flex items-center space-x-4 px-4 py-3">
                  <img
                    src={course.courseThumbnail}
                    alt=""
                    className="w-14 sm:w-20 md:w-24 rounded-md shadow-sm"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{course.courseTitle}</p>
                    <Line
                      strokeWidth={2}
                      percent={
                        progressArray[index]
                          ? (progressArray[index].lectureCompleted * 100) /
                            progressArray[index].totalLectures
                          : 0
                      }
                      className="mt-2 bg-gray-200 rounded-full"
                      strokeColor="#4F46E5"
                    />
                  </div>
                </td>
                <td className="px-4 py-3 hidden sm:table-cell text-center">
                  {calculateCourseDuration(course)}
                </td>
                <td className="px-4 py-3 hidden sm:table-cell text-center">
                  {progressArray[index] &&
                    `${progressArray[index].lectureCompleted}/${progressArray[index].totalLectures}`}{" "}
                  <span className="text-gray-500">Lectures</span>
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    className={`px-4 py-2 text-sm font-semibold rounded-md ${
                      progressArray[index] &&
                      progressArray[index].lectureCompleted /
                        progressArray[index].totalLectures ===
                        1
                        ? "bg-green-500 text-white"
                        : "bg-blue-600 text-white"
                    }`}
                    onClick={() => navigate(`/player/${course._id}`)}
                  >
                    {progressArray[index] &&
                    progressArray[index].lectureCompleted /
                      progressArray[index].totalLectures ===
                      1
                      ? "Completed"
                      : "On Going"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default MyEnrollments;
