import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button'

const Header = (props) => {
  const on_click = () => {
    alert('Button clicked');
  }

  return (
    <header className='header'>
      <h1>{props.title}</h1>
      <Button title='Add' color='green' onClick={on_click}/>
      {/* <Button title='Remove' color='red' onClick={on_click}/>
      <Button title='Edit' color='blue' onClick={on_click}/> */}
    </header>
  )
}

// CSS example 
// const headingStyle = {
//   color:'red',
//   backgroundColor:'black'
// }

Header.propTypes = {
  title: PropTypes.string.isRequired
}

Header.defaultProps = {
  title: 'Task Tracker'
}

export default Header