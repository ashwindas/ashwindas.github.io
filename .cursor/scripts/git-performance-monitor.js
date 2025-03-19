// Git Performance Monitor
// Monitors Git commands and triggers optimization when operations are slow

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const SLOW_THRESHOLD = 3000; // milliseconds
const COMMANDS_TO_MONITOR = ['status', 'pull', 'push', 'fetch', 'diff', 'log'];
const OPTIMIZATION_SCRIPT = path.join(__dirname, './git-optimize.sh');
const STATS_FILE = path.join(__dirname, '../git-performance-stats.json');

// Initialize stats file if it doesn't exist
if (!fs.existsSync(STATS_FILE)) {
  const initialStats = {
    slowOperations: [],
    lastOptimization: null
  };
  fs.writeFileSync(STATS_FILE, JSON.stringify(initialStats, null, 2));
}

// Load stats
function loadStats() {
  try {
    return JSON.parse(fs.readFileSync(STATS_FILE, 'utf8'));
  } catch (error) {
    console.error('Error loading performance stats:', error);
    return { slowOperations: [], lastOptimization: null };
  }
}

// Save stats
function saveStats(stats) {
  try {
    fs.writeFileSync(STATS_FILE, JSON.stringify(stats, null, 2));
  } catch (error) {
    console.error('Error saving performance stats:', error);
  }
}

// Check if optimization is needed
function isOptimizationNeeded(stats) {
  // If we have 3+ slow operations without optimization
  if (stats.slowOperations.length >= 3) {
    if (!stats.lastOptimization) return true;
    
    // If last optimization was more than a day ago
    const lastOpt = new Date(stats.lastOptimization);
    const now = new Date();
    const oneDayMs = 24 * 60 * 60 * 1000;
    if ((now - lastOpt) > oneDayMs) return true;
  }
  return false;
}

// Run Git optimization
function runOptimization() {
  console.log('\n🔧 Git operations seem slow. Running repository optimization...');
  
  const optimize = spawn('sh', [OPTIMIZATION_SCRIPT], { stdio: 'inherit' });
  
  return new Promise((resolve, reject) => {
    optimize.on('close', (code) => {
      if (code === 0) {
        console.log('✅ Optimization completed successfully!');
        
        // Update stats
        const stats = loadStats();
        stats.slowOperations = [];
        stats.lastOptimization = new Date().toISOString();
        saveStats(stats);
        
        resolve();
      } else {
        console.error(`❌ Optimization failed with code ${code}`);
        reject();
      }
    });
  });
}

// Monitor Git command performance
function monitorGitCommand(command) {
  // Extract the Git subcommand
  const gitCmd = command.split(' ')[1];
  
  // Only monitor specific commands
  if (!COMMANDS_TO_MONITOR.includes(gitCmd)) {
    return;
  }
  
  const startTime = Date.now();
  console.log(`⏱️ Monitoring Git ${gitCmd} performance...`);
  
  // Record end time and duration
  const recordPerformance = () => {
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    if (duration > SLOW_THRESHOLD) {
      console.log(`⚠️ Slow Git operation detected: ${gitCmd} took ${duration}ms`);
      
      // Update stats
      const stats = loadStats();
      stats.slowOperations.push({
        command: gitCmd,
        duration: duration,
        timestamp: new Date().toISOString()
      });
      saveStats(stats);
      
      // Check if optimization is needed
      if (isOptimizationNeeded(stats)) {
        return runOptimization();
      }
    }
    return Promise.resolve();
  };
  
  // In a real pre-hook scenario, we'd wrap the actual command execution
  // but for this connector script, we just return the timer function
  return recordPerformance;
}

module.exports = {
  monitorGitCommand,
  runOptimization
}; 