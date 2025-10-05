import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import JournalList from './pages/journal/JournalList';
import JournalDetail from './pages/journal/JournalDetail';
import CreateJournal from './pages/journal/CreateJournal';
import EditJournal from './pages/journal/EditJournal';
import NotFound from './pages/NotFound';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AuthProvider>
        <Router>
          <div className="App">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/journal" element={<JournalList />} />
                <Route path="/journal/new" element={<CreateJournal />} />
                <Route path="/journal/:id" element={<JournalDetail />} />
                <Route path="/journal/:id/edit" element={<EditJournal />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;