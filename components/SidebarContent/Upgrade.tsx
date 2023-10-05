interface Props {
  title: string
  price: number
  count: number
  clickFunc: (title: string, price: number) => void
}

const Upgrade = ({ title, price, count, clickFunc }: Props) => {
  // const [selectedFactor, setSelectedFactor] = useState(1)
  // const splitTitle = title.split(' ')

  return (
    <div
      className='w-full border-[4px] border-white rounded-xl p-2 my-3 bg-[#292929] flex flex-col self-stretch text-2xl duration-[200ms] hover:border-[#7c7afe] hover:scale-[1.05] active:bg-[#7c7afe] active:border-[#7c7afe] active:scale-[0.9]'
      onClick={e => {
        if ((e.target as HTMLButtonElement).id === 'factor') return
        clickFunc(title, price)
      }}
    >
      <span>{title}</span>
      <span>{price} Uni</span>
      <span className='text-3xl self-end'>{count}</span>
    </div>
  )
}

export default Upgrade
