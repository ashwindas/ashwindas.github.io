# Setting Up Push Prevention

This repository includes tools to help prevent accidental pushes to GitHub without explicit permission.

## Installing the Pre-Push Hook

To install the pre-push hook that will warn you before any push:

```bash
# Create the hooks directory if it doesn't exist
mkdir -p .git/hooks

# Copy the pre-push script
cp scripts/pre-push-check.sh .git/hooks/pre-push

# Make it executable
chmod +x .git/hooks/pre-push
```

## What This Does

Once installed, this hook will:

1. Intercept any `git push` command
2. Display a warning message
3. Ask for confirmation that you have explicit permission to push
4. Only allow the push to proceed if you confirm with "yes"

## Other Safeguards

Additional reminders have been added to:

1. `test.sh` - Test script 
2. `deploy.sh` - Deployment script
3. GitHub Actions workflow file (commented out by default)
4. `DO_NOT_PUSH.md` - General guidelines file

## Manual Setup

If you prefer to create the hook manually, add this content to `.git/hooks/pre-push`:

```bash
#!/bin/bash

# Colors for output
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${RED}================================================================================${NC}"
echo -e "${RED}                         ⚠️  WARNING: PUSH ATTEMPT  ⚠️                          ${NC}"
echo -e "${RED}================================================================================${NC}"
echo -e "${YELLOW}"
echo -e "You are attempting to push to the GitHub repository."
echo -e "Please verify that you have explicit permission to do this."
echo -e "${NC}"
echo -e "${RED}================================================================================${NC}"

# Ask for confirmation
read -p "Do you have explicit permission to push? (yes/no): " answer

if [[ "$answer" != "yes" ]]; then
  echo -e "${RED}Push aborted. Please get explicit permission before pushing.${NC}"
  exit 1
fi

echo -e "${YELLOW}Proceeding with push as you've confirmed you have permission.${NC}"
exit 0
```

Then make it executable:

```bash
chmod +x .git/hooks/pre-push
```