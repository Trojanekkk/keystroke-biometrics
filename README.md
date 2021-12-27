# keystroke-biometric
## Description 
A platform for conducting keystroke biometrics researches. Helps to gather experiment's results remotely from the participants through a web interface and then to analyze data.
The platform focuses on keystroke biometrics according to nationality and language the participant uses (native and English language).

## Overall structure
The application consists of three main parts:
1. Web Interface
    1. client (frontend)
    2. server (backend, API)
2. Database
3. Data Analyzer

## Usage
### Backend
For backend setup read README.md in web/server directory

### Frontend
For frontend setup read README.md in web/client directory

### Database
For database setup read README.md in data directory

### Data Analyzer
1. Install Python 3.8+
2. Init virtual environent
3. Install dependencies from requirements.txt
4. Set environment variables in .env file in src (instruction inside)
5. Conduct experiment through the web interface or import data manually to the database
6. Run Data Analyzer