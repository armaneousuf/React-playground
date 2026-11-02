import  reactLogo from '../assets/react.svg'
export default function Navbar() {
  return (
    <nav className="nav-bar">
      <img
        src={reactLogo}
        alt="react-svg-logo"
        className="react-logo"
      />
      <h3 className="nav-title">ReactFacts</h3>
    </nav>
  );
}