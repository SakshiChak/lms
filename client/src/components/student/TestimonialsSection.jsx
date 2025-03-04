import { dummyTestimonial } from "../../assets/assets";
import { assets } from "../../assets/assets";

const TestimonialsSection = () => {
  return (
    <div className="pb-14 px-8 md:px-0">
      {/* Section Heading */}
      <div className="text-center">
        <h2 className="text-3xl font-medium text-gray-800">Testimonials</h2>
        <p className="md:text-base text-gray-500 mt-3 max-w-2xl mx-auto">
          Hear from our learners as they share their journeys of transformation, success, and how our platform has made a difference in their lives.
        </p>
      </div>

      {/* Cards */}
      <div className="flex flex-wrap justify-center px-4 md:px-0 gap-10 mt-14">
        {dummyTestimonial.map((testimonial, index) => (
          <div
            key={index}
            className="text-sm text-left border border-gray-200 pb-6 rounded-lg bg-white shadow-md transition-transform transform hover:scale-105 duration-300 w-full sm:w-80"
          >
            {/* Header */}
            <div className="flex items-center gap-4 px-5 py-4 bg-gray-100 border-b border-gray-200">
              <img
                className="h-12 w-12 rounded-full"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div>
                <h1 className="text-lg font-medium text-gray-800">
                  {testimonial.name}
                </h1>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
              </div>
            </div>

            {/* Body */}
            <div className="p-5 pb-7">
              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <img
                    className="h-5"
                    key={i}
                    src={
                      i < Math.floor(testimonial.rating)
                        ? assets.star
                        : assets.star_blank
                    }
                    alt="star"
                  />
                ))}
              </div>
              {/* Feedback */}
              <p className="text-gray-500 mt-5 italic">
                {testimonial.feedback}
              </p>
            </div>
            <a href="#" className="text-blue-500 underline px-5">Read more</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
