# Personal Access Token (PAT) Setup Guide

## Why is a PAT Required?

This repository uses branch protection rules that require pull requests for changes to the `main` branch. However, our automated CI/CD workflow needs to make direct commits for:

- **Version bumps** after creating releases
- **Coverage badge updates** on feature branches

A Personal Access Token (PAT) with appropriate permissions allows the workflow to bypass branch protection rules for these automated operations.

## Setup Instructions

### Step 1: Create a Personal Access Token

1. **Navigate to GitHub Settings:**
   - Go to [GitHub Settings](https://github.com/settings)
   - Click "Developer settings" in the left sidebar
   - Click "Personal access tokens" → "Tokens (classic)"

2. **Generate New Token:**
   - Click "Generate new token" → "Generate new token (classic)"
   - Give it a descriptive name: `SettingUpMcpServers Release Automation`
   - Set expiration (recommended: 1 year, then set calendar reminder to renew)

3. **Select Required Scopes:**
   - ✅ `repo` (Full control of private repositories)
   - ✅ `workflow` (Update GitHub Action workflows)

4. **Generate and Copy Token:**
   - Click "Generate token"
   - **IMMEDIATELY COPY THE TOKEN** - you won't see it again!

### Step 2: Add Token as Repository Secret

1. **Navigate to Repository Settings:**
   - Go to your repository
   - Click "Settings" tab
   - Click "Secrets and variables" → "Actions"

2. **Add New Secret:**
   - Click "New repository secret"
   - **Name:** `RELEASE_PAT`
   - **Secret:** Paste the token you copied
   - Click "Add secret"

### Step 3: Verify Setup

After adding the secret, the next time you:
- Create a release (main branch push)
- Update coverage on a feature branch

The workflow should successfully bypass branch protection rules.

## Security Considerations

- **Token Scope:** The PAT has `repo` access, so it should be treated as highly sensitive
- **Expiration:** Set an expiration date and renew regularly
- **Access:** Only repository owners/admins should have access to this PAT
- **Monitoring:** Review repository activity logs for any unexpected usage

## Troubleshooting

### Common Issues

1. **"Context access might be invalid: RELEASE_PAT" warnings in VS Code:**
   - This is normal - VS Code linter doesn't know about repository secrets
   - The workflow will work correctly when the secret is properly configured

2. **Still getting branch protection errors:**
   - Verify the secret name is exactly `RELEASE_PAT`
   - Ensure the PAT has `repo` and `workflow` scopes
   - Check that the PAT hasn't expired

3. **Token not working:**
   - Regenerate the PAT if it's old
   - Ensure you're using a "classic" token, not fine-grained
   - Verify the token owner has admin access to the repository

## Workflow Integration

The workflow automatically uses the PAT in two places:

1. **Coverage Badge Updates** (feature branches):
   ```yaml
   TOKEN="${{ secrets.RELEASE_PAT || secrets.GITHUB_TOKEN }}"
   git push https://x-access-token:$TOKEN@github.com/...
   ```

2. **Version Bumps** (main branch, after releases):
   ```yaml
   git push https://x-access-token:${{ secrets.RELEASE_PAT }}@github.com/...
   ```

The workflow includes fallback logic to use the default `GITHUB_TOKEN` if `RELEASE_PAT` is not available, ensuring the workflow doesn't break during setup.
