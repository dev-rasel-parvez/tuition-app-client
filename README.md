📚 eTuitionBd – Tuition Management System

🔗 Live Website:
🔗 Live Site Link: https://bdtuition-app.netlify.app

🔗 GitHub Repository (Client): https://github.com/dev-rasel-parvez/tuition-app-client

🔗 GitHub Repository (Server): https://github.com/dev-rasel-parvez/tuition-app-server

🎯 Project Purpose

eTuitionBd is a full-stack Tuition Management System designed to solve real-world problems of finding verified tutors and authentic tuition jobs in a transparent, structured, and automated way.

Why This Project?

Reduce friction between students and tutors

Ensure verified tuition posts & tutor profiles

Enable secure payments and clear workflows

Provide admins with full control and analytics

Practice real-world role-based SaaS architecture

🚀 Key Features
🔐 Authentication & Authorization

Firebase Authentication (Email/Password + Google Login)

Role-based access (Student / Tutor / Admin)

JWT token generation & verification

Protected routes with no redirect on reload

Environment-secured Firebase & MongoDB credentials

🏠 Home Page

Hero Section

Latest Tuition Posts (dynamic from backend)

Latest Tutors (dynamic from backend)

Framer Motion animations (minimum 2)

“How It Works” – 3-step visual grid

“Why Choose Us” feature section

👨‍🎓 Student Dashboard

Post new tuition (Pending → Admin approval)

Update tuition (default values shown)

Delete tuition (confirmation popup)

View approved tuitions

View tutor applications

Approve tutor only after Stripe payment

Reject tutor applications

Payment history

Profile update (name & photo)

👨‍🏫 Tutor Dashboard

Browse approved tuition posts

Apply to tuition via modal form

Track application status (Pending / Approved / Rejected)

Update or delete applications before approval

View ongoing tuitions

Revenue & earnings history

🛠️ Admin Dashboard

User Management

View users (name, email, image, role, status)

Update user info

Change roles (Student / Tutor / Admin)

Delete users

Tuition Management

Review all tuition posts

Approve / Reject tuition posts

Reports & Analytics

View total platform earnings

View all successful transactions

Financial overview with charts & graphs

💳 Payment System

Stripe payment integration

Tutor approval only after successful payment

Secure transaction history

Revenue tracking for tutors and admin

🔍 Advanced Features (Challenge Part)

Search tuition by subject & location

Sort by budget & date

Pagination (tuition listing page)

Advanced filter (class, subject, location)

JWT verification (role, access level, expiration)

🎨 UI / UX Highlights

Unique design (not module-based)

DaisyUI + Tailwind CSS

Sticky responsive navbar

Dashboard-specific layout

Equal image sizes & consistent buttons

Mobile, tablet & desktop responsive

Custom 404 error page

Full-screen loading spinner

🛠️ Technologies & Packages Used
🔹 Frontend

React

React Router DOM

Tailwind CSS

DaisyUI

Firebase Authentication

Axios

Framer Motion

SweetAlert2

Stripe.js

React Icons

🔹 Backend

Node.js

Express.js

MongoDB

Firebase Admin SDK

JSON Web Token (JWT)

Stripe

CORS

dotenv