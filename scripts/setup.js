const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Récupérer le nom du projet depuis les arguments
const projectName = process.argv[2];

if (!projectName) {
  console.error("Error: Please specify a project name.");
  process.exit(1);
}

console.log(`Creating project ${projectName}`);

try {
  // Créer un nouveau projet Next.js
  execSync(
    `npx create-next-app@latest ${projectName} --typescript --eslint --tailwind --no-src-dir --app --no-import-alias`,
    { stdio: "inherit" }
  );

  // Naviguer dans le projet
  process.chdir(projectName);

  console.log("Installing additional dependencies...");

  // Installer des dépendances supplémentaires
  execSync("npm install react-icons next-themes", { stdio: "inherit" });
  execSync(
    "npm install -D eslint eslint-plugin-tailwindcss @typescript-eslint/parser @eslint/js typescript-eslint prettier prettier-plugin-tailwindcss",
    { stdio: "inherit" }
  );

  // Configuration ESLint et Prettier
  console.log("Setting up ESLint and Prettier configuration...");
  if (fs.existsSync(".eslintrc.json")) {
    fs.renameSync(".eslintrc.json", ".eslintrc.js");
  }

  const scriptDir = path.resolve(__dirname, "..");

  fs.copyFileSync(
    path.join(scriptDir, "templates/.eslintrc.js"),
    ".eslintrc.js"
  );
  fs.copyFileSync(
    path.join(scriptDir, "templates/eslint.config.js"),
    "eslint.config.js"
  );
  fs.copyFileSync(path.join(scriptDir, "templates/.prettierrc"), ".prettierrc");

  // Installer Husky et lint-staged
  console.log("Setting up Husky and lint-staged...");
  execSync("npx husky-init && npm install", { stdio: "inherit" });
  execSync("npm install --save-dev lint-staged", { stdio: "inherit" });
  execSync('npx husky add .husky/pre-commit "npx lint-staged npm run lint"', {
    stdio: "inherit",
  });

  fs.copyFileSync(
    path.join(scriptDir, "templates/.lintstagedrc.json"),
    ".lintstagedrc.json"
  );

  // Installer Commitlint et Commitizen
  console.log("Setting up commitlint and commitizen...");
  execSync("npm install --save-dev @commitlint/{config-conventional,cli}", {
    stdio: "inherit",
  });
  fs.copyFileSync(
    path.join(scriptDir, "templates/commitlint.config.js"),
    "commitlint.config.js"
  );
  execSync(
    "npx husky add .husky/commit-msg \"npx --no-install commitlint --edit '$1'\"",
    { stdio: "inherit" }
  );
  execSync("npm install --save-dev commitizen", { stdio: "inherit" });
  execSync(
    "npx commitizen init cz-conventional-changelog --save-dev --save-exact",
    { stdio: "inherit" }
  );

  // Configurer les paramètres VSCode
  console.log("Setting up VSCode settings...");
  fs.mkdirSync(".vscode", { recursive: true });
  fs.copyFileSync(
    path.join(scriptDir, "templates/settings.json"),
    ".vscode/settings.json"
  );

  // Mettre à jour le package.json
  console.log("Updating package.json...");
  execSync(
    'npx json -I -f package.json -e \'this.scripts["eslint"]="eslint ."\'',
    { stdio: "inherit" }
  );
  execSync(
    'npx json -I -f package.json -e \'this.scripts["eslint:debug"]="eslint --debug ."\'',
    { stdio: "inherit" }
  );
  execSync(
    'npx json -I -f package.json -e \'this.scripts["eslint:fix"]="eslint --fix ."\'',
    { stdio: "inherit" }
  );
  execSync(
    'npx json -I -f package.json -e \'this.scripts["format:write"]="prettier --write ."\'',
    { stdio: "inherit" }
  );
  execSync(
    'npx json -I -f package.json -e \'this.scripts["format:check"]="prettier --check ."\'',
    { stdio: "inherit" }
  );
  execSync(
    'npx json -I -f package.json -e \'this.scripts["prepare"]="husky"\'',
    { stdio: "inherit" }
  );

  // Copier les fichiers de composants et de police
  console.log("Copying components and font files...");
  fs.rmSync("app/fonts", { recursive: true, force: true });
  fs.mkdirSync("app/fonts", { recursive: true });

  fs.copyFileSync(
    path.join(scriptDir, "fonts/InterVariable.woff2"),
    "app/fonts/InterVariable.woff2"
  );

  const componentsDir = path.join(scriptDir, "components");
  execSync(`cp -r ${componentsDir}/* components`, { stdio: "inherit" });

  // Refactorer layout.tsx et page.tsx
  console.log("Refactoring layout.tsx and page.tsx...");
  fs.copyFileSync(path.join(scriptDir, "app/layout.tsx"), "app/layout.tsx");
  fs.copyFileSync(path.join(scriptDir, "app/page.tsx"), "app/page.tsx");

  // Mettre à jour tailwind.config.ts et tsconfig.json
  console.log("Updating tailwind.config.ts and tsconfig.json...");

  // Modifier le fichier tailwind.config.ts
  const modifyTailwindConfig = () => {
    const tailwindConfigPath = path.join(__dirname, "tailwind.config.ts");

    if (fs.existsSync(tailwindConfigPath)) {
      let tailwindConfig = fs.readFileSync(tailwindConfigPath, "utf8");

      // Modifier le tableau 'content'
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

  // Modifier le fichier tsconfig.json
  const modifyTsconfig = () => {
    const tsconfigPath = path.join(__dirname, "tsconfig.json");

    if (fs.existsSync(tsconfigPath)) {
      const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, "utf8"));

      // Ajouter les alias dans "paths"
      tsconfig.compilerOptions.paths = {
        "@components/*": ["./components/*"],
        "@containers/*": ["./containers/*"],
        "@types/*": ["./types/*"],
        "@app/*": ["./app/*"],
        ...tsconfig.compilerOptions.paths, // Conserver les autres chemins
      };

      // Écrire le fichier JSON modifié
      fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2));
      console.log("Modified tsconfig.json");
    } else {
      console.error("tsconfig.json not found");
    }
  };

  // Exécuter les modifications
  modifyTailwindConfig();
  modifyTsconfig();

  console.log("Boilerplate setup completed!");
  console.log(`cd ${projectName}`);
  console.log("You can now start the development server with 'npm run dev'");
  console.log("Enjoy coding!");
} catch (error) {
  console.error("Error:", error.message);
  process.exit(1);
}
