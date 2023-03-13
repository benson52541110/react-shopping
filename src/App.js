import {Routes,Route} from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/admin/Dashboard';
function App() {

	return (
		<div className="App">
      <Routes>
        <Route path='/login' element={<Login/>}></Route>
		<Route path='/admin' element={<Dashboard></Dashboard>}>

		</Route>
      </Routes>
		</div>
	);
}

export default App;
