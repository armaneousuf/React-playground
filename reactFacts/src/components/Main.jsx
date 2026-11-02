import reactLogo from '../assets/react.svg'
export default function Main() {
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