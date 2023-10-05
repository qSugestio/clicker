import NavLink from '@/components/NavLink/NavLink'
import ClickUp from '@/components/SidebarContent/ClickUp'
import SecUp from '@/components/SidebarContent/SecUp'
import Statistic from '@/components/SidebarContent/Statistic'
import { RequireAuth } from '@/components/auth/RequireAuth'
import { useAppDispatch, useAppSelector } from '@/store/hooks/redux'
import { resetClickUp } from '@/store/slice/clickUp'
import { income, resetData } from '@/store/slice/incrementalData '
import { resetSecUp } from '@/store/slice/secUp'
import { dataSending } from '@/utils/dataSending'
import { useEffect, useRef, useState } from 'react'

export default function Home() {
  const [activeTab, setActiveTab] = useState('ClickUp')

  const interval = useRef<NodeJS.Timeout>()
  const state = useAppSelector(state => state)
  const incrementalData = useAppSelector(state => state.incrementalData)
  const { uniAmount, perClick, uniSec } = useAppSelector(
    state => state.incrementalData
  )

  const dispatch = useAppDispatch()
  const handleClick = () => {
    dispatch(income(perClick))
  }
  const reset = () => {
    dispatch(resetData())
    dispatch(resetClickUp())
    dispatch(resetSecUp())
    clearInterval(interval.current)
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'ClickUp':
        return <ClickUp />

      case 'SecUp':
        return <SecUp />

      case 'Statistic':
        return <Statistic />
    }
  }
  useEffect(() => dataSending(state), [state])

  useEffect(() => {
    if (uniSec === 0) return
    clearInterval(interval.current)
    interval.current = setInterval(() => dispatch(income(uniSec)), 1000)
  }, [dispatch, incrementalData, uniSec])

  return (
    <RequireAuth>
      <div className='flex'>
        <div className='w-fit h-screen bg-[#202020] flex flex-col p-6 select-none'>
          <div className='bg-[#292929] w-fit h-fit rounded-xl flex p-1'>
            <NavLink
              title='ClickUp'
              setActiveTab={setActiveTab}
              activeTab={activeTab}
            />
            <NavLink
              title='SecUp'
              setActiveTab={setActiveTab}
              activeTab={activeTab}
            />
            <NavLink
              title='Statistic'
              setActiveTab={setActiveTab}
              activeTab={activeTab}
            />
          </div>
          <div className='overflow-y-auto overflow-x-hidden p-2'>
            {renderContent()}
          </div>
        </div>
        <div className='flex flex-col w-full h-screen p-4 relative'>
          <div className='flex justify-center'>
            <div className='flex flex-col text-3xl'>
              <span>{uniAmount} Uni</span>
              <span>{perClick} per click</span>
              <span>{uniSec} Uni/sec</span>
            </div>
          </div>
          <div className='flex h-full justify-center items-center'>
            <button
              className='bg-white select-none text-black p-8 px-20 text-3xl duration-[300ms] hover:scale-[1.2] hover:border-[8px] hover:border-[#7c7afe] active:scale-[0.8] active:bg-[#7c7afe] active:text-white'
              onClick={handleClick}
            >
              Click Me!
            </button>
          </div>
          <div className='absolute bottom-0 right-0 m-4'>
            <button
              className='bg-[#060711] select-none text-white p-4 px-20 text-xl duration-[300ms] hover:scale-[1.1] hover:border-[8px] hover:border-[#7c7afe] active:scale-[0.8] active:bg-[#7c7afe] active:text-white'
              onClick={reset}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </RequireAuth>
  )
}
