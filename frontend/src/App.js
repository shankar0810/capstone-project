import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Homepage from './pages/homepage/Homepage';
import SignIn from './pages/SignInPage/signin.jsx'; 
import SignUp from './pages/SignUpPage/signup.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import ProfileSetupPopup from './pages/profile/ProfileSetupPopup.jsx';
import Nutrition from './pages/Nutrition/Nutrition.jsx';
import DietPlanForm from './pages/Diet/DietPlanForm.jsx';
import ExerciseRecommendation from './pages/exercises/ExerciseRecommendation.jsx';
import { AuthProvider } from './pages/SignInPage/AuthContext.jsx';
import ProtectedRoute from './pages/SignInPage/ProtectedRoute.jsx';
import ActivityForm from './pages/exercises/ActivityForm.jsx';
import UserProfile from './pages/profile/UserProfile.jsx';
import ProfileContainer from './pages/profile/ProfileContainer.jsx';
import StressQuestionnaire from './pages/Stress/StressQuestionnaire.jsx';

function App() {
  return (
    <AuthProvider>
      <div className="custom-scrollbar">
        <Router>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path='/setup-profile' element={<ProfileSetupPopup />} />
              <Route path='/profile' element={<UserProfile />} />
              <Route path='/profile-container' element={<ProfileContainer />} />
              <Route path='/nutrition' element={<Nutrition />} />
              <Route path="/diet-plan" element={<DietPlanForm />} />
              <Route path='/exercise' element={<ExerciseRecommendation />} />
              <Route path='/activity' element={<ActivityForm />} />
              <Route path='/stress' element={<StressQuestionnaire />} />
            </Route>
          </Routes>
        </Router>
        <ToastContainer />
      </div>
    </AuthProvider>
  );
}

export default App;