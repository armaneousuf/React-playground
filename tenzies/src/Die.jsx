export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "#fff",
        borderRadius: "15px"
    }
    return (
        <button style={styles} onClick={() => props.hold(props.id)}>{props.value}</button>
    )
}