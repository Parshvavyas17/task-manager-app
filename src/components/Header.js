import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button'

const Header = (props) => {
  return (
    <header className='header'>
      <h1>{props.title}</h1>
      <Button text={props.showAdd ? 'Close' : 'Add' } color={props.showAdd ? 'red' : 'green' } onClick={props.onAdd}/>
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