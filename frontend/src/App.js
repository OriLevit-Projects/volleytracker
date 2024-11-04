import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './contexts/AuthContext';  // Add this import
import theme from './styles/theme';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Profile from './components/pages/Profile';
import Team from './components/pages/Team';
import DataEntry from './components/pages/DataEntry';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>  {/* Add this wrapper */}
        <CssBaseline />
        <Router>
          <div className="App">
            <Navbar />
            <main style={{ padding: '2rem' }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/team" element={<Team />} />
                <Route path="/data-entry" element={<DataEntry />} />
              </Routes>
            </main>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;