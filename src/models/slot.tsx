import { UID } from './../types'

export interface SlotInterface {
  uid: UID
  occupied: boolean
  slotId: string
  ease: number
}