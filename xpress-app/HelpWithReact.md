# Xpress Auto Care Website


## Project Overview

This repository contains the source code for the Xpress Auto Care website, a modern web application for an auto repair service. The website is built using React and Vite to provide a fast, responsive user experience.

## File Structure

```
xpress-app/
├── node_modules/       # Third-party dependencies
├── public/             # Static files served directly
│   └── index.html      # Main HTML entry point
├── src/                # Source code directory
│   ├── assets/         # Images, fonts, and other static resources
│   ├── Components/     # React components
│   │   ├── Footer.jsx  # Site footer component
│   │   ├── Header.jsx  # Site header with navigation
│   │   ├── Hero.jsx    # Hero section component
│   │   ├── Reviews.jsx # Customer reviews component
│   │   ├── Services.jsx# Auto services component
│   │   └── WhyUs.jsx   # Testimonials/value proposition component
│   ├── App.jsx         # Main React component
│   ├── index.css       # Global CSS styles
│   └── main.jsx        # React entry point
├── .gitignore          # Specifies files Git should ignore
├── eslint.config.js    # ESLint configuration (code quality)
├── package-lock.json   # Exact dependency versions (auto-generated)
├── package.json        # Project metadata and dependencies
└── vite.config.js      # Vite build tool configuration
```

## Key Files and Directories Explained

### Configuration Files

- **package.json**: Defines project dependencies, scripts, and metadata. This is where you can add new packages or define build commands.
- **package-lock.json**: Automatically generated file that locks dependency versions for consistent installations.
- **vite.config.js**: Configuration for Vite, the build tool that compiles and serves the application. It's faster than traditional bundlers like webpack.
- **.gitignore**: Lists files and directories that should not be tracked by Git (like `node_modules`).
- **eslint.config.js**: Configuration for ESLint, which helps maintain code quality and consistency.

### Core Directories

- **node_modules/**: Contains all third-party libraries and dependencies installed via npm or yarn. This folder should never be committed to version control.
- **public/**: Contains static assets that are copied as-is during the build process.
- **src/**: Contains all the source code for the application.

### Component Structure

The `src/Components/` directory contains modular React components that make up the UI:

- **Header.jsx**: Navigation bar with links and icons
- **Hero.jsx**: Main banner section with a featured quote
- **Services.jsx**: Displays available auto services (check-up, repair, maintenance)
- **Reviews.jsx**: Customer review section
- **WhyUs.jsx**: Testimonials and reasons to choose Xpress Auto Care
- **Footer.jsx**: Page footer with copyright information

### Entry Points

- **index.html**: The main HTML file that serves as the entry point for the web application
- **main.jsx**: The main JavaScript entry point that renders the React application
- **App.jsx**: The root React component that composes all other components together

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
   
   `git clone https://github.com/Jalv13/XpressAuto`

2. Open Repository in `vs Code`

3. Navigate to the project directory(using vs code terminal)
   
   **run command: `cd xpress-app`**


4. Install dependencies(using vs code terminal)
   
   **run command: `npm install`**

5. Start the development server(using vs code terminal)
   
   **run command: `npm run dev`**

6. Open your browser and navigate to `http://localhost:5173`

## Building for Production

To create a production build: 


   **run command: ` npm run build`**


This will generate optimized files in the `dist` directory.

## Adding New Components

To add a new component:

1. Create a new `.jsx` file in the `src/Components` directory
2. Import the component in `App.jsx`
3. Add the component to the JSX in the render method

## Contributing


1. Create a new branch (`git checkout -b feature/your-feature`)
2. Commit your changes (`git commit -m 'Add some feature'`)
3. Push to the branch (`git push origin feature/your-feature`)
4. Open a Pull Request
