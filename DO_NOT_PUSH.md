# IMPORTANT: DO NOT PUSH TO GITHUB WITHOUT EXPLICIT PERMISSION

This is a reminder file to ensure that code is not pushed to GitHub repositories without explicit user permission.

## Guidelines:

1. **DO NOT** run `git push` commands of any kind unless specifically requested
2. **DO NOT** set up any automatic pushing in scripts or workflows
3. **ALWAYS** check with the repository owner before pushing any changes

## Safe Commands:

These git commands are safe to use without pushing:
- `git add` - stage changes
- `git commit` - commit changes locally
- `git status` - check current state
- `git diff` - see differences
- `git log` - view commit history

## When Ready to Push:

Wait for explicit instructions like:
- "Push these changes to GitHub"
- "Now you can push to the repository"
- "Please push this commit"

## Reminders for Workflows:

If creating GitHub Actions or CI/CD workflows, make sure to get approval first, as these may automatically push or deploy changes. 