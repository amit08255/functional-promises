import { FPInputError } from './modules/errors.js'

/**
 * 
 * @param {FP} FunctionalPromises 
 */
export default function promise(FP) {

  return { all, delay, _delay }

  function all(promises) {
    return FP.resolve(Array.isArray(promises) ? Promise.all(promises) : promiseAllObject(promises))
  }

  function promiseAllObject(obj) {
    const keys = Object.getOwnPropertyNames(obj)
    const values = keys.map(key => obj[key])
    return Promise.all(values).then(results => results.reduce((obj, val, index) => {
      const key = keys[index]
      return Object.assign({ [key]: val }, obj)
    }, {}))
  }

  /**
   * 
   * @param {Number} msec 
   * @returns {any => FP}
   */
  function _delay(msec) {
    if (!Number.isInteger(msec)) throw new FPInputError('FP.delay(millisec) requires a numeric arg.')
    return value => new FP(resolve => { setTimeout(() => resolve(value), msec) })
  }

  function delay(msec) {
    if (this.steps) return this.addStep('delay', [...arguments])
    return this && this._FP ? FP.resolve(this.then(_delay(msec))) : _delay(msec)()
  }
}
