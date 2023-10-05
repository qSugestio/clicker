import { useAppDispatch, useAppSelector } from '@/store/hooks/redux'
import { expense, uniSecUp } from '@/store/slice/incrementalData '
import { purchaseSecUp } from '@/store/slice/secUp'
import IUpgrade from '@/types/IUpgrade'
import Upgrade from './Upgrade'

const SecUp = () => {
  const dispatch = useAppDispatch()

  const incrementalData = useAppSelector(state => state.incrementalData)
  const handleClick = (title: string, price: number) => {
    if (incrementalData.uniAmount > 0) {
      if (incrementalData.uniAmount - price >= 0) {
        dispatch(purchaseSecUp({ title, price }))
        dispatch(uniSecUp(price))
        dispatch(expense(price))
      }
    }
  }

  const secUpArray = useAppSelector(state => state.secUp)
  return secUpArray.map((secUp: IUpgrade) => (
    <Upgrade
      key={secUp.title}
      title={secUp.title}
      price={secUp.price}
      count={secUp.count}
      clickFunc={handleClick}
    />
  ))
}

export default SecUp
