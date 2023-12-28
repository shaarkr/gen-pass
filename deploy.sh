#!/bin/bash

# Build the React app
yarn build

# Create an orphan branch (gh-pages) to store the deployment
git checkout --orphan gh-pages

# Remove all files except the build folder
git rm -rf .
git add -f build
git mv build/* .
git commit -m "Deploy to GitHub Pages"

# Push changes to the gh-pages branch
git push origin gh-pages --force

# Switch back to the master branch
git checkout master
