import lodashOmit from 'lodash/omit'

const omit = <TObject extends object, TKeys extends keyof TObject>(
  obj: TObject,
  keys: TKeys[]
): Omit<TObject, TKeys> => {
  return lodashOmit(obj, keys)
}

export default omit
