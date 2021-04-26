import { render, fireEvent } from '@testing-library/react'
import Counter from '../Counter'

test('header renders with correct text', () => {
  const component = render(<Counter />)
  const headerEl = component.getByTestId('header')
  expect(headerEl.textContent).toBe('My Counter')
})

test('counter should initially start with text of 0', () => {
  const { getByTestId } = render(<Counter />)
  const counterEl = getByTestId('counter')
  expect(counterEl.textContent).toBe('0')
})

test('input contains initial value of 1', () => {
  const { getByTestId } = render(<Counter />)
  const inputEl = getByTestId('input')
  expect(inputEl.value).toBe('1')
})

test('add button renders with +', () => {
  const { getByTestId } = render(<Counter />)
  const addBtn = getByTestId('add-btn')
  expect(addBtn.textContent).toBe('+')
})

test('subtract button renders with -', () => {
  const { getByTestId } = render(<Counter />)
  const subtractBtn = getByTestId('subtract-btn')
  expect(subtractBtn.textContent).toBe('-')
})

test('change value of input works correctly', () => {
  const { getByTestId } = render(<Counter />)
  const inputEl = getByTestId('input')
  expect(inputEl.value).toBe('1')
  fireEvent.change(inputEl, {
    target: {
      value: '5'
    }
  })
  expect(inputEl.value).toBe('5')
})

test('click on plus btn adds 1 to counter', () => {
  const { getByTestId } = render(<Counter />)
  const addBtn = getByTestId('add-btn')
  const counterEl = getByTestId('counter')

  expect(counterEl.textContent).toBe('0')

  fireEvent.click(addBtn)

  expect(counterEl.textContent).toBe('1')
})

test('click on minus btn subtracts 1 from counter', () => {
  const { getByTestId } = render(<Counter />)
  const subtractBtn = getByTestId('subtract-btn')
  const counterEl = getByTestId('counter')

  expect(counterEl.textContent).toBe('0')

  fireEvent.click(subtractBtn)

  expect(counterEl.textContent).toBe('-1')
})

test('changing input value then clicking on add btn works correctly', () => {
  const { getByTestId } = render(<Counter />)
  const addBtn = getByTestId('add-btn')
  const counterEl = getByTestId('counter')
  const inputEl = getByTestId('input')

  fireEvent.change(inputEl, {
    target: {
      value: '5'
    }
  })

  fireEvent.click(addBtn)

  expect(counterEl.textContent).toBe('5')
})

test('changing input value then clicking on subtract btn works correctly', () => {
  const { getByTestId } = render(<Counter />)
  const subtractBtn = getByTestId('subtract-btn')
  const counterEl = getByTestId('counter')
  const inputEl = getByTestId('input')

  fireEvent.change(inputEl, {
    target: {
      value: '5'
    }
  })

  fireEvent.click(subtractBtn)

  expect(counterEl.textContent).toBe('-5')
})

test('adding and then subtracting leads to the current counter value', () => {
  const { getByTestId } = render(<Counter />)
  const addBtn = getByTestId('add-btn')
  const subtractBtn = getByTestId('subtract-btn')
  const counterEl = getByTestId('counter')
  const inputEl = getByTestId('input')

  fireEvent.change(inputEl, {
    target: {
      value: '10'
    }
  })

  fireEvent.click(addBtn)
  fireEvent.click(addBtn)
  fireEvent.click(addBtn)
  fireEvent.click(addBtn)
  fireEvent.click(subtractBtn)
  fireEvent.click(subtractBtn)

  expect(counterEl.textContent).toBe('20')

  fireEvent.change(inputEl, {
    target: {
      value: '5'
    }
  })

  fireEvent.click(addBtn)
  fireEvent.click(subtractBtn)
  fireEvent.click(subtractBtn)

  expect(counterEl.textContent).toBe('15')
})

test('counter contains correct className', () => {
  const { getByTestId } = render(<Counter />)
  const counterEl = getByTestId('counter')
  const addBtn = getByTestId('add-btn')
  const subtractBtn = getByTestId('subtract-btn')
  const inputEl = getByTestId('input')

  expect(counterEl.className).toBe('')

  fireEvent.change(inputEl, {
    target: {
      value: '50'
    }
  })

  fireEvent.click(addBtn) //50

  expect(counterEl.className).toBe('')

  fireEvent.click(addBtn) //100

  expect(counterEl.className).toBe('green')

  fireEvent.click(addBtn) //150

  expect(counterEl.className).toBe('green')

  fireEvent.click(subtractBtn)   //100
  fireEvent.click(subtractBtn)    //50

  expect(counterEl.className).toBe('')

  fireEvent.click(subtractBtn)   //0
  fireEvent.click(subtractBtn)    //-50
  fireEvent.click(subtractBtn)    //-100

  expect(counterEl.className).toBe('red')
})