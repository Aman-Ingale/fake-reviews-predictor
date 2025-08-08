# Fake Review Detection System

A full-stack Machine Learning project that detects fake reviews using Natural Language Processing and Random Forest Classification. Built with **React.js**, **Tailwind CSS**, **FastAPI**, and deployed using **Vercel** and **Render**. The ML model is trained in **Google Colab** with **TF-IDF** vectorization and **NLTK** for text preprocessing.

---

## Project Overview

This project aims to identify and flag fake reviews using machine learning techniques. The solution includes:

- ML model (Random Forest Classifier) trained on labeled review data.
- NLP preprocessing using NLTK (tokenization, stopword removal, etc.).
- TF-IDF vectorization for feature extraction.
- Frontend in React.js + Tailwind CSS.
- Backend in FastAPI.
- Deployment:
  - Frontend: **Vercel**
  - Backend: **Render**
  - Model Training: **Google Colab**

---

## Machine Learning Stack

| Component        | Tool/Library            |
|------------------|-------------------------|
| Vectorization    | `TF-IDF (scikit-learn)` |
| Model            | `RandomForestClassifier`|
| Text Preprocessing | `NLTK`               |
| Training Environment | Google Colab        |

---

## Tech Stack

| Layer     | Technology          |
|-----------|---------------------|
| Frontend  | React.js + Tailwind CSS |
| Backend   | FastAPI             |
| Model     | Scikit-learn, NLTK  |
| Hosting   | Vercel (frontend) + Render (backend) |
| ML Dev    | Google Colab (Jupyter Notebook) |

---
## How It Works

1. **User Input:** User submits a review via the React frontend.
2. **Request Sent:** The input is sent via REST API to the FastAPI backend.
3. **Preprocessing:** The backend applies the same preprocessing pipeline used during training.
4. **Prediction:** The pre-trained ML model (loaded as `.pkl`) predicts whether the review is fake or genuine.
5. **Response:** The result is sent back to the frontend and shown to the user.
