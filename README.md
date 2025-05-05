TaskManagement App
Overview
TaskManagement App is a modern Angular 19 frontend for a Task Management System, designed to interact with the TaskManagement .NET 8 Web API. Built with standalone components and Signals for reactive state management, it provides a user-friendly interface for managing tasks, including creating, updating, deleting, bulk deletion, and filtering by status (all, completed, pending). The app uses Bootstrap for responsive styling and Angular Router for navigation.
This frontend is production-ready, with form validation, error handling, and a clean, intuitive UI, making it suitable for portfolio projects or real-world applications.
Features

Task Management:
Create, edit, and delete tasks with a form.
View tasks in a table with edit/delete actions.


Bulk Deletion: Select multiple tasks for deletion with a single action.
Status Filtering: Filter tasks by status (all, completed, pending) via a dropdown.
Responsive UI: Bootstrap-based layout for desktop and mobile.
State Management: Angular Signals for reactive updates.
Navigation: Angular Router for task list, create, and edit pages.
Error Handling: User-friendly alerts for API errors.

Tech Stack

Framework: Angular 19
State Management: Signals
Styling: Bootstrap 5
HTTP Client: Angular HttpClient
Routing: Angular Router
Tools: Node.js, Angular CLI, VS Code


Prerequisites

Node.js (v18 or later)
Angular CLI (npm install -g @angular/cli)
TaskManagement API (running at https://localhost:7139)

Setup Instructions

Clone the Repository:
git clone https://github.com/<your-username>/TaskManagementApp.git
cd TaskManagementApp


Install Dependencies:

Install Node.js packages:npm install




Configure API URL:

Ensure the TaskManagement API is running at https://localhost:7139.
Verify the API URL in src/app/services/task.service.ts:private apiUrl = 'https://localhost:7139/api';




Run the Application:

Start the development server:ng serve


Open the app at http://localhost:4200.


Explore Features:

Navigate to /tasks to view the task list.
Use the dropdown to filter tasks by status.
Select tasks and click "Delete Selected" for bulk deletion.
Click "Create Task" or "Edit" to manage tasks.



Usage

Task List (/tasks):
View all tasks with columns for ID, Title, Description, Due Date, Category, Status, and Actions.
Filter tasks using the "All Tasks", "Completed", or "Pending" dropdown.
Select tasks via checkboxes and click "Delete Selected" to remove multiple tasks.


Create Task (/create):
Fill out the form to add a new task (title, description, due date, category).


Edit Task (/edit/:id):
Update task details using the form.


Error Handling:
Alerts display for API errors (e.g., "Failed to load tasks").



Screenshots
(Add screenshots here, e.g., task list, create form, after cloning to GitHub)

Task List:
Create Task:

Contributing

Fork the repository.
Create a feature branch (git checkout -b feature/new-feature).
Commit changes (git commit -m "Add new feature").
Push to the branch (git push origin feature/new-feature).
Open a Pull Request.

License
This project is licensed under the MIT License.
Contact
For questions or feedback, reach out to [your-email@example.com] or open an issue on GitHub.
