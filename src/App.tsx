// import { useState } from 'react'
import { Provider } from 'react-redux';
import styles from "./app.module.css";
import { store } from './store';
import Home from './Components/Home/Home';
import ContactRender from './Components/contactRender';
import AddContacts from './Components/addContact/AddContacts';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
{/* <Route path="/" element={<Home />} />
<Route path="/addContact" element={<AddContacts />} /> */}


function App() {
  // const router  = createBrowserRouter([
  //   {
  //     path:"/",
  //     element:<Home/>,
  //     children:[
  //       {path:"/addContacts", element: <AddContacts/>}
  //     ],
  //   },
  // ]);

  return (
    <div className={styles.main_box}>
    <Provider store={store}>
      <ContactRender />
      <Router>
        <Navbar/>
        <Routes>
          {/* routes used to navigtate the page */}
          <Route path="/" element={<Home />} />
          <Route path="addContacts" element={<AddContacts />} />
          <Route path="editContacts/:index" element={<AddContacts />} />
        </Routes>
      </Router>
    </Provider>
    </div>
  )
}
//export all the components into main.tsx
export default App;




{/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
