import React from 'react';
// import RecipeList from './components/RecipeList';
import Navbar from './components/Navbar';
// import Hero from './components/Hero';
// import ProfilePage from './components/ProfilePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Profile from './pages/Profile';
import About from './pages/About';
import Recipe from './pages/Recipe';
import SingleRecipe from './pages/SingleRecipe';
import Recipes from './pages/Recipes';
import Dashboard from './pages/Dashboard';
import Dashboard2 from './pages/Dashboard2';
// import Footer from './components/Footer';
import Contact from './components/Contact';
import PublishRecipe from './components/Recipe/PublishRecipe';
import Footer from './components/Footer';
import Chef from './pages/Chef';
import LogInPage from './components/LogInPage';
import Hero2 from './components/Hero2';
import DashboardChefApplications from './components/DashboardChefApplications';
// import UsersDashboard from './components/UsersDashboard';
import Saved from './components/Saved';
import { useState } from 'react';
import DashboardContacts from './components/DashboardContacts';
function App() {
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  return (
    <Router>
      {
        //check if route is not dashboard
        !window.location.pathname.includes('/dashboard') &&
        <Navbar userId={userId} />
      }
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users/:id" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/recipe/:id" element={<Recipe />} />
        <Route path="/recipe" element={<SingleRecipe />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path='/saved' element={<Saved />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/Login' element={<LogInPage setUserId={setUserId} />} />
        <Route path='/dashboard' element={<Dashboard2 />} />
        <Route path='/publishRecipe' element={<PublishRecipe />} />
        <Route path='/chef' element={<Chef />} />
        <Route path='/dashboard/chefApplications' element={<DashboardChefApplications />} />
        <Route path='/hero2' element={<Hero2 />} />
        <Route path='/dashboard' element={<Dashboard />} />
        {/* <Route path='/dashboard/users' element={<UsersDashboard />} /> */}
        <Route path='/dashboard/contacts' element={<DashboardContacts />} />
      </Routes>
      {
        //check if route is not dashboard
        !window.location.pathname.includes('/dashboard') &&
        <Footer />
      }
    </Router>
  );
}

export default App;
