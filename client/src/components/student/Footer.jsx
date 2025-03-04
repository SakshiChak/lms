import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-gray-900 md:px-36 text-left w-full ">
      <div className="flex flex-col md:flex-row items-start px-8 md:px-0 justify-center gap-10 md:gap-32 py-10 border-b border-white/30">
        <div className="flex flex-col md:items-start items-center w-full">
          <img src={assets.logo_dark} alt="logo"/>
          <p className="mt-6 text-center md:text-left text-sm text-white/80">
          Welcome to Edemy, where learning meets convenience. From upskilling to exploring new passions, we’re here to guide you every step of the way.
          </p>
        </div>
        <div className="flex flex-col md:items-start items-center w-full">
          <h2 className="font-semibold text-white mb-5">Company</h2>
          <ul className="flex md:flex-col w-full justify-between text-sm text-white/80 md:space-y-2">
            <li><a href="#" className="hover:text-blue-500">Home</a></li>
            <li><a href="#" className="hover:text-blue-500">About Us</a></li>
            <li><a href="#" className="hover:text-blue-500">Contact Us</a></li>
            <li><a href="#" className="hover:text-blue-500">Privacy Policy</a></li>
          </ul>
        </div>
        <div className="hidden md:flex flex-col items-start w-full">
          <h2 className="font-semibold text-white mb-5">Subscribe to our newsletter</h2>
          <p className="text-sm text-white/80">Get the latest news, articles, and resources delivered weekly to your inbox.</p>
          <div className="flex items-center gap-2 pt-4">
            <input type="email" placeholder="Enter your email" className="border border-gray-500/20 bg-gray-800 text-gray-500 placeholder-gray-500 outline-none w-64 h-9 rounded px-2 text-sm"/>
            <button className="bg-blue-600 w-24 h-9 text-white rounded hover:bg-blue-800 transition-all">Subscribe</button>
          </div>
        </div>
      </div>
      <p className=" py-4 text-center text-xs md:text-sm text-white/60">Copyright 2025 © GreatStack. All Rights Reserved.</p>
    </footer>
  )
}

export default Footer
