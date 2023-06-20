import { Routes, Route} from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './/components/Profile/UserProfile'
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import { BrowserRouter as Router } from 'react-router-dom';
import ForgetPassword from './components/Auth/ForgetPassward';
import { useSelector } from 'react-redux';


function App() {
  const authCtx = useSelector(state=>state.auth)
  console.log(authCtx.isLoggedIn, localStorage.getItem('token'))
  
  return (
          <Router>
            <Layout>
            <Routes>
              {authCtx.isLoggedIn && <Route path="/" element={<HomePage />} />}
              <Route path="/auth" element={<AuthPage />} />
              {authCtx.isLoggedIn && <Route path="/profile" element={<UserProfile />} />}
              <Route path="/forget-password" element={<ForgetPassword />} />
            </Routes>
            </Layout>
          </Router>
  );
}

export default App;
