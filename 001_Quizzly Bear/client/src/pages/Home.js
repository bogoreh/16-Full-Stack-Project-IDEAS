import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Home() {
  const { user } = useAuth();

  return (
    <div className="home">
      <div className="hero-section text-center py-20">
        <h1 className="text-5xl font-bold text-white mb-6">Welcome to Quizzly Bear! 🐻</h1>
        <p className="text-xl text-white mb-10 max-w-2xl mx-auto">
          Test your knowledge, create quizzes, and challenge your friends with our interactive quiz platform.
        </p>
        
        <div className="flex gap-4 justify-center">
          {user ? (
            <>
              <Link to="/dashboard" className="btn btn-primary text-lg px-8 py-3">
                Go to Dashboard
              </Link>
              <Link to="/create-quiz" className="btn btn-secondary text-lg px-8 py-3">
                Create Quiz
              </Link>
            </>
          ) : (
            <>
              <Link to="/register" className="btn btn-primary text-lg px-8 py-3">
                Get Started
              </Link>
              <Link to="/login" className="btn bg-white text-purple-600 text-lg px-8 py-3">
                Login
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="features grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
        <div className="feature-card card text-center">
          <div className="text-4xl mb-4">📚</div>
          <h3 className="text-xl font-bold mb-3">Thousands of Quizzes</h3>
          <p className="text-gray-600">Explore quizzes in various categories from science to entertainment.</p>
        </div>
        
        <div className="feature-card card text-center">
          <div className="text-4xl mb-4">🏆</div>
          <h3 className="text-xl font-bold mb-3">Compete & Learn</h3>
          <p className="text-gray-600">Challenge yourself, track progress, and climb the leaderboards.</p>
        </div>
        
        <div className="feature-card card text-center">
          <div className="text-4xl mb-4">✨</div>
          <h3 className="text-xl font-bold mb-3">Create Your Own</h3>
          <p className="text-gray-600">Design custom quizzes and share them with the community.</p>
        </div>
      </div>

      <div className="cta-section mt-16 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">Ready to Test Your Knowledge?</h2>
        <Link to="/quizzes" className="btn btn-primary text-lg px-8 py-3">
          Browse All Quizzes
        </Link>
      </div>
    </div>
  );
}

export default Home;