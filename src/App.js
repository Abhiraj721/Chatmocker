import logo from './logo.svg';
import './App.css';
import Playground from './components/Playground';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
     <Playground></Playground>
     <br />
     <Footer></Footer>
    </div>
  );
}

export default App;
