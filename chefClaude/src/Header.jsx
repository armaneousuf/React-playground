import robotImg from '../src/assets/image.png'
export default function Header() {
    return (
        <nav className="nav-bar">
            <img src={robotImg} alt="robot-img" />
            <p>Chef Claude</p>
        </nav>
    )
}