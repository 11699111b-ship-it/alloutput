import "@/App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from 'sonner';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import ChatPage from './pages/ChatPage';
import SpecialistsPage from './pages/SpecialistsPage';
import SummarizePage from './pages/SummarizePage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route 
            path="/app/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/app/chat" 
            element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/app/specialists" 
            element={
              <ProtectedRoute>
                <SpecialistsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/app/tools/summarize" 
            element={
              <ProtectedRoute>
                <SummarizePage />
              </ProtectedRoute>
            } 
          />
          {/* Redirect /app to /app/chat */}
          <Route path="/app" element={<Navigate to="/app/chat" replace />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" richColors />
    </div>
  );
}

export default App;
