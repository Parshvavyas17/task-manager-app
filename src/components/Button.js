import PropTypes from 'prop-types'

const Button = (props) => {
  return (
    <button className='btn' style={{backgroundColor:props.color}} onClick={props.onClick}>{props.text}</button>
  )
}

Button.propTypes = {
    title: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func.isRequired
}

Button.defaultProps = {
    title: 'Button',
    color: 'steelblue'
}

export default Button