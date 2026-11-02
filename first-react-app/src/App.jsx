/*
 * Challenge:
 * Create your very first custom React component!
 * Call it "MainContent", and have it return a simple
 * hi element that says "React is great!"
 * Afterward, render it on the Line below MyAwesomeNavbar
 */

function MyAwesomeNavbar() {
  return (
    <nav>
      <h2>My awesone navbar</h2>
    </nav>
  )
}

function MainContent() {
  return <h1>React is great!</h1>;
}

export default function App() {
  return (
    <div>
      <MainContent/>
      <MyAwesomeNavbar/>
    </div>
  )
}