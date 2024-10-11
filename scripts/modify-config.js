const fs = require("fs");
const path = require("path");

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
