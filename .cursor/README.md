# Cursor Configuration

This directory contains configuration files for the Cursor IDE and AI assistants.

## Settings

The `settings.json` file contains repository-specific settings and preferences for this project. Key configurations:

- **Deployment Preferences**: 
  - `requireExplicitPush: true` - Do not push to GitHub until explicitly requested
  - `autoDeployDisabled: true` - Automatic deployment workflows should not be triggered

## Important Notes

- All git pushes should be manually approved
- The site should be built locally before considering deployment
- Contact available via the website contact button

## Deployment Process (For Reference Only)

1. Build the site: `npm run build:clean`
2. Add changes: `git add .`
3. Commit changes: `git commit -m "Your commit message"`
4. When ready and **explicitly requested**:
   - Push to main: `git push origin main`
   - Push to gh-pages: `git push -f origin $(git subtree split --prefix out main):gh-pages`

This configuration is intended to prevent accidental deployments to the live site. 