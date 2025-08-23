```bash
                                             
               ▗▖                            
 ▐▌            ▐▌         ▐▌                 
▐███  ▟██▖ ▟█▟▌▐▙█▙  ▟█▙ ▐███       ▟█▟▌ ▟█▟▌
 ▐▌   ▘▄▟▌▐▛ ▜▌▐▛ ▜▌▐▛ ▜▌ ▐▌       ▐▛ ▜▌▐▛ ▜▌
 ▐▌  ▗█▀▜▌▐▌ ▐▌▐▌ ▐▌▐▌ ▐▌ ▐▌       ▐▌ ▐▌▐▌ ▐▌
 ▐▙▄ ▐▙▄█▌▝█▄█▌▐█▄█▘▝█▄█▘ ▐▙▄   █  ▝█▄█▌▝█▄█▌
  ▀▀  ▀▀▝▘ ▞▀▐▌▝▘▀▘  ▝▀▘   ▀▀   ▀   ▞▀▐▌ ▞▀▐▌
           ▜█▛▘                     ▜█▛▘ ▜█▛▘
                                             
```
## Table of Contents
* [✅ Prerequisites](#prerequisites)
* [🗄️ File Structure](#file-structure)
* [🏃 Getting Started](#getting-started)
* [🛠️ CICD](#cicd)

## ✅ Prerequisites
* Node.js v20
* Next.js

## 🗄 File Structure
```bash
├── README.md
├── app
│   ├── bug-reports
│   ├── documentation
│   ├── faq-organizers
│   ├── faq-users
│   ├── feature-requests
│   ├── globals.css
│   ├── layout.tsx
│   ├── not-found.tsx
│   ├── page.tsx
│   └── setup
├── components
│   ├── CTA.tsx
│   ├── FAQ.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│   └── HowItWorks.tsx
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── public
│   └── assets
├── tailwind.config.js
└── tsconfig.json
```
## 🏃 Getting Started
Install all library/project dependencies.
```bash
nvm use
npm install
```

To start the development server.
```bash
npm run dev
```
Go to http://localhost:3000 to view site changes.

To run eslint.
```bash
npm run lint
```

To create production files of the application.
```
npm run build
```
The files will be located in the `/out` directory.

For any image optimization run the following:
```bash
imagemin assets/*.jpg --out-dir=assets/optimized --plugin=mozjpeg --plugin.mozjpeg.quality=80
```
All the newly generated images are placed in `public/assets/optimized` directory.

## 🛠️ CICD
Using GitHub Actions its process is triggered under two conditions:
* There is an update to the `main` branch.
* There were changes modified in the `/site` directory.

The pipeline lints the project, builds the production files and deploys it to Azure Static Web Apps. 
