#!/bin/bash

# Get the script directory
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

if [ -z "$1" ]; then
  echo "Error: Please specify a project name."
  exit 1
fi

PROJECT_NAME=$1

echo "Creating project $PROJECT_NAME"

npx create-next-app@latest $PROJECT_NAME --typescript --eslint --tailwind --no-src-dir --app --no-import-alias
if [ $? -ne 0 ]; then
    echo "Failed to create Next.js project"
    exit 1
fi

cd $PROJECT_NAME

echo "Changing main branch to main"
git branch -M main

echo "Creating project folders"
COMPONENTS_DIR="components"
mkdir -p $COMPONENTS_DIR/common/site-header
mkdir -p $COMPONENTS_DIR/common/site-footer
mkdir -p $COMPONENTS_DIR/navigation/main-nav
mkdir -p $COMPONENTS_DIR/navigation/mobile-nav
mkdir -p $COMPONENTS_DIR/navigation/social-nav
mkdir -p $COMPONENTS_DIR/navigation/mobile-link
mkdir -p $COMPONENTS_DIR/common/theme-toggle
mkdir -p $COMPONENTS_DIR/providers

DATA_DIR="data"
mkdir -p $DATA_DIR

VSCODE_DIR=".vscode"
mkdir -p $VSCODE_DIR

echo "Resetting global.css"
echo "
@tailwind base;
@tailwind components;
@tailwind utilities;
" > app/globals.css

echo "Installing additional dependencies ..."

echo "Installing shadcn/ui and adding components"
npx shadcn@latest init -d
npx shadcn@latest add button
npx shadcn@latest add sheet
npx shadcn@latest add dropdown-menu

echo "Installing react-icons and next-themes"
npm i react-icons next-themes

echo "Installing ESLint and plugins"
npm i -D eslint eslint-plugin-tailwindcss @typescript-eslint/parser @eslint/js typescript-eslint

echo "Setting up ESLint configuration"
if [ -f ".eslintrc.json" ]; then
    mv .eslintrc.json .eslintrc.js
fi

# Copy the templates files
cp "$SCRIPT_DIR/../templates/.eslintrc.js" .eslintrc.js
cp "$SCRIPT_DIR/../templates/eslint.config.js" eslint.config.js

echo "Installing tailwind prettier"
npm i -D prettier prettier-plugin-tailwindcss
cp "$SCRIPT_DIR/../templates/.prettierrc" .prettierrc

echo "Setting up Husky hook and lint-staged"
npx husky-init && npm install
rm -rf .husky/pre-commit
npm install --save-dev lint-staged
npx husky add .husky/pre-commit  "npx lint-staged npm run lint"
cp "$SCRIPT_DIR/../templates/.lintstagedrc.json" .lintstagedrc.json

echo "Setting up commitlint and commitizen"
npm install --save-dev @commitlint/{config-conventional,cli}
cp "$SCRIPT_DIR/../templates/commitlint.config.js" commitlint.config.js
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
npm install --save-dev commitizen
npx commitizen init cz-conventional-changelog --save-dev --save-exact

echo "Setting up VSCode settings"
mkdir -p .vscode
cp "$SCRIPT_DIR/../templates/settings.json" .vscode/settings.json

echo "Updating package.json"
npx json -I -f package.json -e 'this.scripts["eslint"]="eslint ."'
npx json -I -f package.json -e 'this.scripts["eslint:debug"]="eslint --debug ."'
npx json -I -f package.json -e 'this.scripts["eslint:fix"]="eslint --fix ."'
npx json -I -f package.json -e 'this.scripts["format:write"]="prettier --write ."'
npx json -I -f package.json -e 'this.scripts["format:check"]="prettier --check ."'
npx json -I -f package.json -e 'this.scripts["prepare"]="husky"'

echo "Resetting fonts folder"
rm -rf app/fonts/*

echo "Copying components files"
cp -r "$SCRIPT_DIR/../components/"* $COMPONENTS_DIR
cp -r "$SCRIPT_DIR/../data/"* $DATA_DIR
cp -r "$SCRIPT_DIR/../fonts/"* app/fonts

echo "Refactoring layout.tsx and page.tsx"
cp "$SCRIPT_DIR/../app/layout.tsx" app/layout.tsx
cp "$SCRIPT_DIR/../app/page.tsx" app/page.tsx

echo "Updating tailwind.config.ts and tsconfig.json"
cp "$SCRIPT_DIR/modify-config.js" modify-config.js
node modify-config.js
rm -rf modify-config.js

git add .
git commit -m "chore: rekash boilerplate initial setup"

echo "Boilerplate setup completed!"
echo "cd $PROJECT_NAME"
echo "You can now start the development server with 'npm run dev'"
echo "Enjoy coding!"
