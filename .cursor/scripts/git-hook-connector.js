#!/usr/bin/env node
// Git Hook Connector for Cursor
// This script acts as a bridge between Cursor hooks and Git operations

const { monitorGitCommand } = require('./git-performance-monitor');
const fs = require('fs');
const path = require('path');

// Get the Git command from arguments
const args = process.argv.slice(2);
const command = args.join(' ');

// Configuration
const CONFIG_FILE = path.join(__dirname, '../config.json');
let config = {
  git: {
    performance: {
      slowOperationThreshold: 3000,
      autoOptimize: true,
      monitorCommands: ["status", "pull", "push", "fetch", "diff", "log"]
    }
  }
};

// Load configuration
try {
  if (fs.existsSync(CONFIG_FILE)) {
    const configData = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
    config = Object.assign({}, config, configData);
  }
} catch (err) {
  console.error('Error loading config file:', err);
}

// Check if the command is a git command
if (command.startsWith('git ')) {
  const gitCmd = command.split(' ')[1];
  
  // Check if we should monitor this command
  if (config.git.performance.monitorCommands.includes(gitCmd)) {
    console.log(`Monitoring Git command: ${command}`);
    
    // Run the command and monitor performance
    const result = monitorGitCommand(command);
    
    // We don't actually execute the command here since this is a pre-hook
    // The actual command will be run by Cursor after this script completes
  }
}

// Always exit with success to allow the command to proceed
process.exit(0); 