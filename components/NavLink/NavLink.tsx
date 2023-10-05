import { Dispatch, SetStateAction } from 'react'
import styles from './NavLink.module.css'

interface Props {
  title: string
  activeTab: string
  setActiveTab: Dispatch<SetStateAction<string>>
}

function NavLink({ title, activeTab, setActiveTab }: Props) {
  const isActive = activeTab === title

  return (
    <div
      className={`w-[90px] h-[42px] bg-[#363636] flex items-center justify-center py-1 px-2 rounded-xl m-1 text-base cursor-pointer ${
        styles.tablinks
      } ${isActive && 'bg-[#7c7afe] border-[#7c7afe]'}`}
      onClick={() => setActiveTab(title)}
    >
      <button>{title}</button>
    </div>
  )
}

export default NavLink
