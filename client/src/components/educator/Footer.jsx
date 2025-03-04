import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <footer className="flex md:flex-row flex-col-reverse items-center justify-between px-8 py-4 border-t border-gray-500">
      <div className="flex items-center gap-4">
        <img className="hidden md:block w-20" src={assets.logo} alt="logo" />
        <div className="hidden md:block h-7 w-px bg-gray-500/60"></div>
        <p className="text-center text-xs md:text-sm text-gray-800">Copyright 2024 © GreatStack.All Right Reserved.</p>
      </div>
      <div className="flex items-center gap-3 max-md:mt-4">
        <a href="#"><img src={assets.facebook_icon} alt="facebook_icon" /></a>
        <a href="#"><img src={assets.twitter_icon} alt="twitter_icon" /></a>
        <a href="#"><img src={assets.instagram_icon} alt="instagram_icon" /></a>
      </div>
    </footer>
  )
}

export default Footer
