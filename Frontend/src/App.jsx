import React, { useState, useEffect } from "react";
const icons = [
  (
    <svg className="h-8 w-8 text-blue-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
  ),
  (
    <svg className="h-8 w-8 text-blue-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" /></svg>
  ),
  (
  <svg className="h-8 w-8 text-blue-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2h5" /></svg>
),



];

const features = [
  {
    title: "How It Works",
    desc: "When you enter a review, it's vectorized using TF-IDF and fed into a trained ML model that returns a prediction with over 84% accuracy.",
  },
  {
    title: "Dataset & Accuracy",
    desc: "Trained on a labeled dataset of product reviews, the model achieves 84% accuracy—significantly better than the 50% baseline.",
  },
  {
    title: "Tech Stack Used",
    desc: "React, Vite, Shadcn UI, Python, Scikit-learn, TF-IDF, and Fast API with model deployment via Pickle.",
  },
];


export default function App() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [error, setError] = useState(false);
async function getRandomReviewFromJSON(jsonPath) {
  try {
    const response = await fetch(jsonPath);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reviews = await response.json();
    
    if (!Array.isArray(reviews) || reviews.length === 0) {
      throw new Error("JSON does not contain a valid array of strings.");
    }

    const randomIndex = Math.floor(Math.random() * reviews.length);
    return reviews[randomIndex];
  } catch (error) {
    console.error("Error fetching or parsing JSON:", error);
    return null;
  }
}
  function handleAutoGenerate(e) {
    e.preventDefault();
    getRandomReviewFromJSON('../src/assets/data/demo_reviews.json').then(randomReview => {
  if (randomReview) {
    setInputText(randomReview)
  }
});



  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputText.trim().length < 30) {
      setError("*Review must be at least 30 characters long.");
      return;
    }

    setError(false);
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText }),
      });
      const data = await response.json();
      if(data.result){
        setResult('Fake')
      }
      else{
        setResult('Genuine')
      }
      console.log(data.result)
    } catch (err) {
      setResult("Error processing your request.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-grayish-light via-blue-100 to-blue-200 dark:from-grayish-dark dark:via-gray-900 dark:to-blue-950 transition-colors duration-500">
      <div className="flex gap-3 w-full p-3 justify-end ">
        <a href="https://www.kaggle.com/datasets/mexwell/fake-reviews-dataset" target="_blank" rel="noopener noreferrer">
                  <img className="h-8 cursor-pointer" src="/public/database.png" alt="Database Icon" />

        </a>
        <a href="https://github.com/Aman-Ingale" target="_blank" rel="noopener noreferrer">

        <img className="h-8 cursor-pointer" src="/public/logo.png" alt="Database Icon" />
        </a>
      </div>

      <section className="bg-hero-gradient dark:bg-hero-gradient-dark bg-gradient-to-r from-primary-light to-primary-dark shadow-xl rounded-xl max-w-5xl mx-auto mt-8 px-6 py-12 flex flex-col items-center text-center transition-colors duration-500">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow mb-4">Detect Fake Reviews Instantly</h1>

        <p className="text-lg md:text-xl text-blue-100 dark:text-blue-200 mb-8">Use AI to analyze and validate product reviews before you trust them</p>
        <button
          onClick={() => {
            setShowInput(true);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="bg-white/90 dark:bg-gray-900/80 text-primary-dark dark:text-blue-200 font-semibold px-8 py-3 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors"
        >
          Try Now
        </button>

      </section>
      <section
        className={`w-full flex justify-center transition-all duration-500 ${showInput ? "opacity-100 mt-8" : "opacity-0 h-0 overflow-hidden"}`}
      >
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl bg-card-gradient dark:bg-card-gradient-dark bg-gradient-to-br from-grayish-light to-blue-100 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-xl p-6 mt-0 flex flex-col gap-4 transition-colors"
        >

          <label htmlFor="inputText" className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-1">
            Paste a product review below:
          </label>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <textarea
            id="inputText"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={5}
            placeholder="Type or paste your review here..."
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none transition-shadow"
            required
          />
          <button type="button" onClick={handleAutoGenerate} className="cursor-pointer">
            <div className="flex w-full items-end gap-1 justify-end text-purple-500 text-xs font-bold ">
          <img className="h-6 cursor-pointer" src="/public/text.png" alt="AI Icon" />Auto Generate
                  </div>
          </button>
          <h6 className="text-amber-500 text-sm">*Note: This model is still under development and may occasionally produce inaccurate results. Its performance is expected to improve with ongoing training and refinement. (^_^)</h6>
          <button
            type="submit"
            disabled={loading || !inputText.trim()}
            className="w-full bg-primary dark:bg-blue-700 text-white px-4 py-2 rounded-xl font-semibold hover:bg-blue-600 dark:hover:bg-blue-800 disabled:bg-blue-300 flex justify-center items-center transition-colors shadow-md"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                Predicting...
              </>
            ) : (
              "Get Prediction"
            )}
          </button>
          {result && (
            <div className={`p-4 mt-2 rounded-xl border text-center font-semibold transition-colors ${result === "Fake" ? "bg-red-50 border-red-200 text-red-700 dark:bg-red-900 dark:border-red-700 dark:text-red-200" : result === "Real" ? "bg-green-50 border-green-200 text-green-700 dark:bg-green-900 dark:border-green-700 dark:text-green-200" : "bg-yellow-50 border-yellow-200 text-yellow-700 dark:bg-yellow-900 dark:border-yellow-700 dark:text-yellow-200"}`}>
              <strong>Prediction:</strong> {result}
            </div>
          )}
        </form>
      </section>

      <section className="max-w-5xl mx-auto mt-16 px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Why Use This Project?</h2>
          <p className="text-gray-500 dark:text-gray-300 text-lg">Explore the core features of our detection tool</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="bg-card-gradient dark:bg-card-gradient-dark bg-gradient-to-br from-grayish-light to-blue-100 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg p-6 flex flex-col items-center text-center transition-transform hover:-translate-y-1 hover:shadow-2xl border border-gray-100 dark:border-gray-800"
            >
              <div className="mb-3">{icons[i]}</div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-1">{feature.title}</h3>
              <p className="text-gray-500 dark:text-gray-300 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto mt-16 px-4 mb-12">
        <div className="bg-card-gradient dark:bg-card-gradient-dark bg-gradient-to-br from-grayish-light to-blue-100 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg p-8 text-center transition-colors">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">About This Project</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Fake Review Detector is an project demonstrating the use of machine learning to identify potentially fake product reviews. it aims to highlight the power and accessibility of AI for real-world problems.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 text-gray-700 dark:text-gray-200 text-sm">
            <span className="bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-2">React</span>
            <span className="bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-2">Tailwind CSS</span>
            <span className="bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-2">Scikit-learn</span>
          </div>
        </div>
      </section>

      <footer className="w-full py-6 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto transition-colors">
        <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
          Made with <span className="text-red-500">❤️</span> by <a href="https://github.com/your-github" className="underline hover:text-blue-500 dark:hover:text-blue-300 transition-colors" target="_blank" rel="noopener noreferrer">Aman-Ingale</a>
        </div>
      </footer>
    </div>
  );
}
