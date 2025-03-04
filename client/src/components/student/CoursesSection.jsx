import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import CourseCard from './CourseCard';
import '../../index.css'

const CoursesSection = () => {

  const {allCourses} = useContext(AppContext)

  return (
    <div className='py-16 md:px-40 px-8'>
      
      {/* Section Heading */}
      <div className='text-center'>
        <h2 className='text-3xl font-medium text-gray-800'>Learn from the best</h2>
        <p className='text-sm md:text-base text-gray-500 mt-3'>Discover our top-rated courses across various categories. From coding and design to <br /> business and wellness, our course are crafted to deliver results.</p>
      </div>

      {/* Courses Grid  */}
      <div className='grid card  px-4 md:px-0 md:my-16 gap-4 my-10'>
        {allCourses.slice(0, 4).map((course, index) =>
          <CourseCard key={index} course={course} />)}
      </div>

      {/* Show All Button */}
      <div className="text-center mt-10">
        <Link
          to={"/course-list"}
          onClick={() => scrollTo(0, 0)}
          className="inline-block text-gray-500 bg-white border border-gray-500/30 px-8 py-3 rounded-md shadow-md transition-transform transform hover:scale-105 hover:bg-gray-100 duration-300"
        >
          Show All Courses
        </Link>
      </div>
    </div>
  )
}

export default CoursesSection
