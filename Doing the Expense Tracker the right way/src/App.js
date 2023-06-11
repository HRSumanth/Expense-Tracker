import { Routes, Route} from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './/components/Profile/UserProfile'
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import { BrowserRouter as Router } from 'react-router-dom';
import ForgetPassward from './components/Auth/ForgetPassward';
import { useSelector } from 'react-redux';


function App() {
  const authCtx = useSelector(state=>state.auth)
  console.log(authCtx.isLoggedIn)
  return (
          <Router>
            <Layout>
              <Routes>
              <Route path='/' element={<HomePage />} />
              {!authCtx.isLoggedIn && <Route path='/auth' element={<AuthPage />} />}
              <Route path='/profile' element={<UserProfile />} />
              <Route path='/forget-password' element={<ForgetPassward></ForgetPassward>}></Route>
              </Routes>
            </Layout>
          </Router>
  );
}

export default App;
