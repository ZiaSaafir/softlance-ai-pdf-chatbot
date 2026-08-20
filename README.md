# SoftLance AI

AI-powered chatbot and PDF assistant built with Django REST Framework and Hugging Face.

SoftLance AI is a full-stack AI application that allows users to chat with an AI assistant, manage conversations, and provides a foundation for PDF summarization and document-based Q&A.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [API Endpoints](#api-endpoints)
- [Installation](#installation)
- [Security](#security)
- [Roadmap](#roadmap)
- [Goal](#goal)
- [Author](#author)

---

## Features

- AI-powered chatbot
- Hugging Face LLM integration
- Conversation history
- Create new chats
- Modern responsive UI
- Django REST API
- PDF upload and summarization foundation
- OpenAI-compatible AI API
- Environment-based API configuration

---

## Tech Stack

### Backend

| Technology | Purpose |
|------------|---------|
| Python | Core programming language |
| Django | Web framework |
| Django REST Framework | API development |

### Frontend

| Technology | Purpose |
|------------|---------|
| HTML5 | Structure |
| CSS3 | Styling |
| JavaScript | Interactivity |
| Fetch API | HTTP requests |
<img width="1344" height="647" alt="image" src="https://github.com/user-attachments/assets/905f81fd-94df-472c-a873-1bd0432499c5" />


### AI

| Technology | Purpose |
|------------|---------|
| Hugging Face Inference Providers | AI model access |
| Open-source LLMs | Natural language processing |

### Database

| Technology | Purpose |
|------------|---------|
| SQLite | Development database |
| PostgreSQL | Production-ready |

---

## Architecture
Frontend
|
v
JavaScript Fetch API
|
v
Django REST API
|
v
AI Service
|
v
Hugging Face
|
v
AI Response
|
v
Frontend

text

---

## API Endpoints

### Chat Endpoint

**POST** `/api/chat/`

**Request:**
```json
{
    "message": "What is Django?"
}
Response:

json
{
    "conversation_id": 16,
    "user_message": "What is Django?",
    "assistant_response": "Django is a Python web framework..."
}
Conversations Endpoint
GET /api/conversations/

Returns saved conversation history.

Installation
1. Clone the Repository
bash
git clone https://github.com/YOUR_USERNAME/softlance-ai.git
cd softlance-ai
2. Create Virtual Environment
bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS / Linux
python3 -m venv venv
source venv/bin/activate
3. Install Dependencies
bash
pip install -r requirements.txt
4. Configure Environment Variables
Create a .env file in the project root:

env
HF_TOKEN=your_huggingface_token_here
5. Run Database Migrations
bash
python manage.py migrate
6. Start the Server
bash
python manage.py runserver
7. Open the Frontend
Open the HTML file with VS Code Live Server or your preferred method.

Security
Important: Never commit API keys or secrets to version control.

Add .env to .gitignore:

gitignore
.env
venv/
__pycache__/
db.sqlite3
*.pyc
.vscode/
.idea/
*.log
Roadmap
☑ AI Chat
☑ Conversation History
☑ Hugging Face Integration
☑ REST API
☑ Frontend UI
□ PDF Upload
□ PDF Text Extraction
□ PDF Summarization
□ Document Q&A
□ RAG (Retrieval-Augmented Generation)
□ User Authentication
□ Production Deployment
Goal
The goal of SoftLance AI is to build a simple and scalable AI document assistant where users can:

Upload PDFs

Summarize documents

Ask questions about their content

Author
Ziagit

Building with Python, Django, AI and Full-Stack Development.

Support
If you find this project useful, consider giving it a star.

License
This project is licensed under the MIT License - see the LICENSE file for details.

Links
GitHub Repository

Issue Tracker

Contact
For questions or support, please open an issue or reach out via GitHub.

Built with Python, Django, and Hugging Face.

text

## GitHub Repository Settings

### Repository Name
softlance-ai

text

### Description
AI-powered chatbot and PDF assistant built with Django REST Framework, JavaScript, and Hugging Face.
