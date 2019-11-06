import { UID } from './../types'

export interface UserInterface {
  name: string
  email: string
  phoneNo: string
  uid: UID
  vehNo: string
  /** Aadhar ID */
  id: String
  userType: 'user' | 'admin'
}