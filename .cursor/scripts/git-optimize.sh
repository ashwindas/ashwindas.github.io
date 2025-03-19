#!/bin/bash

# git-optimize.sh
# Script to automatically optimize Git repository when operations are slow
# This script will be called by Cursor when Git operations are detected to be slow

# Set colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Git operation taking longer than expected. Running repository optimization...${NC}"

# Check if we're in a git repository
if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
  echo -e "${RED}Not in a Git repository. Exiting.${NC}"
  exit 1
fi

echo -e "${YELLOW}Running Git garbage collection...${NC}"
git gc --auto --quiet

echo -e "${YELLOW}Pruning unreachable objects...${NC}"
git prune --expire=now

echo -e "${YELLOW}Running aggressive repacking...${NC}"
git repack -Ad --quiet

echo -e "${YELLOW}Checking for and cleaning up corrupted objects...${NC}"
git fsck --quiet

echo -e "${GREEN}Git repository optimization complete!${NC}"
echo -e "${YELLOW}Tip: Consider running 'git gc --aggressive' manually if operations are still slow.${NC}" 