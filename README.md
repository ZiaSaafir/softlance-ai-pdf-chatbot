# 🤖 SoftLance AI

> AI-powered chatbot and PDF assistant built with Django REST Framework, JavaScript, and Hugging Face.

🌐 **Live Application:**  
https://softlance-ai-pdf-chatbot.onrender.com/

🔗 **GitHub Repository:**  
https://github.com/ZiaSaafir/softlance-ai-pdf-chatbot

🚀 **Backend API:**  
https://softlance-ai.onrender.com/

---

## 📌 About

**SoftLance AI** is a full-stack AI chatbot application developed by **SoftLance Tech**.

The application allows users to communicate with an AI assistant through a clean web interface while storing conversations in a Django backend.

The project is also designed as a foundation for an AI-powered **PDF assistant**, allowing users to upload documents, summarize them, and ask questions about their content.

This project was built as a practical full-stack AI application using Django REST Framework, JavaScript, and Hugging Face Inference Providers.

---

## ✨ Features

### 💬 AI Chat

- Ask questions in natural language
- Receive AI-generated responses
- Clean chat interface
- User and AI message bubbles
- Loading states
- Error handling
- Responsive interface

### 🗂️ Conversation History

- Automatically save conversations
- View previous conversations
- Create new chats
- Load previous conversations
- Delete conversation history

### 🧠 AI Integration

- Hugging Face Inference Providers
- OpenAI-compatible API
- Modern open-source AI models
- Dedicated AI service layer
- Secure API key configuration using environment variables

### 🎨 Frontend

- Modern SoftLance AI interface
- Responsive layout
- Sidebar navigation
- Recent conversations
- New Chat button
- Chat message interface
- Settings section
- SoftLance branding

### 📄 PDF Assistant

The project is structured to support:

- PDF upload
- PDF text extraction
- PDF summarization
- Questions about PDF documents
- Context-aware document conversations

> PDF functionality is part of the ongoing development roadmap.

---

# 🛠️ Tech Stack

## Backend

- Python
- Django 6
- Django REST Framework
- Gunicorn
- SQLite for development
- PostgreSQL-ready architecture

## AI

- Hugging Face Inference Providers
- OpenAI-compatible API
- Large Language Models (LLMs)

## Frontend

- HTML5
- CSS3
- JavaScript
- Fetch API

## Deployment

- GitHub
- Render
- Gunicorn
- Render Environment Variables

---

# 🏗️ Architecture

```text
                    ┌──────────────────────┐
                    │       Frontend       │
                    │    HTML + CSS + JS   │
                    └──────────┬───────────┘
                               │
                               │ HTTP / JSON
                               ▼
                    ┌──────────────────────┐
                    │    Django REST API   │
                    │                      │
                    │     /api/chat/       │
                    │ /api/conversations/  │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │      AI Service      │
                    │    ai_service.py     │
                    └──────────┬───────────┘
                               │
                               │ API Request
                               ▼
                    ┌──────────────────────┐
                    │      Hugging Face    │
                    │  Inference Provider  │
                    └──────────────────────┘
                    
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
