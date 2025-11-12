PERSONAL BUDGET MANAGEMENT APPLICATION
=====================================

INSTALLED PACKAGES:
-------------------
- react: ^19.2.0
- react-dom: ^19.2.0
- react-router-dom: ^6.30.1
- react-bootstrap: ^2.10.10
- bootstrap: ^5.3.8
- axios: ^1.13.1
- json-server: ^0.17.4
- react-icons: ^5.5.0
- react-scripts: ^5.0.1

HOW TO RUN:
-----------
1. Install dependencies:
   npm install

2. Start JSON Server (in a separate terminal):
   npm run api
   This will start the JSON Server on port 3001

3. Start the React application (in another terminal):
   npm start
   This will start the application on http://localhost:3000

4. Open your browser and navigate to:
   http://localhost:3000

LOGIN CREDENTIALS:
------------------
Username: anhnv
Password: admin123

OR

Username: TamNT
Password: admin123

PROJECT STRUCTURE:
------------------
- src/
  - components/     : Reusable UI components
  - contexts/       : Context API for state management (AuthContext, ExpenseContext)
  - pages/          : Page components (LoginPage, DashboardPage, AddExpensePage)
  - routes/         : Route configuration
  - services/       : API service functions
- public/           : Static files including logo
- db.json           : JSON Server database file

FEATURES:
---------
- User authentication with login page
- Add, edit, and delete expenses
- View total expenses in VND format
- Filter expenses by category
- Real-time updates when expenses are added/edited/deleted
- Responsive design using Bootstrap

