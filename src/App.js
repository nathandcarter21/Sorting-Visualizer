import "./App.css";
import Content from "./Content";

function App() {
  return (
    <div className="App">
      <nav>
        <h1>Sorting Algorithm Visualizer</h1>
      </nav>
      <Content />
      <footer className="footer">
        <p>Created by Nathan Carter</p>
        <a
          href="https://github.com/nathandcarter21/Sorting-Visualizer"
          className="footerLink">
          Github
        </a>
        <a
          href="https://www.linkedin.com/in/nathandcarter21"
          className="footerLink">
          LinkedIn
        </a>
      </footer>
    </div>
  );
}

export default App;
