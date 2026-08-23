

import React from "react";
import LoginForm from "@/feature/auth/components/LoginForm";

const LoginPage = () => {
  return (
    <section className="min-h-screen bg-primary flex flex-col">
      <div className="w-full min-h-screen flex flex-col justify-center items-center md:grid md:grid-cols-2 sm:p-0 p-5">
        <h1 className="text-white max-sm:mt-auto leading-tight text-xl font-bold md:hidden block">
          Welcome back
        </h1>

        {/* Left Form Column */}
        <div className="grid items-center w-full max-sm:mt-5 max-sm:mb-auto sm:h-full px-5 md:px-20 lg:px-30 xl:px-40 2xl:px-72 bg-white sm:rounded-none rounded-lg py-6 sm:py-0">
          <div className="max-w-xl w-full mx-auto">
            <h1 className="text-black leading-tight text-xl font-bold mb-5 md:block hidden">
              Welcome back
            </h1>

            <LoginForm />
          </div>
        </div>

        <div className="bg-primary max-sm:items-end max-sm:m-0 sm:h-full px-5 md:px-20 lg:px-30 xl:px-40 2xl:px-72 text-white grid items-center my-auto text-center md:text-left py-6 md:py-0">
          <div className="max-w-xl mx-auto md:mx-0">
            <h2 className="text-lg sm:text-[2.5rem] font-semibold leading-normal mb-3">
              ticktock
            </h2>
            <p className="sm:text-normal text-sm">
              Introducing ticktock, our cutting-edge timesheet web application designed to revolutionize how you manage employee work hours. With ticktock, you can effortlessly track and monitor employee attendance and productivity from anywhere, anytime, using any internet-connected device.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;