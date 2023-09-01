# VCL Assignment

## Requirement

Create a college login page using MERN Stack.

### Frontend Requirements

1. **Login Page (/login) & Sign Up (/signup)**

   - Option to select logging in as student, or staff.
   - Using email and password as log in details.
   - Option to Signup will also be available.

2. **Student Page (/students/:id)**

   - Fields to enter a student's personal details, name, email, and contact number.
   - Section to upload resume in PDF format.

3. **Staff Page (/staff/:id)**
   - Dashboard that shows students details.
   - Date and Time of Uploding resume.
   - View and Download options for resume.
   - [Should be in Tabular format]

### Backend Requirements

Need to create APIs for the following tasks:

Certainly! Here are the API endpoints that correspond to the tasks you've listed:

1. **Student and Staff, Sign Up:**

   - Endpoint: `POST /api/students/signup`
     `POST /api/staff/signup`
   - Description: Allows students and staff to create new accounts by providing necessary registration information.

2. **Student and Staff Login:**

   - Endpoint: `POST /api/students/login`
     `POST /api/staff/login`
   - Description: Handles user login by verifying credentials and providing an authentication token.

3. **Submitting and Updating Student Information:**

   - Endpoint: `PUT /api/students`
   - Description: Allows authorized users to update existing student information by providing the student's ID in the URL.

4. **Uploading Resume in PDF Format:**

   - Endpoint: `POST /api/upload-resume`
   - Description: Enables users to upload their resume (PDF format) for storage and future retrieval.

5. **Fetching All Student Information:**

   - Endpoint: `GET /api/staff/students`
   - Description: Retrieves a list of all student information stored in the database.

6. **Fetching Information of a Specific Student:**
   - Endpoint: `GET /api/students`
   - Description: Retrieves detailed information of a specific student identified by the provided student ID in the URL.

### Database Requirements

Using MongoDB database to store Students and Teachers information.
There will be two Collections:

1. Student

```javascript
{
"_id": ObjectId("61553c8854a35f001f5e6a7a"), // Automatically generated unique identifier
"name": "John Doe",
"email": "john.doe@example.com",
"contact_number": "123-456-7890",
"current_link": "https://example.com/uploads/john_doe_resume.pdf",
"resume": {
      "upload_history": [
         {
            "timestamp": ISODate("2023-09-01T12:00:00Z"), // Date and time of upload
            "file_name": "resume_2023.pdf",
            "file_size": 1024, // Size of the uploaded file in bytes
            "file_link": "https://example.com/uploads/resume_2023.pdf" // URL to the uploaded resume file
         },
         {
            "timestamp": ISODate("2022-07-15T09:30:00Z"),
            "file_name": "resume_2022.pdf",
            "file_size": 768,
            "file_link": "https://example.com/uploads/resume_2022.pdf"
         }
      ]

}
}
```

2. Staff

```javascript
{
   "_id": ObjectId("61553c8854a35f001f5e6a7b"), // Automatically generated unique identifier
   "name": "Jane Smith",
   "email": "jane.smith@example.com",
   "password": "hashed_password_here"
}
```
