import { FilecoinNumber } from '@glif/filecoin-number'

export const filToAttoFil = (filValue: string): string => {
  const filecoinNumber = new FilecoinNumber(filValue, 'fil')
  return filecoinNumber.toAttoFil()
}

export const attoFilToFil = (attoFilValue: string): string => {
  const filecoinNumber = new FilecoinNumber(attoFilValue, 'attofil')
  return filecoinNumber.toFil()
}