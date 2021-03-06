import test from 'ava'
import FP from '../'

test('FP.concurrency()', t => {
  const squareAndFormatDecimal = FP
    .chain<number[]>()
    .concurrency(100)
    .map((x: number) => x * x)
    .concurrency(2)
    .map(x => parseFloat('' + x).toFixed(2))
    .chainEnd() // returns function

  return squareAndFormatDecimal([5, 10, 20])
    .then(num => t.deepEqual(num, ['25.00', '100.00', '400.00']))
})

test('FP.concurrency(Infinity)', t => {
  const squareAndFormatDecimal = FP
    .chain<number[]>()
    .concurrency(Infinity)
    .map((x: number) => x * x)
    .chainEnd() // returns function

  return squareAndFormatDecimal([5, 10, 20])
    .then(num => t.deepEqual(num, [25, 100, 400]))
})
