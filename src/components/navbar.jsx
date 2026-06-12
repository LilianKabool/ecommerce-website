import { Link } from "react-router-dom";
import { UseAuth } from "../context/AuthContext";
import { BiCart } from "react-icons/bi";
export default function Navbar() {
  const { user, logOut } = UseAuth();
  return (
    <nav className="bg-rose-50 shadow-md py-4 sticky top-0 z-[100] mx-6 rounded-2xl">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8  flex flex-wrap items-center justify-between">
        <Link
          to="/home"
          className="text-lg md:text-xl font-bold text-[#cd936c] no-underline hover:scale-110 hover:text-yellow-800 transition-all duration-300 ease-in-out"
        >
          ShopHup
        </Link>
        <div className="flex items-center gap-3 md:gap-8">
          {!user ? (
            <div className="flex justify-center items-center gap-4">
              <Link
                to="/auth?mode=login"
                className="text-sm md:text-base text-[#cd936c] font-bold hover:scale-110 hover:text-yellow-800 transition-all duration-300 ease-in-out"
              >
                Login
              </Link>

              <Link
                to="/auth?mode=signup"
                className="text-sm md:text-base text-[#cd936c] font-bold hover:scale-110 hover:text-yellow-800 transition-all duration-300 ease-in-out"
              >
                Signup
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <span className="hidden sm:block text-[0.9rem] text-[#cd936c] max-w-[120px] truncate">
                hello, {user.email}
              </span>

              <button
                className=" text-[#cd936c] font-bold hover:scale-110 hover:text-yellow-800 transition-all duration-300 ease-in-out"
                onClick={logOut}
              >
                Logout
              </button>
            </div>
          )}

          <Link
            to="/checkout"
            className="text-xl md:text-2xl text-[#cd936c] hover:scale-110 hover:text-yellow-800 transition-all duration-300 ease-in-out"
          >
            <BiCart />
          </Link>
        </div>
      </div>
    </nav>
  );
}