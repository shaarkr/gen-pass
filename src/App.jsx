import { useEffect, useRef, useState, useCallback } from 'react'
import IconCopy from './components/IconCopy'
import InputSlider from './components/InputSlider'
import checkPasswordStrength, { Metric } from './utils/password-strength'

function App() {
  const [length, setLength] = useState(8)
  const [uppercaseAllowed, setUppercaseAllowed] = useState(false)
  const [lowecaseAllowed, setLowecaseAllowed] = useState(true)
  const [numbersAllowed, setNumbersAllowed] = useState(false)
  const [symbolsAllowed, setSymbolsAllowed] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordStrength, setPasswordStrength] = useState({
    metric: Metric.Weak,
    strength: 0,
  })

  // useRef hook
  const passwordRef = useRef(null)
  const strengthIndicatorRef = useRef(null)

  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  const passwordGenerator = useCallback(() => {
    let pass = ''
    let dictionary = ''
    if (uppercaseAllowed) dictionary += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (lowecaseAllowed) dictionary += 'abcdefghijklmnopqrstuvwxyz'
    if (numbersAllowed) dictionary += '0123456789'
    if (symbolsAllowed) dictionary += '!@#$%^&*()_+-={}[];<>:'

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * dictionary.length + 1)
      pass += dictionary.charAt(char)
    }
    setPassword(pass)
    const { strength, metric } = checkPasswordStrength(pass)
    setPasswordStrength({ strength, metric })
  }, [
    length,
    uppercaseAllowed,
    lowecaseAllowed,
    numbersAllowed,
    symbolsAllowed,
    setPassword,
  ])

  useEffect(() => {
    passwordGenerator()
  }, [
    length,
    uppercaseAllowed,
    lowecaseAllowed,
    numbersAllowed,
    symbolsAllowed,
    passwordGenerator,
  ])

  useEffect(() => {
    const indicators = strengthIndicatorRef.current?.children
    if (!indicators) return

    // reset strength indicators
    Array.from(indicators).forEach(el => el.classList.remove('active'))

    // update strength indicator
    for (let i = 0; i < passwordStrength.strength; i++) {
      indicators[i].classList.add('active')
    }
  }, [passwordStrength, strengthIndicatorRef])

  return (
    <>
      <div className='flex items-center justify-center w-full h-screen bg-cinder-dark'>
        <div className='flex flex-col w-full gap-6 mx-6 md:w-1/3 md:mx-0'>
          <h1 className='self-center text-xl font-bold text-cinder'>
            Password Generator
          </h1>

          <div className='flex items-center justify-between gap-4 p-4 rounded bg-sea-dark flex-nowrap'>
            <input
              type='text'
              name='password'
              id='password'
              placeholder='Generate a password'
              readOnly
              value={password}
              ref={passwordRef}
              className='text-sm font-bold bg-transparent outline-none text-mint-50'
            />
            <IconCopy
              className='transition-colors duration-150 cursor-pointer text-mint-200 hover:text-mint-400'
              onClick={copyToClipboard}
            />
          </div>

          <div className='flex flex-col justify-between gap-4 p-4 rounded select-none bg-sea-dark'>
            <div className='flex items-start justify-between'>
              <label htmlFor='chars' className='text-sm font-bold text-mint-50'>
                Character Length
              </label>
              <strong className='text-2xl font-bold text-mint-200'>
                {length}
              </strong>
            </div>

            <div className='w-full'>
              <InputSlider
                min={6}
                max={32}
                value={length}
                onChange={e => setLength(e.target.value)}
              />
            </div>

            <ul className='flex flex-col gap-2 text-xs font-bold list-none'>
              <li className='flex items-center gap-2'>
                <input
                  className='outline-none cursor-pointer focus:outline-cinder outline-offset-1'
                  type='checkbox'
                  name='uppercase'
                  id='uppercase'
                  defaultChecked={uppercaseAllowed}
                  onChange={() => setUppercaseAllowed(prev => !prev)}
                />
                <label
                  className='transition-colors duration-150 cursor-pointer text-mint-50 hover:text-mint-100'
                  htmlFor='uppercase'
                >
                  include uppercase letters
                </label>
              </li>
              <li className='flex items-center gap-2'>
                <input
                  className='outline-none cursor-pointer focus:outline-cinder outline-offset-1'
                  type='checkbox'
                  name='lowercase'
                  id='lowercase'
                  defaultChecked={lowecaseAllowed}
                  onChange={() => setLowecaseAllowed(prev => !prev)}
                />
                <label
                  className='transition-colors duration-150 cursor-pointer text-mint-50 hover:text-mint-100'
                  htmlFor='lowercase'
                >
                  include lowercase letters
                </label>
              </li>
              <li className='flex items-center gap-2'>
                <input
                  className='outline-none cursor-pointer focus:outline-cinder outline-offset-1'
                  type='checkbox'
                  name='numbers'
                  id='numbers'
                  defaultChecked={numbersAllowed}
                  onChange={() => setNumbersAllowed(prev => !prev)}
                />
                <label
                  className='transition-colors duration-150 cursor-pointer text-mint-50 hover:text-mint-100'
                  htmlFor='numbers'
                >
                  include numbers
                </label>
              </li>
              <li className='flex items-center gap-2'>
                <input
                  className='outline-none cursor-pointer focus:outline-cinder outline-offset-1'
                  type='checkbox'
                  name='symbols'
                  id='symbols'
                  defaultChecked={symbolsAllowed}
                  onChange={() => setSymbolsAllowed(prev => !prev)}
                />
                <label
                  className='transition-colors duration-150 cursor-pointer text-mint-50 hover:text-mint-100'
                  htmlFor='symbols'
                >
                  include symbols
                </label>
              </li>
            </ul>

            {passwordStrength.strength ? (
              <div className='flex flex-wrap items-center justify-between gap-2 p-4 bg-cinder-dark'>
                <strong className='text-sm font-bold uppercase text-cinder'>
                  Strength
                </strong>
                <div className='flex gap-3 flex-nowrap'>
                  <strong className='font-bold uppercase text-mint-50'>
                    {passwordStrength.metric}
                  </strong>
                  <ul
                    className='flex items-center gap-1'
                    ref={strengthIndicatorRef}
                  >
                    <li className='w-[6px] h-4 [&.active]:bg-mint-300 [&.active]:border-transparent border border-mint-50 active'></li>
                    <li className='w-[6px] h-4 [&.active]:bg-mint-400 [&.active]:border-transparent border border-mint-50 active'></li>
                    <li className='w-[6px] h-4 [&.active]:bg-mint-500 [&.active]:border-transparent border border-mint-50'></li>
                    <li className='w-[6px] h-4 [&.active]:bg-mint-600 [&.active]:border-transparent border border-mint-50'></li>
                  </ul>
                </div>
              </div>
            ) : null}

            <button
              type='button'
              className='flex items-center justify-center w-full h-10 mt-2 text-sm font-bold uppercase transition-colors duration-150 shadow-md outline-none bg-mint-200 hover:bg-mint-300 active:shadow-none focus:outline-1 focus:outline-cinder disabled:bg-gray-500'
              onClick={passwordGenerator}
              disabled={password.length <= 0}
            >
              Generate
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
