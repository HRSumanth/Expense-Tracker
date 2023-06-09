import { Routes, Route} from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './/components/Profile/UserProfile'
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import { BrowserRouter as Router } from 'react-router-dom';
import {AuthContextProvider} from './Store/AuthContext'
import AuthContext from './Store/AuthContext';
import { useContext } from 'react';
import ForgetPassward from './components/Auth/ForgetPassward';
import ExpenseProvider from './Store/ExpenseProvider';

function App() {
  const authCtx = useContext(AuthContext)
  return (
      <ExpenseProvider>
        <AuthContextProvider>
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
        </AuthContextProvider>
      </ExpenseProvider>
  );
}

export default App;
