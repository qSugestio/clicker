import { User } from 'firebase/auth'
import { TDispatchUsersData } from './Statistic'

interface Props {
  title: string
  typeData: 'uniAmount' | 'perClick' | 'uniSec'
  currentUser: User | null
  data: TDispatchUsersData | undefined
}

const StatisticOutput = ({ title, typeData, currentUser, data }: Props) => {
  return (
    <div>
      <h1 className='flex justify-center bg-gradient-to-r from-[#7c7afe] to-[#bb79f8] text-transparent bg-clip-text'>
        {title} statistic
      </h1>
      <div className='flex justify-between border-b-[3px] border-gradient mb-2'>
        <div className='bg-gradient-to-r from-[#7c7afe] to-[#bb79f8] text-transparent bg-clip-text'>
          Nickname
        </div>
        <div className='bg-gradient-to-r from-[#7c7afe] to-[#bb79f8] text-transparent bg-clip-text'>
          {title}
        </div>
      </div>
      <ul className='list-none'>
        {data !== undefined ? (
          data
            .sort(
              (a, b) =>
                b[1].incrementalData[typeData] - a[1].incrementalData[typeData]
            )
            .map(([key, value]) => (
              <li
                key={key}
                className={`flex justify-between duration-[100ms] ${
                  key === currentUser?.uid || key === currentUser?.displayName
                    ? 'border-[3px] border-[#7c7afe] p-1'
                    : 'py-1 pr-2'
                }`}
              >
                <div className='overflow-y-scroll'>{value.nickname}</div>
                <div className='w-fit ml-4'>
                  {value.incrementalData[typeData]}
                </div>
              </li>
            ))
        ) : (
          <></>
        )}
      </ul>
    </div>
  )
}

export default StatisticOutput
