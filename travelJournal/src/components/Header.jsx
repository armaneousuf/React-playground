import globeImg from '../assets/globe.svg';

export default function Header() {
    return (
        <nav className='nav-bar'>
            <img src={globeImg} alt="" />
            <p>my travel journal.</p>
        </nav>
    )
}