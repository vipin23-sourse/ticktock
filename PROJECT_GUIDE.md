# Timesheet Web Application - Beginner Developer Guide

Welcome to the **Timesheet App** codebase! This guide is created to help beginner UI developers understand the structure, architecture, design patterns, and every file and folder in this project.

---

## 🛠️ Tech Stack Overview

Before diving into the files, here are the key technologies used in this project:

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router architecture)
- **UI Library**: [React 19](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: Shadcn UI & Radix UI primitives (`Button`, `Dialog`, `Select`, `Table`, `Badge`, `DropdownMenu`)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Form Handling & Validation**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) (`zodResolver`)
- **Authentication**: [NextAuth.js v4](https://next-auth.js.org/) (Credentials Provider with JWT strategy)

---

## 📁 Project Directory Structure

```text
timesheet/
├── src/
│   ├── app/                         # Next.js App Router (Pages, Layouts & APIs)
│   │   ├── (auth)/                  # Auth Route Group
│   │   │   └── login/               # /login Page
│   │   ├── (dashboard)/             # Protected Dashboard Route Group
│   │   │   ├── dashboard/           # /dashboard Pages & Route Handlers
│   │   │   │   ├── [weekId]/        # Dynamic /dashboard/[weekId] Pages
│   │   │   │   └── page.tsx         # Main Dashboard Page
│   │   │   └── layout.tsx           # Shared Dashboard Layout (Navbar & Sidebar)
│   │   ├── api/                     # REST API Routes
│   │   │   ├── auth/[...nextauth]/  # NextAuth Endpoint
│   │   │   └── timesheets/          # /api/timesheets Endpoint
│   │   ├── globals.css              # Global Tailwind Styles & Theme Variables
│   │   ├── layout.tsx               # Root App Layout (AuthProvider)
│   │   └── page.tsx                 # Root Page (Redirects to /login)
│   ├── components/                  # Reusable UI & Context Providers
│   │   ├── providers/               # Context Providers (e.g. AuthProvider)
│   │   └── ui/                      # UI Components (Buttons, Dialogs, Tables, Modals)
│   │       └── modals/              # Dialog Modals (AddEntryModal)
│   ├── feature/                     # Feature-Based Modules
│   │   ├── auth/                    # Auth Feature (Forms & Schemas)
│   │   └── timesheet/               # Timesheet Feature (Containers, Tables, Skeletons)
│   ├── hooks/                       # Custom React Hooks (e.g. useIsMobile)
│   ├── lib/                         # Helper Utilities, Mock Data & Configs
│   ├── middleware.ts                # NextAuth Route Protection Middleware
│   └── types/                       # TypeScript Type Definitions
├── public/                          # Static Assets (Images, Icons)
├── middleware.ts                    # Root Middleware export
├── package.json                     # Project Dependencies & Scripts
├── tailwind.config.ts / postcss     # Styling Configurations
└── tsconfig.json                    # TypeScript Configuration
```

---

## 🔍 Detailed File & Folder Explanation

### 1. Root Files (`/`)

- **`middleware.ts` / `src/middleware.ts`**: NextAuth middleware that protects `/dashboard` routes. If an unauthenticated user visits `/dashboard`, they are redirected to `/login`. If an authenticated user visits `/login`, they are redirected to `/dashboard`.
- **`package.json`**: Lists all npm dependencies, scripts (`npm run dev`, `npm run build`), and project metadata.
- **`components.json`**: Configuration file for Shadcn UI component generator.
- **`tsconfig.json`**: Defines TypeScript compiler settings and path aliases like `@/*` mapping to `./src/*`.

---

### 2. The Application Routes (`src/app/`)

Next.js 15 uses the **App Router**. Folders inside `src/app` define URL routes.

#### Root Layout & Pages
- **`src/app/layout.tsx`**: The main wrapper for the entire application. It sets up HTML metadata, font styles, and wraps the app with `AuthProvider`.
- **`src/app/page.tsx`**: The root URL (`/`). Immediately redirects the user to `/login`.
- **`src/app/globals.css`**: Global stylesheet containing Tailwind directives, CSS variables, and custom scrollbar/theme styles.

#### Authentication Group `(auth)`
- **`src/app/(auth)/login/page.tsx`**: The login page (`/login`). Renders the branding banner alongside the `LoginForm`.

#### Dashboard Group `(dashboard)`
- **`src/app/(dashboard)/layout.tsx`**: Shared shell layout for all authenticated pages. Contains the sidebar navigation, header profile, and content wrapper.
- **`src/app/(dashboard)/dashboard/page.tsx`**: Main dashboard route (`/dashboard`). It is a **Server Component** that renders `<TimesheetContainer />` wrapped in React `<Suspense>` for **Streaming**.
- **`src/app/(dashboard)/dashboard/loading.tsx`**: Next.js route-level loading state that shows `TimesheetSkeleton` during page transitions.
- **`src/app/(dashboard)/dashboard/[weekId]/page.tsx`**: Dynamic route (`/dashboard/1`, `/dashboard/2`, etc.) showing detailed daily task entries for a specific week.
- **`src/app/(dashboard)/dashboard/[weekId]/loading.tsx`**: Route-level loading state for week details page using `WeekDetailsSkeleton`.

#### API Endpoints `src/app/api/`
- **`src/app/api/auth/[...nextauth]/route.ts`**: NextAuth authentication handler (`GET` and `POST`).
- **`src/app/api/timesheets/route.ts`**: API route providing `GET` (list timesheets) and `POST` (create new timesheet entry).

---

### 3. Feature-Based Architecture (`src/feature/`)

Features are modular folders that group business logic, containers, views, and validation schemas together.

#### Auth Feature (`src/feature/auth/`)
- **`components/LoginForm.tsx`**: Client component managing user email/password login form using `react-hook-form` and `NextAuth`'s `signIn()` function.
- **`components/schema.ts`**: Zod validation schema (`loginSchema`) ensuring valid email and password format.

#### Timesheet Feature (`src/feature/timesheet/`)
- **`componets/TimesheetContainer.tsx`**: **Server Component** that fetches timesheet list data directly on the server and passes it to `TimesheetTable`.
- **`componets/TimesheetTable.tsx`**: **Client Component** (`"use client"`) rendering the timesheet data table, status badges (`COMPLETED`, `INCOMPLETE`, `MISSING`), filters (Status, Date), and pagination controls.
- **`componets/TimesheetSkeleton.tsx`**: Animated loading skeleton used during React `<Suspense>` streaming for the timesheet table.
- **`componets/WeekDetailsContainer.tsx`**: **Server Component** fetching daily task data for a specific week on the server.
- **`componets/WeekDetailsView.tsx`**: **Client Component** rendering daily task lists, progress bar (e.g. `20/40 hrs`), edit/delete dropdown menus (`TaskActionsMenu`), and triggering `AddEntryModal`.
- **`componets/WeekDetailsSkeleton.tsx`**: Animated skeleton loading state for the week details view.
- **`componets/modals/AddEntryModal.tsx`**: Modal dialog for creating or editing a daily timesheet task entry. Uses `react-hook-form` and `zodResolver(entrySchema)`.
- **`componets/modals/schema.ts`**: Zod validation schema (`entrySchema`) validating project choice, work type, description (min 5 chars), and hours (1–24).

---

### 4. Components & UI Kit (`src/components/`)

- **`providers/AuthProvider.tsx`**: Wraps React components in NextAuth's `<SessionProvider>` so client components can use `useSession()`.
- **`ui/`**: Reusable domain-agnostic Shadcn UI primitives:
  - `button.tsx`: Customizable button component with variants (`default`, `outline`, `ghost`).
  - `input.tsx` & `textarea.tsx`: Form input elements.
  - `select.tsx`: Dropdown selector primitives.
  - `table.tsx`: HTML table wrapper components (`TableHeader`, `TableRow`, `TableCell`).
  - `badge.tsx`: Colored status pills.
  - `dialog.tsx`: Modal overlay & dialog container.
  - `progress.tsx`: Custom progress bar component.
  - `dropdown-menu.tsx`: Action menus.
  - `field.tsx`: Accessible form field wrapper with labels and descriptions.

---

### 5. Utility Files & Hooks (`src/hooks/` & `src/lib/`)

- **`src/hooks/useIsMobile.ts`**: Custom React hook checking `window.innerWidth` to detect mobile viewports dynamically.
- **`src/lib/auth.ts`**: NextAuth configuration (`NextAuthOptions`), credential validation logic, and session JWT strategy settings.
- **`src/lib/dummyData.ts`**: Mock dataset containing default timesheets and daily task records.
- **`src/lib/utils.ts`**: Contains `cn()`, a helper function combining `clsx` and `tailwind-merge` to safely combine Tailwind class names without conflicts.

---

## 💡 Key Architectural Concepts for UI Developers

### 1. Server Components vs Client Components
- **Server Components** (default in Next.js App Router, e.g. `TimesheetContainer.tsx`): Run on the server to fetch data fast and securely without exposing backend credentials or causing client JS bloat.
- **Client Components** (marked with `"use client"`, e.g. `TimesheetTable.tsx`): Run in the browser to handle user events, interactive state (`useState`, `useEffect`), and DOM interactions.

### 2. Streaming with `<Suspense>` & Skeletons
Instead of waiting for server data to fetch before displaying anything, Next.js streams the UI immediately:
1. Server sends the `TimesheetSkeleton` immediately.
2. Server component fetches data in the background.
3. Once ready, the server streams `TimesheetTable` to replace the skeleton seamlessly.

### 3. Form Validation Pattern (`react-hook-form` + `zod`)
Every form in the application follows this 3-step pattern:
1. Define the schema in `schema.ts`: `const schema = z.object({ ... })`.
2. Connect `useForm` with `zodResolver(schema)`: `useForm({ resolver: zodResolver(schema) })`.
3. Bind inputs via `{...register("fieldName")}` or `setValue("fieldName", value)` and display error messages with `errors.fieldName?.message`.

---

🎉 **You are ready to build!** If you have any questions, check the corresponding feature folder in `src/feature/` or component in `src/components/ui/`.
