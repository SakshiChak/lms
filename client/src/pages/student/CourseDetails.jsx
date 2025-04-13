import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import "../../index.css";
import Loading from "../../components/student/Loading";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";
import Footer from "../../components/student/Footer";
import YouTube from "react-youtube";
import { toast } from "react-toastify";
import axios from "axios";


const CourseDetails = () => {
	const { id } = useParams();

	const [courseData, setCourseData] = useState(null);
	const [openSection, setOpenSection] = useState({});
	const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);
	const [playerData, setPlayerData] = useState(null);

	const {
		allCourses,
		calculateRating,
		calculateChapterTime,
		calculateCourseDuration,
		calculateNoOfLectures,
		currency,
		backendUrl,
    userData,
    getToken
	} = useContext(AppContext);

	const fetchCourseData = async () => {
		try {
      const { data } = await axios.get(backendUrl + '/api/course/' + id);
      console.log("API Response:", data);

			if (data.success) {
        setCourseData(data.courseData);
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			toast.error(error.message);
		}
  };
  
  const enrollCourse = async () => { 
    try {
      if (!userData) { 
        return toast.warn('Login to Enroll')
      }
      if (isAlreadyEnrolled) {
        return toast.warn('Already Enrolled')
      }
      const token = await getToken();

      const { data } = await axios.post(backendUrl + '/api/user/purchase',
        { courseId: courseData._id },
        { headers: { Authorization: `Bearer ${token}` } })
      
      if (data.success) {
        const { session_url } = data
        window.location.replace(session_url)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

	useEffect(() => {
		fetchCourseData();
  }, []);
  
  useEffect(() => {
    if (userData && courseData) {
      setIsAlreadyEnrolled(userData.enrolledCourses.includes(courseData._id))
    }
  },[userData, courseData])

	const toggleSection = (sectionId) => {
		setOpenSection((prevOpenSection) => ({
			...prevOpenSection,
			[sectionId]: !prevOpenSection[sectionId],
		}));
	};

	return courseData ? (
		<>
			<div className="flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-20 pt-20 text-left bg-gradient-to-b from-cyan-100/70">
				{/* Gradient Background */}
				<div className="absolute top-0 left-0 h-full w-full"></div>

				{/* Left Column */}
				<div className="max-w-xl z-10 text-gray-700">
					<h1 className="md:text-4xl text-2xl font-bold text-gray-900">
						{courseData.courseTitle}
					</h1>
					<p
						className="pt-4 text-base"
						dangerouslySetInnerHTML={{
							__html: courseData.courseDescription.slice(0, 200),
						}}
					></p>

					{/* Review and Ratings */}
					<div className="flex items-center space-x-2 pt-3 pb-1 text-sm">
						<p>{calculateRating(courseData)}</p>
						<div className="flex">
							{[...Array(5)].map((_, i) => (
								<img
									key={i}
									src={
										i <
										Math.floor(calculateRating(courseData))
											? assets.star
											: assets.star_blank
									}
									alt="rating star"
									className="w-4 h-4"
								/>
							))}
						</div>
						<p className="text-blue-600">
							({courseData.courseRatings.length}{" "}
							{courseData.courseRatings.length > 1
								? "ratings"
								: "rating"}
							)
						</p>
						<p>
							({courseData.enrolledStudents.length}{" "}
							{courseData.enrolledStudents.length > 1
								? "students"
								: "student"}
							)
						</p>
					</div>

					<p className="text-sm">
						Course by{" "}
						<span className="text-blue-600 underline">
							{courseData.educator.name}
						</span>
					</p>

					<div className="pt-8 text-gray-800">
						<h2 className="text-2xl font-semibold">
							Course Structure
						</h2>

						<div className="pt-5">
							{courseData.courseContent.map((chapter, index) => (
								<div
									key={index}
									className="border border-gray-300 bg-white mb-3 rounded shadow-sm"
								>
									<div
										className="flex items-center justify-between px-4 py-3 cursor-pointer select-none hover:bg-gray-50"
										onClick={() => toggleSection(index)}
									>
										<div className="flex items-center gap-2">
											<img
												className={`transform transition-transform duration-300 ${
													openSection[index]
														? "rotate-180"
														: ""
												}`}
												src={assets.down_arrow_icon}
												alt="arrow icon"
											/>
											<p className="font-medium text-base">
												{chapter.chapterTitle}
											</p>
										</div>
										<p className="text-sm">
											{chapter.chapterContent.length}{" "}
											lectures -{" "}
											{calculateChapterTime(chapter)}
										</p>
									</div>

									<div
										className={`overflow-hidden transition-all duration-300 ${
											openSection[index]
												? "max-h-96"
												: "max-h-0"
										}`}
									>
										<ul className="list-disc pl-6 pr-4 py-2 text-gray-600 border-t border-gray-300">
											{chapter.chapterContent.map(
												(lecture, i) => (
													<li
														key={i}
														className="flex items-start gap-2 py-1"
													>
														<img
															src={
																assets.play_icon
															}
															alt="play icon"
															className="w-4 h-4 mt-1"
														/>
														<div className="flex items-center justify-between w-full text-gray-800 text-xs md:text-base">
															<p>
																{
																	lecture.lectureTitle
																}
															</p>
															<div className="flex gap-2 items-center">
																{lecture.isPreviewFree && (
																	<p
																		onClick={() =>
																			setPlayerData(
																				{
																					videoId:
																						lecture.lectureUrl
																							.split(
																								"/"
																							)
																							.pop(),
																				}
																			)
																		}
																		className="text-blue-500 cursor-pointer hover:underline"
																	>
																		Preview
																	</p>
																)}
																<p>
																	{humanizeDuration(
																		lecture.lectureDuration *
																			60 *
																			1000,
																		{
																			units: [
																				"h",
																				"m",
																			],
																		}
																	)}
																</p>
															</div>
														</div>
													</li>
												)
											)}
										</ul>
									</div>
								</div>
							))}
						</div>
					</div>

					<div className="py-10 text-base">
						<h3 className="text-2xl font-semibold text-gray-900">
							Course Description
						</h3>
						<p
							className="pt-3 leading-relaxed"
							dangerouslySetInnerHTML={{
								__html: courseData.courseDescription,
							}}
						></p>
					</div>
				</div>

				{/* Right Column */}
				<div className="max-w-md z-10 bg-white rounded-lg overflow-hidden shadow-lg min-w-[300px]">
					{playerData ? (
						<YouTube
							videoId={playerData.videoId}
							opts={{ playerVars: { autoplay: 1 } }}
							iframeClassName="w-full aspect-video"
						/>
					) : (
						<img
							src={courseData.courseThumbnail}
							alt=""
							className="w-full object-cover"
						/>
					)}

					<div className="p-5">
						<div className="flex items-center gap-2">
							<img
								className="w-5"
								src={assets.time_left_clock_icon}
								alt="time left clock icon"
							/>
							<p className="text-red-500">
								<span className="font-medium">5 days</span> left
								at this price
							</p>
						</div>

						<div className="flex items-center gap-3 pt-2">
							<p className="text-gray-800 text-3xl font-semibold">
								{currency}{" "}
								{(
									courseData.coursePrice -
									(courseData.coursePrice *
										courseData.discount) /
										100
								).toFixed(2)}
							</p>
							<p className="text-lg text-gray-500 line-through">
								{currency} {courseData.coursePrice}
							</p>
							<p className="text-lg text-gray-500">
								{courseData.discount}% off
							</p>
						</div>

						<div className="flex items-center text-sm gap-4 pt-4 text-gray-500">
							<div className="flex items-center gap-1">
								<img
									src={assets.star}
									alt="star icon"
									className="w-4"
								/>
								<p>{calculateRating(courseData)}</p>
							</div>
							<div className="h-4 w-px bg-gray-400"></div>
							<div className="flex items-center gap-1">
								<img
									src={assets.time_clock_icon}
									alt="clock icon"
									className="w-4"
								/>
								<p>{calculateCourseDuration(courseData)}</p>
							</div>
							<div className="h-4 w-px bg-gray-400"></div>
							<div className="flex items-center gap-1">
								<img
									src={assets.lesson_icon}
									alt="lesson icon"
									className="w-4"
								/>
								<p>{calculateNoOfLectures(courseData)}</p>
							</div>
						</div>

						<button onClick={enrollCourse} className="mt-6 w-full py-3 rounded bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors">
							{isAlreadyEnrolled
								? "Already Enrolled"
								: "Enroll Now"}
						</button>

						<div className="pt-6">
							<p className="text-xl font-semibold text-gray-900">
								What's in the course?
							</p>
							<ul className="ml-4 pt-2 text-sm list-disc text-gray-600">
								<li>Lifetime access with free updates.</li>
								<li>
									Step-by-step, hands-on project guidance.
								</li>
								<li>Downloadable resources and source code.</li>
								<li>
									Access to community discussions and support.
								</li>
								<li>Certificate upon completion.</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	) : (
		<Loading />
	);
};

export default CourseDetails;
