import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Auth
import LoginPage from "./components/Auth/LoginPage";
import RegisterPage from "./components/Auth/RegisterPage";
import ListUsers from "./components/Auth/ListUsers";
import RoleManager from "./components/Auth/RoleManager";

// Quiz
import AddQuestion from "./components/Quiz/AddQuestion";
import AddQuestionPage from "./components/Quiz/AddQuestionPage";
import CreateExam from "./components/Quiz/CreateExam";
import ExamHistory from "./components/Quiz/ExamHistory";
import ExamPage from "./components/Quiz/ExamPage";
import QuizPage from "./components/Quiz/QuizPage";
import ResultHistoryPage from "./components/Quiz/ResultHistoryPage";
import ResultPage from "./components/Quiz/ResultPage";
import SearchCauHol from "./components/Quiz/SearchCauHoi";
import StartQuiz from "./components/Quiz/StartQuiz";
import TakeExam from "./components/Quiz/TakeExam";
import TakeExamPage from "./components/Quiz/TakeExamPage";

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
          {/* Auth routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/users" element={<ListUsers />} />
          <Route path="/role-manager" element={<RoleManager />} />

          {/* Quiz routes */}
          <Route path="/add-question" element={<AddQuestion />} />
          <Route path="/add-question-page" element={<AddQuestionPage />} />
          <Route path="/create-exam" element={<CreateExam />} />
          <Route path="/exam-history" element={<ExamHistory />} />
          <Route path="/exam" element={<ExamPage />} />
          <Route path="/dashboard" element={<AdminDashboard />} /> {/* ✅ AdminDashboard route */}
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/result-history" element={<ResultHistoryPage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/search-question" element={<SearchCauHol />} />
          <Route path="/start-quiz" element={<StartQuiz />} />
          <Route path="/take-exam" element={<TakeExam />} />
          <Route path="/take-exam-page" element={<TakeExamPage />} />

          {/* Practice routes */}
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/practice-mode" element={<PracticeMode />} />
          <Route path="/practice-history" element={<PracticeHistory />} />

          {/* Default route */}
          <Route path="/" element={<LoginPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
