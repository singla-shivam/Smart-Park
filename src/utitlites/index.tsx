import {SlotInterface} from './../models/slot'
export function getSlot(slots: SlotInterface[], timeDuration: number): string {
  let slot = ''
  const totalNoOfSlots = slots.length
  if(timeDuration > 7 * 24 * 60 * 60 * 1000) {
      // more than two days
      const max = totalNoOfSlots, min = Math.floor(2 * totalNoOfSlots / 3)
      const random = Math.ceil(Math.random() * (max - min) + min)
      slot = slots[random].slotId
  }
  else if(timeDuration <= 7 * 24 * 60 * 60 * 1000 && timeDuration > 1 * 24 * 60 * 60 * 1000) {
      const max =  Math.floor(2 * totalNoOfSlots / 3), min = Math.floor(1 * totalNoOfSlots / 3)
      const random = Math.ceil(Math.random() * (max - min) + min)
      slot = slots[random].slotId
  }
  else {
      const max =  Math.floor(1 * totalNoOfSlots / 3), min = 0
      const random = Math.ceil(Math.random() * (max - min) + min)
      slot = slots[random].slotId
  }

  return slot
}