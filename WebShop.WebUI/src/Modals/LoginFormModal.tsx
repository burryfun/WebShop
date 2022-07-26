import React, { useEffect, useRef, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";

interface ILoginFormInput {
  email: string;
  password: string;
}

const LoginFormModal = () => {

  const [showLoginForm, setShowLoginForm] = useState(false);
  const [isopacityLoginForm, setOpacityLoginForm] = useState(true);
  const [isScaleLoginForm, setScaleLoginForm] = useState(true);

  const { register, handleSubmit } = useForm<ILoginFormInput>();
  const onSubmit = (loginData: ILoginFormInput) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: loginData.email, password: loginData.password }),
    };

    fetch(`${process.env.REACT_APP_API_URL}/api/login`, requestOptions)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.log(error))
  };

  // Disable opacity background and scaling modal form if click to outisde from form
  const isOnClickOutsideTargetContainer = true;
  const targetContainer = useRef<HTMLDivElement>(null);
  const onOverlayClick = (e: React.MouseEvent) => {
    if (!targetContainer.current?.contains(e.target as Node)) {
      setShowLoginForm(false);
      setOpacityLoginForm(true);
      setScaleLoginForm(true);
    }
  };

  return (

    <>

      {/* Modal toggle */}
      <button onClick={() => {
        setShowLoginForm(true);

        setTimeout(() => {
          setOpacityLoginForm(false);
          setScaleLoginForm(false);
        }, 100);
      }} className="block text-base bg-green hover:bg-dark rounded-lg px-4 py-3 self-center">
        Login
      </button>

      {showLoginForm ? (
        <>
          {/* Main modal */}
          <div id="main_modal" className={`flex fixed z-50 w-full md:inset-0 justify-center items-center ${isScaleLoginForm ? "opacity-0" : "opacity-100"} ${isScaleLoginForm ? "scale-50" : "scale-100"}  transition-all duration-300`}
            onClick={isOnClickOutsideTargetContainer ? onOverlayClick : undefined}>
            <div className="relative p-4 w-full max-w-md h-auto">
              {/* Modal content */}
              <div className="relative bg-white rounded-lg shadow" ref={targetContainer}>
                <button className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-light hover:text-dark rounded-lg text-sm p-1.5 inline-flex items-center"
                  onClick={() => {
                    setOpacityLoginForm(true);
                    setScaleLoginForm(true)
                    setTimeout(() => {
                      setShowLoginForm(false);
                    }, 300);
                  }} >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" ></path>
                  </svg>
                </button>
                <div className="py-6 px-6 lg:px-8">
                  <h3 className="mb-4 text-xl font-medium text-black">Sign in to our platform</h3>

                  <form className="space-y-6" action="#" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-black">Your email</label>
                      <input {...register("email")} type="email" name="email" id="email" className="bg-gray_100 border border-gray_300 text-black text-sm rounded-lg focus:ring-dark focus:!border-dark block w-full p-2.5" placeholder="name@company.com" required>
                      </input>
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-black">Your password</label>
                      <input {...register("password")} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray_100 border border-gray_300 text-black text-sm rounded-lg focus:ring-dark focus:border-dark block w-full p-2.5" required>
                      </input>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input id="remember" type="checkbox" value="" className="w-4 h-4 bg-gray_100 rounded border border-gray_300">
                          </input>
                        </div>
                        <label className="ml-2 text-sm font-medium text-black">Remember me</label>
                      </div>
                      <a href="#" className="text-sm text-blue-700 hover:underline">Lost Password?</a>
                    </div>
                    <button type="submit" className="w-full bg-green hover:bg-blue focus:ring-2 focus:outline-none focus:ring-blue font-medium rounded-lg text-sm px-5 py-2.5 text-center">Login to your account</button>
                    <div className="text-sm font-medium text-gray_500">
                      Not registered? <a href="#" className="text-black hover:underline">Create account</a>
                    </div>
                  </form>

                </div>
              </div>
            </div>
          </div>
          {/* Outside */}
          <div id='bg_openedModal' className={`!ml-0 inset-0 fixed w-full z-40 bg-black ${isopacityLoginForm ? "opacity-0" : "opacity-25"} transition-opacity duration-300`}></div>
        </>
      ) : null}
    </>
  )
};

export default LoginFormModal;