# LeetCode Tracker

An app to help users track their LeetCode problem-solving progress, visualize stats, and stay motivated to keep coding.

---

## Table of Contents

- [Motivation](#motivation)  
- [Features](#features)  
- [Tech Stack & Architecture](#tech-stack--architecture)  
- [Getting Started](#getting-started)  
  - [Prerequisites](#prerequisites)  
  - [Installation](#installation)  
- [Roadmap / Future Enhancements](#roadmap--future-enhancements)  
- [License](#license)  
---

## Motivation

Progress tracking is a powerful motivator in learning to code. LeetCode is one of the most popular platforms for algorithm practice, but it’s easy to lose track of what you’ve solved, what you’ve struggled with, or how your skill is evolving.

This project aims to:

- Provide a clean, visual dashboard of your LeetCode activity and problem-solving stats  
- Help users see trends, strengths, and weaknesses  
- Encourage consistency by making progress visible  
- Serve as a tool for reflection and planning in your algorithm practice journey  

---

## Features

Some of the functionalities that this tracker supports (or could support):

- 📈 Visual summary of solved / attempted problems  
- 📊 Charts for difficulty breakdown, topic distribution, solving trends over time  
- 🕒 Time-based analytics (e.g. problems solved per week / month)  
- 🔍 Filtering by tags, difficulty, or status  
- 🧮 “Growth” or “streak” tracking — see how your momentum is going  
- 🔐 (Planned) User authentication and personal accounts  
- 🌐 (Planned) Sync with LeetCode API or scrape submissions automatically  
- 💾 (Planned) Persist user data, historical backups  

---

## Tech Stack & Architecture

Here’s the architecture (or a proposed one) behind this app:

| Layer / Module | Technology | Description |
|----------------|-------------|-------------|
| Frontend / UI | (e.g. React, Vue, or whatever you used) | Interacts with users, displays charts, dashboards |
| Backend / API | (e.g. Node.js, Express, serverless) | Serves data endpoints, processes analytics |
| Data Storage | (e.g. database, local storage) | To store user progress, historical data, settings |
| Data Processing / Analytics | Charting libraries, analysis logic | Compute trends, breakdowns, formatting for frontend |
| Integration | LeetCode APIs or scraping | Fetching problem & submission data |
| Deployment | (e.g. Vercel, Netlify, Heroku) | Where the app is hosted and made live |

You can extend this section by describing your folder structure, modules, or data flow.

---

## Getting Started

### Prerequisites

- Node.js (version 14+, or the version you target)  
- npm, yarn, or pnpm  
- Access / API credentials if integrating with external services  
- (Optional) Database setup if using one  

### Installation

```bash
git clone https://github.com/BYTE-Club-CCNY/leetcode-tracker.git
cd leetcode-tracker
npm install
# or
yarn
# or
pnpm install

- Add types for chrome and dependencies
This commit adds the @types/chrome package as a devDependency and includes its dependencies: @types/filesystem and @types/har-format.|

To install initial dependencies: npm install
other dependencies: npm install -D @types/chrome
To update code: ctrl + k and s npm run build
To run webpage: npm run dev



