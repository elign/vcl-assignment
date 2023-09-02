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

   - Endpoint: `POST /api/user/signup`
   - Description: Allows students and staff to create new accounts by providing necessary registration information based on their user type.

2. **Student and Staff Login:**

   - Endpoint: `POST /api/user/login`
   - Description: Handles user login by verifying credentials and providing an authentication token for both students and staff members.

3. **Submitting and Updating Student Information:**

   - Endpoint: `PUT /api/student`
   - Description: Allows authorized users to update existing student information by providing the student's ID in the URL.

4. **Uploading Resume in PDF Format:**

   - Endpoint: `POST /api/upload-resume`
   - Description: Enables users to upload their resume (PDF format) for storage and future retrieval.

5. **Fetching All Student Information:**

   - Endpoint: `GET /api/staff/students`
   - Description: Retrieves a list of all student information stored in the database.

6. **Fetching Information of a User:**
   - Endpoint: `GET /api/user/profile`
   - Description: Retrieves detailed information of a specific student or staff member.

### Database Requirements

Using MongoDB database to store Students and Staff information.
There will be two Collections:

#### User

```javascript
{
"_id": ObjectId("61553c8854a35f001f5e6a7a"), // Automatically generated unique identifier
"name": "John Doe",
"userType": "Student", // Can be Student or Staff
"email": "john.doe@example.com",
"contact_number": "123-456-7890",
"current_link": "https://example.com/uploads/john_doe_resume.pdf",
"resume": {
      "upload_history": [
         {
            "timestamp": ISODate("2023-09-01T12:00:00Z"), // Date and time of upload
            "file_link": "https://example.com/uploads/resume_2023.pdf" // URL to the uploaded resume file
         },
         {
            "timestamp": ISODate("2022-07-15T09:30:00Z"),
            "file_link": "https://example.com/uploads/resume_2022.pdf"
         }
      ]

}
}
```
