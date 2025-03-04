import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { assets, dummyDashboardData } from "../../assets/assets";
import Loading from "../../components/student/Loading";

const Dashboard = () => {
  const { currency } = useContext(AppContext);
  const [dashboardData, setDashboardData] = useState(null);

  const fetchDashboardData = async () => {
    setDashboardData(dummyDashboardData);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return dashboardData ? (
    <div className="min-h-screen flex flex-col gap-8 p-6 md:p-10 bg-gray-50">
      <div className="space-y-6">
        {/* Cards Section */}
        <div className="flex flex-wrap gap-6 items-center">
          <div className="flex items-center gap-4 shadow-md border border-blue-300 p-6 w-full sm:w-56 rounded-xl bg-white hover:shadow-lg transition-all duration-300">
            <img src={assets.patients_icon} alt="patients_icon" className="w-10 h-10" />
            <div>
              <p className="text-2xl font-bold text-gray-700">{dashboardData.enrolledStudentsData.length}</p>
              <p className="text-sm text-gray-500">Total Enrolments</p>
            </div>
          </div>
          <div className="flex items-center gap-4 shadow-md border border-blue-300 p-6 w-full sm:w-56 rounded-xl bg-white hover:shadow-lg transition-all duration-300">
            <img src={assets.appointments_icon} alt="appointments_icon" className="w-10 h-10" />
            <div>
              <p className="text-2xl font-bold text-gray-700">{dashboardData.totalCourses}</p>
              <p className="text-sm text-gray-500">Total Courses</p>
            </div>
          </div>
          <div className="flex items-center gap-4 shadow-md border border-blue-300 p-6 w-full sm:w-56 rounded-xl bg-white hover:shadow-lg transition-all duration-300">
            <img src={assets.earning_icon} alt="earning_icon" className="w-10 h-10" />
            <div>
              <p className="text-2xl font-bold text-gray-700">
                {currency}
                {dashboardData.totalEarnings}
              </p>
              <p className="text-sm text-gray-500">Total Earnings</p>
            </div>
          </div>
        </div>

        {/* Latest Enrolments Section */}
        <div>
          <h2 className="pb-4 text-lg font-semibold text-gray-800">Latest Enrolments</h2>
          <div className="flex flex-col items-center w-full max-w-4xl overflow-hidden rounded-xl bg-white border border-gray-200 shadow-md">
            <table className="table-auto w-full text-sm text-gray-700">
            <thead className="text-gray-700 bg-gray-100 border-b border-gray-500/20 text-sm text-left">
                <tr>
                  <th className="px-4 py-3 font-semibold text-center hidden sm:table-cell">#</th>
                  <th className="px-4 py-3 font-semibold">Student Name</th>
                  <th className="px-4 py-3 font-semibold">Course Title</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.enrolledStudentsData.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-center hidden sm:table-cell">{index + 1}</td>
                    <td className="px-4 py-3 flex items-center gap-3">
                      <img
                        src={item.student.imageUrl}
                        alt="profile"
                        className="w-10 h-10 rounded-full border border-gray-200"
                      />
                      <span className="truncate">{item.student.name}</span>
                    </td>
                    <td className="px-4 py-3 truncate">{item.courseTitle}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Dashboard;

