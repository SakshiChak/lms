import { assets } from "../../assets/assets";

const CallToAction = () => {
	return (
		<div className="flex flex-col items-center gap-6 py-16 px-8 md:px-16">
			<h1 className="text-xl md:text-4xl text-gray-800 font-semibold">
				Learn anything, anytime, anywhere
			</h1>
			<p className="text-gray-500 text-center text-base md:text-lg max-w-3xl sm:text-sm">
				With our top-rated courses, you can learn the skills you need to
				take your career to the next level. Whether you're looking to
				upskill or reskill, our courses are designed to help you achieve
				your goals.
			</p>
			<div className="flex flex-wrap items-center justify-center gap-6 mt-6">
				<button className="px-10 py-3 text-white bg-blue-600 rounded-md font-medium shadow-md hover:bg-blue-700 transition-all">
					Get Started
				</button>
				<button className="flex items-center gap-2 text-blue-600 font-medium hover:text-blue-800 transition-all">
					Learn More
					<img src={assets.arrow_icon} alt="arrow_icon" />
				</button>
			</div>
		</div>
	);
};

export default CallToAction;
