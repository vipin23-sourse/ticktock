

import React from "react";
import LoginForm from "@/feature/auth/components/LoginForm";

const LoginPage = () => {
  return (
    <section className="min-h-screen bg-primary flex flex-col justify-center">
      <div className="w-full min-h-screen flex flex-col justify-between max-md:justify-center items-center md:grid md:grid-cols-2 p-5 md:p-0">
        
        {/* Mobile Header Title */}
        <h1 className="text-white max-sm:mt-auto text-2xl font-bold md:hidden block text-center mb-4">
          Welcome back
        </h1>

        {/* Form Column */}
        <div className="flex flex-col justify-center  w-full sm:h-full px-6 sm:px-12  lg:px-24 bg-white md:rounded-none rounded-xl py-8 md:py-0 shadow-sm md:shadow-none">
          <div className="md:max-w-md w-full mx-auto">
            <h1 className="text-gray-900 text-2xl font-bold mb-6 md:block hidden">
              Welcome back
            </h1>

            <LoginForm />
          </div>
        </div>

        {/* Info Column */}
        <div className="bg-primary sm:h-full px-6 sm:px-12 md:px-16 lg:px-24 text-white flex flex-col justify-center text-center md:text-left py-8 md:py-0 max-sm:mt-auto">
          <div className="max-w-md mx-auto md:mx-0">
            <h2 className="text-2xl sm:text-[2.5rem] font-bold leading-normal mb-3">
              ticktock
            </h2>
            <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
              Introducing ticktock, our cutting-edge timesheet web application designed to revolutionize how you manage employee work hours. With ticktock, you can effortlessly track and monitor employee attendance and productivity from anywhere, anytime, using any internet-connected device.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;