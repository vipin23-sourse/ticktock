# ticktock - Timesheet Web Application


---

## Demo Credentials

To test the application locally or in production:

- **Email**: `jhon@example.com`
- **Password**: `password`

---

## Frameworks & Libraries Used

### **Core Stack**
Next.js 15
React 19
TypeScript

### **Styling & UI Components**
Tailwind CSS v4
Shadcn UI / Radix UI
Lucide React

### **Forms & Validation**
React Hook Form
Zod

### **Authentication & State**
NextAuth.js v4

---

## Features

- Secure Authentication
- Timesheet Dashboard
- Weekly Task Breakdown
- React Suspense & Streaming
- Add / Edit Task Modal
- Fully Responsive

---

## Setup & Installation Instructions

Follow these steps to run the project locally on your machine:

### **1. Prerequisites**
Make sure you have **Node.js 18+** and **npm** (or yarn/pnpm) installed on your system.

```bash
node -v
npm -v
```

### **2. Clone the Repository**
```bash
git clone https://github.com/your-username/timesheet.git
cd timesheet
```

### **3. Install Dependencies**
```bash
npm install
```

### **4. Configure Environment Variables**
Create a `.env.local` file in the root directory of the project:

```env
NEXTAUTH_SECRET=fallback-secret-for-development
NEXTAUTH_URL=http://localhost:3000
```

To generate a secure secret for production, run:
> openssl rand -base64 32


Run the Development Server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## Production Build

To test the production build locally:

```bash
# Build the production application
npm run build

# Start the production server
npm start
```







