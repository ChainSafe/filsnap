import { FilecoinNumber } from '@glif/filecoin-number'

export const filToAttoFil = (filValue: string): string => {
  const filecoinNumber = new FilecoinNumber(filValue, 'attofil')
  return filecoinNumber.toAttoFil()
}

export const attoFilToFil = (attoFilValue: string): string => {
  const filecoinNumber = new FilecoinNumber(attoFilValue, 'atto')
  return filecoinNumber.toFil()
}