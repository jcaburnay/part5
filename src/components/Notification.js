import PropTypes from "prop-types"

const Notification = ({ notifType, message }) => {
  if(message === null) {
    return null
  }
  return (
    <div className={notifType}>
      {message}
    </div>
  )
}

Notification.propTypes = {
  notifType: PropTypes.string,
  message: PropTypes.string
}

export default Notification