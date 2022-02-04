import "./App.less";
import { Button } from "antd";
import Child from "./Child";
import CustomForm from "./CustomForm";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Button type="primary">Primary Button</Button>
      <Child name="props"></Child>
	  <CustomForm></CustomForm>
      <div className="custom text-3xl font-bold underline">自定义css变量</div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
      </Routes>
    </div>
  );
}

function Home() {
  return (
    <>
      <main>
        <h2>Welcome to the homepage!</h2>
        <p>You can do this, I believe in you.</p>
      </main>
      <nav>
        <Link to="/about">About</Link>
      </nav>
    </>
  );
}

function About() {
  return (
    <>
      <main>
        <h2>Who are we?</h2>
        <p>That feels like an existential question, don't you think?</p>
      </main>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </>
  );
}

export default App;
