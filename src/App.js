import './index.css';
import Sidebar from './Comps/Sidebar';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from './Dashboard/Dashboard'
import Tasks from './Tasks/Tasks'
import Billing from './Billing/Billing'
import Proxies from './Proxies/Proxies'
import Manage from './Tasks/Manage';

function App() {
  return (
    <div>
    <BrowserRouter>
      <div className='drag'></div>
      <Sidebar/>
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/tasks" element={<Tasks/>} />
          <Route path="/billing" element={<Billing/>} />
          <Route path="/proxies" element={<Proxies/>} />
          <Route path="/manage" element={<Manage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
