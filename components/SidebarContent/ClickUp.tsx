import { useAppDispatch, useAppSelector } from '@/store/hooks/redux'
import { purchaseClickUp } from '@/store/slice/clickUp'
import { expense, perClickUp } from '@/store/slice/incrementalData '
import IUpgrade from '@/types/IUpgrade'
import Upgrade from './Upgrade'

const ClickUp = () => {
  const dispatch = useAppDispatch()

  const incrementalData = useAppSelector(state => state.incrementalData)
  const handleClick = (title: string, price: number) => {
    if (incrementalData.uniAmount > 0) {
      if (incrementalData.uniAmount - price >= 0) {
        dispatch(purchaseClickUp({ title, price }))
        dispatch(perClickUp(parseInt(title.split(' ')[1])))
        dispatch(expense(+price))
      }
    }
  }

  const clickUpArray = useAppSelector(state => state.clickUp)
  return clickUpArray.map((clickUp: IUpgrade) => (
    <Upgrade
      key={clickUp.title}
      title={clickUp.title}
      price={clickUp.price}
      count={clickUp.count}
      clickFunc={handleClick}
    />
  ))
}

export default ClickUp
