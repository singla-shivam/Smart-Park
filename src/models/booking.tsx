import { UID, Timestamp, Price } from './../types'

export interface BookingInterface {
  uid: UID
  vehNo: string
  slot: string
  arrivalTime: Timestamp
  expectedCheckoutTime: Timestamp
  actualCheckoutTime: Timestamp
  /** 1 - 2*o */
  dynamicCharges: number
  actualPrice: Price
  paymentMode: 'cash' | 'online'
}