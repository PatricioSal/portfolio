# ATX Teens Need Jobs 🚀

> **A community-driven employment portal empowering Austin youth with accessible job opportunities, internships, and career mentorship.**

[![GitHub Repository](https://img.shields.io/badge/GitHub-ATX--Teens--Need--Jobs-orange?logo=github)](https://github.com/PatricioSal/ATX-Teens-Need-Jobs)
[![Stack](https://img.shields.io/badge/Stack-JavaScript%20%7C%20Supabase%20%7C%20HTML5%20%7C%20CSS3-blue)](#-tech-stack)
[![Database](https://img.shields.io/badge/Database-PostgreSQL%20(Supabase)-3ECF8E?logo=supabase)](https://supabase.com)
[![Deployment](https://img.shields.io/badge/Deployment-Vercel-black?logo=vercel)](https://vercel.com)

---

## 📖 Overview

**ATX Teens Need Jobs** is a community-driven web platform engineered to connect Austin youth (ages 14–19) with vetted, teen-friendly employment and internship opportunities across Central Texas. 

Rather than relying on unverified open submissions, the platform operates on an **administrator-curated model**: the site administrator actively discovers, vets, and manually posts legitimate teen job openings from local employers (such as Cinemark, YMCA, Austin Aquarium, The Oasis, and local small businesses). Job seekers browse open positions, review role expectations and perks, and follow direct links to apply on the employer's official application portal.

> [!NOTE]
> **Employer Self-Service Status**: Currently, local businesses do **not** have an automated self-submission or self-posting portal. All listings are curated and published manually by the platform administrator via the secure admin dashboard. An employer submission portal is on the future roadmap.

---

## ⚡ Key Features

* **💼 Curated Teen Job Directory (`jobs.html` & `index.html`)**:
  * Vetted job listings specifically tailored for high school and teenage candidates (ages 14–19).
  * Direct links to official company job applications and verified hiring contact emails.
  * Transparent perk tags (e.g., *Flexible Scheduling*, *Free Movies*, *Education Assistance*, *Employee Discounts*) and requirement highlights.
  * Responsive, mobile-first design with dynamic keyword and category filtering.

* **🛡️ Admin Curation Dashboard (`admin.html`)**:
  * Password-authenticated management suite for the platform curator (backed by Supabase Auth).
  * **Manual Job Posting**: Form to input company name, role title, official application URL, contact email, job responsibilities, and perk tags.
  * **Company Logo Uploads**: Direct integration with Supabase Storage (`company-logos` bucket) with live progress tracking and URL generation.
  * **Listing Lifecycle**: Full ability to edit existing listings, update details, or delete expired postings.
  * **Review Moderation & Metrics**: Approve or revoke community testimonials and update live platform statistics (businesses partnered, placements made).

* **⭐ Community Reviews & Dynamic Metrics**:
  * Public review submission form for students and local businesses to share experiences.
  * Admin-moderated approval queue before testimonials appear live on the homepage.
  * Animated placement and partner metrics synced to the Supabase database.

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | HTML5, Modern CSS3, JavaScript (ES6+) | Lightweight, fast-loading, mobile-first responsive user interface |
| **Backend & Auth** | [Supabase](https://supabase.com) (PostgreSQL) | Managed relational database, Row Level Security, and curator authentication |
| **Storage** | Supabase Storage (`company-logos`) | Cloud hosting for partner company logos and media assets |
| **Hosting & CI/CD** | Vercel | Global CDN distribution and serverless configuration |

---

## 🏛️ System Architecture

```mermaid
graph TD
    subgraph Admin Curation Workflow
        A[Site Administrator] -->|Researches & Vets Teen Openings| B[Admin Portal : admin.html]
        B -->|Supabase Auth Login| C[(Supabase Cloud DB)]
        B -->|Manually Creates / Edits Listings| C
        B -->|Uploads Partner Logos| D[Supabase Storage : company-logos]
        B -->|Moderates Testimonials & Stats| C
    end

    subgraph Teen Job Seeker Workflow
        E[Austin Teen Job Seekers] -->|Browse & Filter Opportunities| F[Public Portal : index.html / jobs.html]
        F -->|Fetch Live Vetted Jobs & Reviews| C
        F -->|Click Apply Directly| G[Official Employer Application Portals\ne.g., Cinemark, YMCA, Company ATS]
        E -->|Submit Feedback / Review| F
    end

    subgraph Future Roadmap
        H[Local Austin Employers] -.->|Future Self-Service Portal\n(Not Yet Integrated)| B
    end
```

---

## 🗺️ Roadmap & Planned Features

* [ ] **Employer Self-Service Portal**: Allow verified Austin businesses to submit job listings directly for admin moderation and approval.
* [ ] **Automated Expiration Handling**: Automatically archive expired listings based on application deadlines.
* [ ] **Job Alert Notifications**: Allow teen job seekers to sign up for email/SMS notifications when new local openings match their schedule or zip code.
* [ ] **Youth Resume Builder**: Interactive guidance and starter templates for first-time job applicants.

---

## 📂 Project Structure

```text
ATX-Teens-Need-Jobs/
├── index.html          # Homepage with featured opportunities, hero search, & stats
├── jobs.html           # Full interactive job directory with filter sidebar
├── admin.html          # Secure administrative dashboard for job & review management
├── script.js           # Client-side routing, filtering, dynamic rendering, & event handlers
├── style.css           # Custom styling system, responsive grid layouts, and color tokens
├── init-supabase.js    # Supabase JavaScript client initialization & configuration
├── schema.sql          # Complete PostgreSQL schema, table definitions, RLS, & storage setup
├── assets/             # Brand logos, icons, and local media files
├── api/                # Serverless API routes (for Vercel deployment)
├── .env.example        # Environment configuration template
└── README.md           # Project documentation (this file)
```

---

## 🗃️ Database Schema (`schema.sql`)

The application is backed by three core relational tables and a media bucket:

### 1. `jobs` Table
```sql
CREATE TABLE jobs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  logo TEXT,
  url TEXT,
  email TEXT,
  details TEXT[] DEFAULT '{}',
  perks TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
```

### 2. `reviews` Table
```sql
CREATE TABLE reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  reviewer TEXT NOT NULL,
  reviewer_type TEXT NOT NULL, -- 'Student' or 'Business'
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT NOT NULL,
  approved BOOLEAN DEFAULT FALSE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
```

### 3. `stats` Table
```sql
CREATE TABLE stats (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  businesses_partnered INTEGER DEFAULT 0,
  placements_completed INTEGER DEFAULT 0,
  jobs_posted INTEGER DEFAULT 0,
  internships_filled INTEGER DEFAULT 0
);
```

---

## 🚀 Getting Started

### Prerequisites
* A modern web browser (Chrome, Edge, Firefox, Safari).
* A free [Supabase](https://supabase.com) account.
* A local static server (e.g. VS Code Live Server, Python `http.server`, or Node `serve`).

### Step 1: Clone the Repository
```bash
git clone https://github.com/PatricioSal/ATX-Teens-Need-Jobs.git
cd ATX-Teens-Need-Jobs
```

### Step 2: Configure Supabase
1. Create a new project in your [Supabase Dashboard](https://supabase.com/dashboard).
2. Open the **SQL Editor** in Supabase and execute the contents of [`schema.sql`](schema.sql).
3. In your project settings, locate your **Project URL** and **Anon Public Key**.

### Step 3: Set Environment Variables
Create a local `.env` or update `init-supabase.js`:
```javascript
const SUPABASE_URL = 'YOUR_SUPABASE_PROJECT_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
```

### Step 4: Run Locally
You can launch the site using any static web server:
```bash
# Using Python:
python -m http.server 3000

# Using Node:
npx serve .
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔒 Security & Admin Access

* **Row-Level Security (RLS)** is enabled on all tables.
* Public visitors have read-only (`SELECT`) permissions for approved listings and stats.
* Write, update, and delete permissions are gated via Supabase Auth (`authenticated` role) inside `admin.html`.

---

## 👤 Author

* **Patricio Salinas** — [GitHub (@PatricioSal)](https://github.com/PatricioSal)

---

## 📄 License

This project is licensed under the MIT License — feel free to use and adapt it for youth community initiatives.
