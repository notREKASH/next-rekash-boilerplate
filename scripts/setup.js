const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Get script directory
const scriptDir = path.resolve(__dirname, "..");

// Get project name from command line
const projectName = process.argv[2];

if (!projectName) {
  console.error("Error: Please specify a project name.");
  process.exit(1);
}

console.log(`Creating project ${projectName}`);

try {
  // Create the project with Next.js
  execSync(
    `npx create-next-app@latest ${projectName} --typescript --eslint --tailwind --no-src-dir --app --no-import-alias`,
    { stdio: "inherit" }
  );

  // Navigate to the project directory
  process.chdir(projectName);

  // Change the default branch to main
  execSync("git branch -M main", { stdio: "inherit" });

  // Paths of the directories
  const COMPONENTS_DIR = "components";
  const DATA_DIR = "data";
  const VSCODE_DIR = ".vscode";

  // Create the components directories
  fs.mkdirSync(path.join(COMPONENTS_DIR, "common", "site-header"), {
    recursive: true,
  });
  fs.mkdirSync(path.join(COMPONENTS_DIR, "common", "site-footer"), {
    recursive: true,
  });
  fs.mkdirSync(path.join(COMPONENTS_DIR, "navigation", "main-nav"), {
    recursive: true,
  });
  fs.mkdirSync(path.join(COMPONENTS_DIR, "navigation", "mobile-nav"), {
    recursive: true,
  });
  fs.mkdirSync(path.join(COMPONENTS_DIR, "navigation", "social-nav"), {
    recursive: true,
  });
  fs.mkdirSync(path.join(COMPONENTS_DIR, "navigation", "mobile-link"), {
    recursive: true,
  });
  fs.mkdirSync(path.join(COMPONENTS_DIR, "common", "theme-toggle"), {
    recursive: true,
  });
  fs.mkdirSync(path.join(COMPONENTS_DIR, "providers"), { recursive: true });

  // Create the data and vscode directories
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.mkdirSync(VSCODE_DIR, { recursive: true });

  console.log("Created project folders");

  // Reset app/globals.css
  const globalsCssPath = path.join("app", "globals.css");

  fs.writeFileSync(
    globalsCssPath,
    `
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    `
  );

  console.log("Reset global.css");

  console.log("Installing additional dependencies...");

  // Install shadcn/ui with default settings and add components
  execSync("npx shadcn@latest init -d", { stdio: "inherit" });
  execSync("npx shadcn@latest add button", { stdio: "inherit" });
  execSync("npx shadcn@latest add sheet", { stdio: "inherit" });
  execSync("npx shadcn@latest add dropdown-menu", { stdio: "inherit" });

  // Install react-icons and next-themes
  execSync("npm install react-icons next-themes", { stdio: "inherit" });

  // Install ESLint, Prettier and plugins
  execSync(
    "npm install -D eslint eslint-plugin-tailwindcss @typescript-eslint/parser @eslint/js typescript-eslint prettier prettier-plugin-tailwindcss",
    { stdio: "inherit" }
  );

  // Setup ESLint and Prettier configuration
  console.log("Setting up ESLint and Prettier configuration...");
  if (fs.existsSync(".eslintrc.json")) {
    fs.renameSync(".eslintrc.json", ".eslintrc.js");
  }

  fs.copyFileSync(
    path.join(scriptDir, "templates/.eslintrc.js"),
    ".eslintrc.js"
  );
  fs.copyFileSync(path.join(scriptDir, "templates/.prettierrc"), ".prettierrc");

  // Setup Husky and lint-staged
  console.log("Setting up Husky and lint-staged...");
  execSync("npx husky-init", { stdio: "inherit" });
  execSync("npm install", { stdio: "inherit" });
  fs.rmSync(".husky/pre-commit");
  execSync("npm install --save-dev lint-staged", { stdio: "inherit" });
  execSync(
    `npx husky add .husky/pre-commit "npx lint-staged \
npm run lint"`,
    {
      stdio: "inherit",
    }
  );

  fs.copyFileSync(
    path.join(scriptDir, "templates/.lintstagedrc.json"),
    ".lintstagedrc.json"
  );

  // Setup Commitlint and Commitizen
  console.log("Setting up commitlint and commitizen...");
  execSync(
    'npm install --save-dev "@commitlint/cli" "@commitlint/config-conventional"',
    { stdio: "inherit" }
  );
  fs.copyFileSync(
    path.join(scriptDir, "templates/commitlint.config.js"),
    "commitlint.config.js"
  );
  execSync(
    'npx husky add .husky/commit-msg "npx --no-install commitlint --edit',
    { stdio: "inherit" }
  );
  execSync("npm install --save-dev commitizen", { stdio: "inherit" });
  execSync(
    "npx commitizen init cz-conventional-changelog --save-dev --save-exact",
    { stdio: "inherit" }
  );

  // Add VSCode settings
  console.log("Setting up VSCode settings...");
  fs.mkdirSync(".vscode", { recursive: true });
  fs.copyFileSync(
    path.join(scriptDir, "templates/settings.json"),
    ".vscode/settings.json"
  );

  // Update package.json
  console.log("Updating package.json...");

  // Read package.json
  const packageJsonPath = path.join(process.cwd(), "package.json");
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

  // Add new scripts
  packageJson.scripts = {
    ...packageJson.scripts, // Conserver les autres scripts existants
    build: "next build && prisma generate",
    "eslint:check": "eslint .",
    "eslint:debug": "eslint --debug .",
    "eslint:fix": "eslint --fix .",
    "format:write": "prettier --write .",
    "format:check": "prettier --check .",
    prepare: "husky",
  };

  // Write the updated in package.json
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log("Updated package.json with new scripts");

  // Add fonts
  console.log("Copying fonts...");
  fs.rmSync("app/fonts", { recursive: true, force: true });
  fs.mkdirSync("app/fonts", { recursive: true });

  fs.copyFileSync(
    path.join(scriptDir, "fonts/InterVariable.woff2"),
    "app/fonts/InterVariable.woff2"
  );

  // Add components
  console.log("Copying components...");
  const sourceDir = path.join(scriptDir, "components");
  const destDir = path.join(process.cwd(), "components");

  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  // Read all files and directories to src folder
  fs.readdirSync(sourceDir).forEach((file) => {
    const sourceFile = path.join(sourceDir, file);
    const destFile = path.join(destDir, file);

    // Check if it's a file or a directory
    const stat = fs.statSync(sourceFile);

    if (stat.isDirectory()) {
      // If it's a directory, copy it recursively
      copyDirectory(sourceFile, destFile);
    } else {
      // If it's a file, copy it directly
      fs.copyFileSync(sourceFile, destFile);
      console.log(`Copied file: ${sourceFile} to ${destFile}`);
    }
  });

  // Function to copy directories recursively
  function copyDirectory(source, destination) {
    if (!fs.existsSync(destination)) {
      fs.mkdirSync(destination, { recursive: true });
    }

    fs.readdirSync(source).forEach((file) => {
      const srcFile = path.join(source, file);
      const destFile = path.join(destination, file);

      const stat = fs.statSync(srcFile);

      if (stat.isDirectory()) {
        copyDirectory(srcFile, destFile);
      } else {
        fs.copyFileSync(srcFile, destFile);
        console.log(`Copied file: ${srcFile} to ${destFile}`);
      }
    });
  }

  // Add data
  console.log("Copying data...");
  fs.copyFileSync(
    path.join(scriptDir, "data/global.data.tsx"),
    "data/global.data.tsx"
  );

  // Refactor layout.tsx and page.tsx
  console.log("Refactoring layout.tsx and page.tsx...");
  fs.copyFileSync(path.join(scriptDir, "app/layout.tsx"), "app/layout.tsx");
  fs.copyFileSync(path.join(scriptDir, "app/page.tsx"), "app/page.tsx");

  // Updating tailwind.config.ts and tsconfig.json
  console.log("Updating tailwind.config.ts and tsconfig.json...");

  // Updating tailwind.config.ts
  const modifyTailwindConfig = () => {
    const tailwindConfigPath = path.join(process.cwd(), "tailwind.config.ts");

    if (fs.existsSync(tailwindConfigPath)) {
      let tailwindConfig = fs.readFileSync(tailwindConfigPath, "utf8");

      tailwindConfig = tailwindConfig.replace(
        /content:\s*\[[^\]]*\]/,
        `content: [
          "./components/**/*.{js,ts,jsx,tsx,mdx}",
          "./containers/**/*.{js,ts,jsx,tsx,mdx}",
          "./app/**/*.{js,ts,jsx,tsx,mdx}"
        ]`
      );

      fs.writeFileSync(tailwindConfigPath, tailwindConfig);
      console.log("Modified tailwind.config.ts");
    } else {
      console.error("tailwind.config.ts not found");
    }
  };

  // Updating tsconfig.json
  const modifyTsconfig = () => {
    const tsconfigPath = path.join(process.cwd(), "tsconfig.json");

    if (fs.existsSync(tsconfigPath)) {
      const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, "utf8"));

      tsconfig.compilerOptions.paths = {
        "@components/*": ["./components/*"],
        "@containers/*": ["./containers/*"],
        "@types/*": ["./types/*"],
        "@app/*": ["./app/*"],
        ...tsconfig.compilerOptions.paths,
      };

      // Écrire le fichier JSON modifié
      fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2));
      console.log("Modified tsconfig.json");
    } else {
      console.error("tsconfig.json not found");
    }
  };

  modifyTailwindConfig();
  modifyTsconfig();

  // Commit all changes
  execSync("git add .", { stdio: "inherit" });
  execSync('git commit -m "chore: rekash boilerplate initial setup"', {
    stdio: "inherit",
  });

  console.log("Boilerplate setup completed!");
  console.log(`cd ${projectName}`);
  console.log("You can now start the development server with 'npm run dev'");
  console.log("Enjoy coding!");
} catch (error) {
  console.error("Error:", error.message);
  process.exit(1);
}
