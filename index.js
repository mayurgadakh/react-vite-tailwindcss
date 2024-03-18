#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");

try {
  execSync("npm init vite@latest . -- --template react", { stdio: "inherit" });
  execSync("npm install", { stdio: "inherit" });
  execSync("npm install -D tailwindcss postcss autoprefixer", {
    stdio: "inherit",
  });
  execSync("npx tailwindcss init -p", { stdio: "inherit" });

  const tailwindConfig = `
  /** @type {import('tailwindcss').Config} */
  export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {},
    },
    plugins: [],
  };
  `;
  fs.writeFileSync("tailwind.config.js", tailwindConfig);

  const indexCssContent = `@tailwind base;
@tailwind components;
@tailwind utilities;
`;
  fs.writeFileSync("src/index.css", indexCssContent);

  const appComponent = `import React from 'react'

  const App = () => {
    return (
      <div className="text-4xl font-semibold">App</div>
    )
  }
  
  export default App;
`;
  fs.writeFileSync("src/App.jsx", appComponent);

  console.log(
    "React (Vite) with TailwindCSS configuration completed successfully!"
  );
} catch (error) {
  console.error("Error during setup:", error);
}
