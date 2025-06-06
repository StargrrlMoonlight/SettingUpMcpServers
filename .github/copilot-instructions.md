# Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

This is a React todo-list web application built with Vite. The design should maintain:

- Neutral light color palette for an exclusive, high-end aesthetic
- Dark classical fonts for headlines and important text
- Clean, minimalist design principles
- Modern UI components with subtle shadows and elegant spacing
- Responsive design that works on desktop and mobile

## Styling Guidelines

- Use a neutral color palette with light grays, off-whites, and subtle warm tones
- Implement dark, classical fonts (like serif or elegant sans-serif) for headlines
- Maintain consistent spacing and typography hierarchy
- Use subtle animations and transitions for a polished feel
- Ensure proper contrast ratios for accessibility

## Technical Stack

- React with functional components and hooks
- Vite for build tooling
- CSS Modules or styled-components for styling
- Local state management for todo items
- Responsive design with mobile-first approach

## Repository Information

- **GitHub Repository:** StargrrlMoonlight/SettingUpMcpServers
- **Project Type:** React Todo-List Application Tutorial
- **Local Path:** /Users/moonlight/Documents/Projects/Tutorials/SettingUpMcpServers
- **Active Issues:** Check GitHub issues for current development tasks and feature requests

## Development Workflow

### 🤖 AI Agent Workflow Requirements
**CRITICAL: ALL AI agents (including GitHub Copilot, Claude, etc.) MUST follow this exact process:**

1. **STEP 1: Create GitHub Issue FIRST**
   - Before making ANY code changes
   - Before creating ANY branches
   - Use descriptive titles with appropriate emojis
   - Include acceptance criteria and technical details

2. **STEP 2: Create Feature Branch**
   - Use naming convention: `feature/issue-{number}-{short-description}`
   - Branch from main/master branch
   - NEVER work directly on main branch

3. **STEP 3: Make Code Changes**
   - Only after completing steps 1 and 2
   - Follow all styling and technical guidelines

4. **STEP 4: Submit Pull Request**
   - Reference the GitHub issue (e.g., "Closes #57")
   - Assign GitHub Copilot as reviewer
   - Include screenshots for UI changes

5. **STEP 5: Automated Release Process**
   - After PR merge to main branch, automated release process begins
   - Semantic versioning based on conventional commit messages
   - GitHub release creation with changelog and artifacts
   - No manual intervention required for standard releases

**❌ VIOLATIONS THAT ARE NEVER ACCEPTABLE:**
- Making changes directly to main branch
- Creating code without a corresponding GitHub issue
- Skipping the branch creation step
- Working without following the established workflow

### Automated Release Management
This repository features sophisticated automated release management that AI agents should understand:

#### Semantic Versioning Logic
- **Major Version (v2.0.0)**: `BREAKING CHANGE` or `feat!` commits
- **Minor Version (v1.1.0)**: `feat` or `feature` commits  
- **Patch Version (v1.0.1)**: `fix`, `docs`, `style`, `chore`, etc.

#### Release Automation Features
- ✅ **Automatic Version Calculation** - Based on conventional commit analysis since last tag
- ✅ **GitHub Release Creation** - With detailed changelog and downloadable artifacts
- ✅ **Coverage Integration** - Test coverage percentage included in release notes
- ✅ **Artifact Packaging** - Built application bundled as .tar.gz and .zip files
- ✅ **Branch Protection Integration** - Uses PAT for automated version bumps
- ✅ **Live Demo Links** - Automatic GitHub Pages deployment URLs

#### AI Agent Release Guidelines
**DO:**
- ✅ Use conventional commit messages to control version bumping
- ✅ Include "BREAKING CHANGE" in commit body for major versions
- ✅ Let the automation handle release creation after PR merge
- ✅ Reference the automated release process in PR descriptions

**DON'T:**
- ❌ Manually create GitHub releases (automation handles this)
- ❌ Manually update version numbers in package.json
- ❌ Skip conventional commit message format
- ❌ Create releases from feature branches

### Issue-Driven Development
- **Always create a GitHub issue first** before starting any new feature or bug fix
- Every pull request must reference a corresponding GitHub issue
- Use descriptive issue titles with emojis for visual categorization
- Include detailed acceptance criteria and technical considerations in issues

### Branch Management
- **Always create a new feature branch** when implementing GitHub issues
- Branch naming convention: `feature/issue-{number}-{short-description}`
  - Example: `feature/issue-5-drag-drop-reordering`
  - Example: `feature/issue-3-due-dates-priority`
- Never work directly on the main branch
- Delete feature branches after successful merge

## 📋 Pre-Work Checklist for AI Agents

Before making ANY changes to this repository, AI agents must complete this checklist:

- [ ] ✅ Have I created a GitHub issue for this work?
- [ ] ✅ Have I created a feature branch using the correct naming convention?
- [ ] ✅ Am I working on the feature branch (NOT main branch)?
- [ ] ✅ Does my work reference the GitHub issue number?
- [ ] ✅ Have I followed all styling and technical guidelines?
- [ ] ✅ Am I using conventional commit messages for proper version control?
- [ ] ✅ Do I understand that releases are automated after PR merge?

**If ANY box is unchecked, STOP and complete the missing steps before proceeding.**
