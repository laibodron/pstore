import lodashPick from 'lodash/pick'

const pick = <TObject extends object, TKeys extends keyof TObject>(
  obj: TObject,
  keys: TKeys[]
): Pick<TObject, TKeys> => {
  return lodashPick(obj, keys)
}

export default pick
