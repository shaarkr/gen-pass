import './InputSlider.css'

export default function InputSlider(props) {
  return (
    <input
      type='range'
      name='chars'
      id='chars'
      step={1}
      {...props}
      className='w-full h-1 mb-6 rounded-lg outline-none cursor-pointer bg-cinder-dark slider'
    />
  )
}
