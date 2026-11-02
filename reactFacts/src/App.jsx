import reactLogo from '../src/assets/react.svg'
import './App.css'

function Navbar() {
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

function Main() {
  return (
    <main className="main-container">
      <h1 className="main-title">Fun facts about React</h1>
      <ul className="lists">
        <li>Was first released in 2013</li>
        <li>Was originally created by Jordan Walke</li>
        <li>Has well over 200K stars on GitHub</li>
        <li>Is maintained by Meta</li>
        <li>Powers thousands of enterprise apps, including mobile apps</li>
      </ul>
      <img src={reactLogo} alt="react-logo-bg" className='react-logo-bg' />
    </main>
  );
}

export default function App() {
  return (
    <div className="container">
      <Navbar />
      <Main />
    </div>
  );
}
