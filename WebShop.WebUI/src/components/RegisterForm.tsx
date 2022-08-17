import { enableStaticRendering, observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '..';

const LoginForm = () => {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isPassMatch, setIsPassMatch] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const { store } = useContext(Context);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // prevent page refresh
    event.preventDefault();

    const result = await store.register(email, password, confirmPassword);
    console.log(result);

    if (result.status === 200) {
      navigate('/successfulRegistration');
    } else {
      navigate('/error')
    }
    
  };

  // Check passwords
  const handleConfirmPassword = () => {
    if ((password || confirmPassword) === '') {
      setIsError(false);
    }
    else if (password && confirmPassword && confirmPassword === password) {
      setIsPassMatch(true);
      setIsError(false);
    }
    else {
      setIsPassMatch(false);
      setIsError(true);
    }
  }
  useEffect(() => handleConfirmPassword())

  return (
    <>
      <div className='flex w-full justify-center items-center z-50 -mt-20 h-screen'>
        <div className='bg-white rounded-lg w-full max-w-md h-auto'>
          <div className='p-8 shadow-lg'>
            <h3 className='font-medium text-xl mb-4'>Registration</h3>
            <form className='space-y-6' onSubmit={handleSubmit}>
              <div>
                <label className='block mb-2 text-sm font-medium'>Your email</label>
                <input className='bg-gray_100 border border-gray_300 text-black text-sm rounded-lg focus:ring-dark focus:!border-dark block w-full p-2.5'
                  onChange={e => setEmail(e.target.value)}
                  value={email}
                  type='email'
                  placeholder='name@company.com'
                  title="name@company.com"
                  pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
                  required
                />
              </div>
              <div>
                <label className='block mb-2 text-sm font-medium'>Your password</label>
                <input className='bg-gray_100 border border-gray_300 text-black text-sm rounded-lg focus:ring-dark focus:!border-dark block w-full p-2.5'
                  onChange={e => { setPassword(e.target.value) }}
                  value={password}
                  type='password'
                  placeholder='••••••••'
                  title='Please input minimum 5 characters'
                  pattern='^(?=.*[A-Za-z])[A-Za-z\d]{5,}$'
                  required
                />
              </div>
              <div>
                <label className='block mb-2 text-sm font-medium'>Confirm your email</label>
                <input className='bg-gray_100 border border-gray_300 text-black text-sm rounded-lg focus:ring-dark focus:!border-dark block w-full p-2.5'
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                  value={confirmPassword}
                  type='password'
                  placeholder='••••••••'
                  title='Please input minimum 5 characters'
                  pattern='^(?=.*[A-Za-z])[A-Za-z\d]{5,}$'
                  required
                />
              </div>
              <div className='flex items-center h-4'>
                <span className='text-red'>{isError ? "Passwords do not match!" : null}</span>
                {isPassMatch ? <button type='submit' className='w-full bg-green hover:bg-blue focus:ring-2 focus:outline-none focus:ring-blue font-medium rounded-lg text-sm px-5 py-2.5 text-center'>Register</button> : null}
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* <div className='bg-black opacity-25 z-40 w-full inset-0 h-auto fixed'></div> */}
    </>
  );
};

export default observer(LoginForm);