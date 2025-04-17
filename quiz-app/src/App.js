import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

import HomePage from "./components/HomePage";
// Auth
import LoginPage from "./components/Auth/LoginPage";
import RegisterPage from "./components/Auth/RegisterPage";
import ListUsers from "./components/Auth/ListUsers";
import RoleManager from "./components/Auth/RoleManager";

// Quiz
import AddQuestion from "./components/Quiz/AddQuestion";
import AddQuestionPage from "./components/Quiz/AddQuestionPage";
import QuestionManager from "./components/QuestionManager";
import ExamManager from "./components/ExamManager";

import ExamHistory from "./components/Quiz/ExamHistory";
import ExamPage from "./components/Quiz/ExamPage";
import QuizPage from "./components/Quiz/QuizPage";
import ResultHistoryPage from "./components/Quiz/ResultHistoryPage";
import ResultPage from "./components/Quiz/ResultPage";
import SearchCauHol from "./components/Quiz/SearchCauHoi";
import StartQuiz from "./components/Quiz/StartQuiz";
import TakeExam from "./components/Quiz/TakeExam";
import TakeExamPage from "./components/Quiz/TakeExamPage";
import AddExam from "./components/Quiz/AddExam";
// Practice
import PracticeMode from "./components/Practice/PracticeMode";
import PracticePage from "./components/Practice/PracticePage";
import PracticeHistory from "./components/Practice/PracticeHistory";

// Admin
import AdminDashboard from './components/Dashboard';

// Trang 404
const NotFound = () => <h2 className="text-center mt-10 text-2xl text-red-500">404 - Không tìm thấy trang</h2>;

function App() {
  return (
    <div className="min-h-screen"> {/* Đảm bảo toàn trang cao bằng màn hình */}
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />  {/* Trang chủ */}
          
          {/* Auth routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/users" element={<ListUsers />} />
          <Route path="/role-manager" element={<RoleManager />} />

          {/* Quiz routes */}
          <Route path="/add-question" element={<AddQuestion />} />
          <Route path="/add-question-page" element={<AddQuestionPage />} />
          <Route path="/exam-history" element={<ExamHistory />} />
          <Route path="/exam/:subjectId" element={<ExamPage />} />
          <Route path="/add-exam" element={<AddExam />} />

          {/* Admin Dashboard (Protected by PrivateRoute) */}
          <Route path="/dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} /> 

          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/result-history" element={<ResultHistoryPage />} />
          <Route path="/result/:subjectId" element={<ResultPage />} />  {/* Trang kết quả */}
          <Route path="/search-question" element={<SearchCauHol />} />
          <Route path="/start-quiz" element={<StartQuiz />} />
          <Route path="/take-exam" element={<TakeExam />} />
          <Route path="/take-exam-page" element={<TakeExamPage />} />
          
          {/* Admin routes */}
          <Route path="/question-manager" element={<PrivateRoute><QuestionManager /></PrivateRoute>} />
          <Route path="/exam-manager" element={<PrivateRoute><ExamManager /></PrivateRoute>} />

          {/* Practice routes */}
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/practice-mode" element={<PracticeMode />} />
          <Route path="/practice-history" element={<PracticeHistory />} />

          {/* Catch-all route for 404 page */}
          <Route path="*" element={<NotFound />} /> {/* Không tìm thấy trang */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
