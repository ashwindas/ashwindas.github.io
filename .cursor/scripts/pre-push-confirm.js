#!/usr/bin/env node

/**
 * Cursor pre-push confirmation script
 * This script will run before any push operation and require explicit confirmation
 */

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// ANSI color codes for terminal output
const colors = {
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  green: '\x1b[32m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

console.log(`${colors.red}===========================================================`);
console.log(`${colors.bold}${colors.red}       ⚠️  CURSOR SAFETY CHECK: REMOTE PUSH  ⚠️       `);
console.log(`${colors.red}===========================================================${colors.reset}`);
console.log();
console.log(`${colors.yellow}You are attempting to push to a remote repository.`);
console.log(`This operation will upload your changes to the remote server.`);
console.log(`Pushing should ONLY be done with explicit permission.`);
console.log();
console.log(`${colors.red}Repository: ${process.env.CURSOR_REPO_NAME || 'Unknown'}`);
console.log(`Branch: ${process.env.CURSOR_BRANCH_NAME || 'Unknown'}${colors.reset}`);
console.log();

rl.question(`${colors.bold}Do you have explicit permission to push to this remote repository? (yes/no): ${colors.reset}`, (answer) => {
  if (answer.toLowerCase() !== 'yes') {
    console.log(`${colors.red}Push aborted. You must have explicit permission to push to remote.${colors.reset}`);
    process.exit(1);
  }
  
  console.log(`${colors.green}Confirmation received. Proceeding with push...${colors.reset}`);
  rl.close();
  process.exit(0);
}); 