import Link from 'next/link'
import { MouseEvent, useState } from 'react'

interface Props {
  title: string
  handleClick: (
    email: string,
    password: string,
    e: MouseEvent<HTMLButtonElement>
  ) => void
}

const Form = ({ title, handleClick }: Props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className='flex min-h-full flex-col justify-center px-6 py-12 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white'>
          {title} to your account
        </h2>
      </div>

      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <form className='space-y-6' action='#' method='POST'>
          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium leading-6 text-white'
            >
              Email address
            </label>
            <div className='mt-2'>
              <input
                onChange={e => setEmail(e.target.value)}
                value={email}
                id='email'
                name='email'
                type='email'
                autoComplete='email'
                required
                className='block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-[#1d2027] bg-[#131720] focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />
              <div id='error-email' className='text-[#dc2626]' />
            </div>
          </div>

          <div>
            <div className='flex items-center justify-between'>
              <label
                htmlFor='password'
                className='block text-sm font-medium leading-6 text-white'
              >
                Password
              </label>
            </div>
            <div className='mt-2'>
              <input
                onChange={e => setPassword(e.target.value)}
                value={password}
                id='password'
                name='password'
                type='password'
                autoComplete='current-password'
                required
                className='block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-[#1d2027] bg-[#131720] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />
              <div id='error-password' className='text-[rgb(220,48,38)]' />
            </div>
          </div>

          <div>
            <button
              id='button'
              type='submit'
              onClick={e => handleClick(email, password, e)}
              className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              {title}
            </button>
          </div>
        </form>

        <p className='mt-10 text-center text-lg font-semibold leading-6 text-indigo-600 hover:text-indigo-500'>
          {title === 'sign in' ? (
            <Link href='/signup'>sign up</Link>
          ) : (
            <Link href='/signin'>sign in</Link>
          )}
        </p>
      </div>
    </div>
  )
}

export default Form
