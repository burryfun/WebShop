import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '..';

const LoginFormModal = () => {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { store } = useContext(Context);
  const navigate = useNavigate();

  const [isShowLoginForm, setIsShowLoginForm] = useState<boolean>(false);
  const [isScaleLoginForm, setScaleLoginForm] = useState(true);
  const [isOpacityLoginForm, setOpacityLoginForm] = useState(true);


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // prevent page refresh
    event.preventDefault();

    const result = await store.login(email, password);
    if (result?.status === 200) {
      navigate('/');
      setIsShowLoginForm(false);
    } else {
      navigate('/error');
    }
  };

  const handleLogout = async () => {
    const result = await store.logout();

    if (result?.status === 200) {
      navigate('/');
    } else {
      navigate('/error');
    }
  }

  // Disable opacity background and scaling modal form if click to outisde from form
  const isOnClickOutsideTargetContainer = true;
  const targetContainer = useRef<HTMLDivElement>(null);
  const onOverlayClick = (e: React.MouseEvent) => {
    if (!targetContainer.current?.contains(e.target as Node)) {
      setTimeout(() => {
        setIsShowLoginForm(false);
      }, 300);
      setOpacityLoginForm(true);
      setScaleLoginForm(true);
    }
  };

  return (
    <>
      {/* Modal toggle */}

      <button className='block text-base bg-green hover:bg-dark rounded-lg px-4 py-3 self-center'
        onClick={() => {

          if (store.isAuth) {
            handleLogout();
          } else {
            setIsShowLoginForm(true);
          }
          setTimeout(() => {
            setOpacityLoginForm(false);
            setScaleLoginForm(false);
          }, 100);
        }}>
        {store.isAuth ? "Logout" : "Login"}
      </button>

      {isShowLoginForm ? (
        <>
          {/* Main modal */}
          <div className={`flex fixed z-50 w-full md:inset-0 justify-center items-center ${isOpacityLoginForm ? "opacity-0" : "opacity-100"} ${isScaleLoginForm ? "scale-50" : "scale-100"}  transition-all duration-300`}
            onClick={isOnClickOutsideTargetContainer ? onOverlayClick : undefined}>
            <div className="relative p-4 w-full max-w-md h-auto">
              {/* Modal content */}
              <div className="relative bg-white rounded-lg shadow" ref={targetContainer}>
                <button className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-light hover:text-dark rounded-lg text-sm p-1.5 inline-flex items-center"
                  onClick={() => {
                    setOpacityLoginForm(true);
                    setScaleLoginForm(true)
                    setTimeout(() => {
                      setIsShowLoginForm(false);
                    }, 300);
                  }} >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" ></path>
                  </svg>
                </button>
                <div className="py-6 px-6 lg:px-8">
                  <h3 className="mb-4 text-xl font-medium text-black">Sign in to our platform</h3>
                  <form className="space-y-6" action="#" onSubmit={handleSubmit}>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-black">Your email</label>
                      <input
                        className='bg-gray_100 border border-gray_300 text-black text-sm rounded-lg focus:ring-dark focus:!border-dark block w-full p-2.5'
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        type='email'
                        placeholder='Email'
                        pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-black">Your email</label>
                      <input
                        className='bg-gray_100 border border-gray_300 text-black text-sm rounded-lg focus:ring-dark focus:!border-dark block w-full p-2.5'
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        type='password'
                        placeholder='••••••••'
                        required
                      />
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
                    <button type='submit' className='w-full bg-green hover:bg-blue focus:ring-2 focus:outline-none focus:ring-blue font-medium rounded-lg text-sm px-5 py-2.5 text-center'>
                      Login to your account
                    </button>
                    <div className="text-sm font-medium text-gray_500">
                      Not registered? <a onClick={() => {
                        setIsShowLoginForm(false);
                        navigate('/register');
                        }} href="#" className="text-black hover:underline">Create account</a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* Outside */}
          <div id='bg_openedModal' className={`!ml-0 inset-0 fixed w-full z-40 bg-black ${isOpacityLoginForm ? "opacity-0" : "opacity-25"} transition-opacity duration-300`}></div>
        </>
      ) : null}

    </>
  );
};

export default observer(LoginFormModal);