import { Dispatch, SetStateAction } from 'react'

interface Props {
  factor: number
  setSelectedFactor: Dispatch<SetStateAction<number>>
  selectedFactor: number
}

const FactorButton = ({ factor, setSelectedFactor, selectedFactor }: Props) => {
  return (
    <button
      key={factor + 'x'}
      id='factor'
      onClick={() => setSelectedFactor(factor)}
      className={`ml-1 px-1 rounded-lg duration-[100ms] hover:bg-[#7c7afe] ${
        selectedFactor === factor ? 'bg-[#7c7afe]' : ''
      }`}
    >
      {factor}x
    </button>
  )
}

export default FactorButton
