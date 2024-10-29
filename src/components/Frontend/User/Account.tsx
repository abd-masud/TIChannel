import Link from "next/link";
import { Navigation } from "../Navigation/Navigation";
import Image from "next/image";
import newArrival from "../../../../public/images/dummy.jpg";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const AccountPage = () => {
  return (
    <main className="bg-auth_bg bg-cover bg-center bg-fixed w-screen h-screen">
      <div className="sticky top-0 z-50">
        <Navigation />
      </div>
      <div className="flex justify-center items-center w-screen h-[calc(100vh-85px)]">
        <div className="w-[500px] bg-[#66636342] backdrop-blur-lg sm:px-10 px-8 sm:py-14 py-12 mx-5">
          <h1 className="text-white font-[700] text-[20px] mb-5">
            Account Management
          </h1>
          <div className="flex flex-col items-center rounded-lg bg-black bg-opacity-30 border border-[#45484d] py-5">
            <Image
              className="h-20 w-20 rounded-full"
              src={newArrival}
              height={80}
              width={80}
              alt={"User Account"}
            />
            <form className="w-full sm:px-10 px-5 py-5">
              <div className="mb-4">
                <label
                  className="text-[14px] text-white"
                  htmlFor="createNewPassword"
                >
                  Name
                </label>
                <input
                  placeholder="Enter name"
                  className="border text-[14px] text-white py-3 px-[10px] w-full bg-transparent hover:border-[#B9C1CC] focus:outline-none focus:right-0 focus:border-[#B9C1CC] rounded-md transition-all duration-300 mt-2"
                  type="text"
                  id="createNewPassword"
                  // value={createNewPassword}
                  // onChange={(e) => setCreateNewPassword(e.target.value)}
                  value={"Abdullah Al Masud"}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="text-[14px] text-white"
                  htmlFor="confirmPassword"
                >
                  Email Address
                </label>
                <input
                  placeholder="Enter email address"
                  className="border text-[14px] text-white py-3 px-[10px] w-full bg-transparent hover:border-[#B9C1CC] focus:outline-none focus:right-0 focus:border-[#B9C1CC] rounded-md transition-all duration-300 mt-2"
                  type="email"
                  id="confirmPassword"
                  // value={confirmPassword}
                  // onChange={(e) => setConfirmPassword(e.target.value)}
                  value={"abdmasud.2000@gmail.com"}
                  required
                />
              </div>
              <input
                className="text-[14px] font-[500] bg-primary hover:bg-primary-mouse w-full py-2 rounded text-white cursor-pointer focus:bg-primary-mouse transition-all duration-300"
                type="submit"
                value={"Submit"}
              />
            </form>
          </div>
          <Link
            className="text-red-600 inline-flex items-center text-[14px] font-[500] mt-4"
            href={"/user"}
          >
            <FontAwesomeIcon
              className="h-3 w-3 mr-2 mt-[2px]"
              icon={faAngleLeft}
            />
            Back
          </Link>
        </div>
      </div>
    </main>
  );
};
