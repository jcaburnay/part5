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

export default Notification