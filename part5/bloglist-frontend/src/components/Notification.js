const Notifcation = ({ message, error }) => {
    const notifcationStyle = {
        color: 'green',
        background: 'lightGrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }
    if (error){
        notifcationStyle.color = 'red'
    }

    if (message === null) {
        return null;
    }
    return (
        <div style={notifcationStyle}>
            {message}
        </div>
    )
}
export default Notifcation