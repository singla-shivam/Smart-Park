import { UID, Timestamp, Price } from './../types'

export interface BookingInterface {
  uid: UID
  id: string
  vehNo: string
  slot: string
  arrivalTime: Timestamp
  expectedCheckoutTime: Timestamp
  actualCheckoutTime: Timestamp
  paymentTime: Timestamp
  /** 1 - 2*o */
  dynamicCharges: number
  actualPrice: Price
  paymentMode: 'cash' | 'online'
}