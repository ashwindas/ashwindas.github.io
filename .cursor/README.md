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

# Cursor Security Configuration

## Important: Remote Push Policy

This repository has been configured with special security measures to prevent accidental pushes to remote repositories.

## Key Security Features

- **Explicit Push Confirmation Required** - All git push operations require explicit confirmation before proceeding
- **Multiple Confirmation Layers** - Both Git hooks and Cursor-specific confirmations are in place
- **Visual Warnings** - Red highlighting and warning symbols in the UI remind you about the push policy
- **Terminal Environment Variables** - Push confirmation is enforced in terminal operations

## How It Works

When attempting to push to a remote repository, you will be prompted with:

1. A Git pre-push hook confirmation dialog
2. A Cursor-specific confirmation dialog
3. A final confirmation prompt requiring explicit permission statement

You must confirm all of these to proceed with the push.

## Files Implementing This Policy

- `.cursor/config.json` - Main configuration requiring explicit push confirmation
- `.cursor/hooks.json` - Hook configuration registering the pre-push scripts
- `.cursor/scripts/pre-push-confirm.js` - JavaScript confirmation script
- `.git/hooks/pre-push` - Git hook requiring test confirmation
- `.cursor/settings.json` - Visual indicators and environment variables

## DO NOT MODIFY THESE SETTINGS

These security measures are in place to protect the repository. Do not modify or disable these settings without authorization from the repository owner.

# Cursor Git Performance Optimization

This directory contains scripts to manually optimize Git performance when needed.

## Features

- On-demand repository optimization
- Garbage collection, pruning, and repacking
- Script can be executed manually when Git operations become slow

## Components

### Scripts

- `git-optimize.sh`: Performs Git garbage collection and repository optimization
- `pre-push-confirm.js`: Pre-push hook to run tests before pushing

### Configuration

- `config.json`: Contains Git command safety settings
- `hooks.json`: Configures hook scripts and their triggers

## How It Works

The Git optimization script performs several tasks to improve repository performance:

1. Garbage collection to clean up unnecessary files
2. Pruning of unreachable objects
3. Aggressive repacking to optimize storage
4. Repository integrity check

## Manual Optimization

You can run the optimization script at any time:

```bash
.cursor/scripts/git-optimize.sh
```

For more aggressive optimization (useful for very large repositories):

```bash
git gc --aggressive
```

## When to Use Optimization

Consider running Git optimization when:

1. Git commands are noticeably slow
2. After removing large files from the repository
3. After making significant changes to many files
4. Periodically (monthly) for actively developed repositories

## Troubleshooting

If Git commands are still slow after optimization:
1. Check if there are large files in your repository that should be ignored
2. Consider using Git LFS for large binary files
3. Review your `.gitignore` file to ensure build artifacts and large directories are excluded 