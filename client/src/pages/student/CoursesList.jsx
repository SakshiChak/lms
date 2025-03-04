import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import SearchBar from "../../components/student/SearchBar";
import { useParams } from "react-router-dom";
import CourseCard from "../../components/student/CourseCard";
import { assets } from "../../assets/assets";
import Footer from "../../components/student/Footer";

const CoursesList = () => {
  const { navigate, allCourses } = useContext(AppContext);
  const { input } = useParams();
  const [filteredCourse, setFilteredCourse] = useState([]);

  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      const tempCourses = allCourses.slice();
      input
        ? setFilteredCourse(
            tempCourses.filter((item) =>
              item.courseTitle.toLowerCase().includes(input.toLowerCase())
            )
          )
        : setFilteredCourse(tempCourses);
    }
  }, [allCourses, input]);

  return (
    <>
      <div className="relative md:px-36 px-8 pt-20 text-left">
        {/* Header Section */}
        <div className="flex flex-col gap-6 md:flex-row items-start justify-between w-full">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Explore Courses</h1>
            <p className="text-gray-500 mt-1">
              <span
                className="text-blue-600 cursor-pointer hover:underline"
                onClick={() => navigate("/")}
              >
                Home
              </span>{" "}
              / <span>Course List</span>
            </p>
          </div>
          <SearchBar data={input} />
        </div>

        {/* Filter Display */}
        {input && (
          <div className="inline-flex items-center gap-4 px-4 py-2 border mt-8 text-gray-600 bg-gray-50 rounded shadow-sm">
            <p>{`Search results for: "${input}"`}</p>
            <img
              src={assets.cross_icon}
              alt="clear filter"
              className="cursor-pointer h-4 w-4 hover:opacity-70"
              onClick={() => navigate("/course-list")}
            />
          </div>
        )}

        {/* Course List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-16 gap-6">
          {filteredCourse.length > 0 ? (
            filteredCourse.map((course, index) => (
              <CourseCard key={index} course={course} />
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-lg text-gray-500">
                No courses found matching your search.
              </p>
              <button
                className="px-6 py-2 mt-4 text-white bg-blue-600 rounded shadow hover:bg-blue-700"
                onClick={() => navigate("/course-list")}
              >
                Browse All Courses
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CoursesList;
