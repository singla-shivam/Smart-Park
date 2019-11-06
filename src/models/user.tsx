import { UID } from './../types'

export interface UserInterface {
  name: string
  email: string
  phoneNo: string
  uid: UID
  vehNo: string
  /** Aadhar ID */
  id: number
  userType: 'user' | 'admin'
  /** the pending fee */
  balance: number
  [key: string] : any
}