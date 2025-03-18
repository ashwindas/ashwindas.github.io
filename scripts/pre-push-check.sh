#!/bin/bash

# Script to check before pushing to GitHub
# This can be installed as a git hook using:
# cp scripts/pre-push-check.sh .git/hooks/pre-push && chmod +x .git/hooks/pre-push

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
echo -e ""
echo -e "If you're using a tool or script that automatically pushes, please disable this"
echo -e "functionality until you have explicit permission to push."
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