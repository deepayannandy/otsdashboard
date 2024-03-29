import React from 'react'

const Input = (props) => {
  return (
    <div className='formInput'>
        <label class="block text-gray-700 text-sm font-bold mb-2">{props.placeholder}</label>
        <input value={props.value} pattern={props.pattern} type={props.type} className="shadow appearance-none border border-grey-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" placeholder={props.placeholder} name={props.name}/>
    </div>
  )
}

export default Input