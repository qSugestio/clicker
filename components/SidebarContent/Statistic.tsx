/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuth } from '@/store/hooks/useAuth'
import { IClickUp } from '@/store/slice/incrementalData '
import IUpgrade from '@/types/IUpgrade'
import { database } from '@/utils/firebase'
import { getAuth, signOut, updateProfile } from 'firebase/auth'
import { child, get, ref, set } from 'firebase/database'
import { useEffect, useRef, useState } from 'react'
import StatisticOutput from './StatisticOutput'

interface IUsersData {
  [key: string]: {
    nickname: string
    incrementalData: IClickUp
    secUp: IUpgrade[]
    clickUp: IUpgrade[]
  }
}

export type TDispatchUsersData = [
  string,
  {
    nickname: string
    incrementalData: IClickUp
    secUp: IUpgrade[]
    clickUp: IUpgrade[]
  }
][]

const Statistic = () => {
  const auth = getAuth()
  const { currentUser, id } = useAuth()
  const [isInput, setIsInput] = useState<boolean>(false)
  const [data, setData] = useState<TDispatchUsersData>()

  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    get(child(ref(database), '/'))
      .then(snapshot => {
        const data: IUsersData = snapshot.val()
        if (currentUser !== null && currentUser.displayName !== null) {
          data[currentUser.displayName] = data[currentUser.uid]
          delete data[currentUser.uid]
        }
        setData(Object.entries(data))
      })
      .catch(console.error)
  }, [])

  return (
    <div className='select-text'>
      <div className='flex justify-between mb-2'>
        <div>
          <span className='text-[#7c7afe]'>Nickname:</span>{' '}
          {currentUser?.displayName !== null
            ? currentUser?.displayName
            : currentUser.uid}
        </div>
        <div className='flex flex-col text-[#7c7afe] duration-[100ms]'>
          <button
            className='duration-[100ms] hover:scale-[1.1]'
            onClick={() => {
              setIsInput(!isInput)
            }}
          >
            Edit
          </button>
          <input
            ref={inputRef}
            type='text'
            className={`duration-[100ms] ${
              !isInput ? 'w-[0px] h-[0px]' : 'w-[60px] h-[25px]'
            }`}
          />
          {isInput ? (
            <button
              className='duration-[100ms] hover:scale-[1.1]'
              onClick={() => {
                if (currentUser !== null && inputRef.current !== null) {
                  updateProfile(currentUser, {
                    displayName: inputRef.current.value,
                  })
                  set(ref(database, `${id}/nickname`), inputRef.current.value)
                  setIsInput(!isInput)
                }
              }}
            >
              ok
            </button>
          ) : (
            ''
          )}

          <button
            onClick={() => signOut(auth)}
            className='duration-[100ms] hover:scale-[1.1]'
          >
            Log out
          </button>
        </div>
      </div>
      {data !== undefined ? (
        <>
          <StatisticOutput
            title='Uni count'
            typeData='uniAmount'
            currentUser={currentUser}
            data={data}
            key='uniCount'
          />
          <StatisticOutput
            title='Per click'
            typeData='perClick'
            currentUser={currentUser}
            data={data}
            key='perClick'
          />
          <StatisticOutput
            title='Uni sec'
            typeData='uniSec'
            currentUser={currentUser}
            data={data}
            key='uniSec'
          />
        </>
      ) : (
        <div className='flex justify-center text-[#7c7afe] font-bold'>
          No data
        </div>
      )}
    </div>
  )
}

export default Statistic
