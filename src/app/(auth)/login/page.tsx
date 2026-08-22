

import LoginForm from '@/feature/auth/components/LoginForm'

const LoginPage = () => {



  return (
    <section className="h-screen bg-primary">
      <div className="w-full h-full flex flex-col justify-center items-center md:grid md:grid-cols-2 sm:p-0 p-5">
        
          <div className='flex items-center justify-center my-4 '>
            <h1 className="text-white leading-tight text-xl font-bold">Welcome back</h1>
          </div>
        

        {/* Left Form Column */}
        <div className="grid items-center w-full h-full px-5 sm:px-20 md:px-30 lg:px-40 xl:px-72 bg-white sm:rounded-none rounded-lg py-6 sm:py-0">
          <div className="max-w-xl w-full mx-auto">
          
              <h1 className="text-black leading-tight text-xl font-bold mb-5">Welcome back</h1>
          

            <LoginForm />
          </div>
        </div>


        <div className="bg-primary h-full px-4 sm:px-20 md:px-30 lg:px-40 xl:px-72 text-white grid items-center my-auto text-center md:text-left py-6 md:py-0">
          <div className="max-w-xl mx-auto md:mx-0">
            <h1 className="text-lg sm:text-[2.5rem] font-semibold leading-normal mb-3">ticktock</h1>
            <p className='sm:text-normal text-sm'>
              Introducing ticktock, our cutting-edge timesheet web application designed to revolutionize how you manage employee work hours. With ticktock, you can effortlessly track and monitor employee attendance and productivity from anywhere, anytime, using any internet-connected device.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoginPage;