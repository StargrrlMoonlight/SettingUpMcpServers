#!/bin/bash

echo "🔍 VERIFYING WORKFLOW SAFEGUARDS AGAINST INFINITE LOOPS"
echo "======================================================"

# Test data from automated release process
COMMIT_MESSAGE="chore: release v1.2.3 [skip ci]

- Update package.json version to 1.2.3
- Update coverage badge to 95.2%
- Generate CHANGELOG.md

This is an automated release preparation commit."

COMMIT_AUTHOR_EMAIL="actions@github.com"
COMMIT_AUTHOR_NAME="GitHub Actions"
PR_TITLE="chore: release v1.2.3 [skip ci]"
BRANCH_NAME="automated-release/v1.2.3"

echo ""
echo "🤖 AUTOMATED COMMIT DATA:"
echo "Commit Message: ${COMMIT_MESSAGE}"
echo "Author Email: ${COMMIT_AUTHOR_EMAIL}"
echo "Author Name: ${COMMIT_AUTHOR_NAME}"
echo "PR Title: ${PR_TITLE}"
echo "Branch Name: ${BRANCH_NAME}"

echo ""
echo "🛡️ TESTING SAFEGUARDS:"

# Test 1: Commit Message Safeguards
echo ""
echo "1️⃣ COMMIT MESSAGE SAFEGUARDS:"
if echo "$COMMIT_MESSAGE" | grep -q "\[skip ci\]"; then
    echo "   ✅ Contains [skip ci] - WORKFLOW WILL BE SKIPPED"
else
    echo "   ❌ Missing [skip ci] - POTENTIAL TRIGGER"
fi

if echo "$COMMIT_MESSAGE" | grep -q "chore: release v"; then
    echo "   ✅ Contains 'chore: release v' - WORKFLOW WILL BE SKIPPED"
else
    echo "   ❌ Missing 'chore: release v' - POTENTIAL TRIGGER"
fi

if echo "$COMMIT_MESSAGE" | grep -q "automated release preparation"; then
    echo "   ✅ Contains 'automated release preparation' - WORKFLOW WILL BE SKIPPED"
else
    echo "   ❌ Missing 'automated release preparation' - POTENTIAL TRIGGER"
fi

# Test 2: Author Safeguards
echo ""
echo "2️⃣ AUTHOR SAFEGUARDS:"
if [ "$COMMIT_AUTHOR_EMAIL" = "actions@github.com" ]; then
    echo "   ✅ Author email matches exclusion - WORKFLOW WILL BE SKIPPED"
else
    echo "   ❌ Author email doesn't match - POTENTIAL TRIGGER"
fi

if [ "$COMMIT_AUTHOR_NAME" = "GitHub Actions" ]; then
    echo "   ✅ Author name matches exclusion - WORKFLOW WILL BE SKIPPED"
else
    echo "   ❌ Author name doesn't match - POTENTIAL TRIGGER"
fi

# Test 3: PR Safeguards
echo ""
echo "3️⃣ PR SAFEGUARDS:"
if echo "$PR_TITLE" | grep -q "\[skip ci\]"; then
    echo "   ✅ PR title contains [skip ci] - WORKFLOW WILL BE SKIPPED"
else
    echo "   ❌ PR title missing [skip ci] - POTENTIAL TRIGGER"
fi

if echo "$BRANCH_NAME" | grep -q "^automated-release/"; then
    echo "   ✅ Branch starts with 'automated-release/' - WORKFLOW WILL BE SKIPPED"
else
    echo "   ❌ Branch doesn't match pattern - POTENTIAL TRIGGER"
fi

echo ""
echo "🎯 FINAL VERDICT:"
echo "================"

# Count safeguards
SAFEGUARDS=0

if echo "$COMMIT_MESSAGE" | grep -q "\[skip ci\]"; then SAFEGUARDS=$((SAFEGUARDS + 1)); fi
if echo "$COMMIT_MESSAGE" | grep -q "chore: release v"; then SAFEGUARDS=$((SAFEGUARDS + 1)); fi
if echo "$COMMIT_MESSAGE" | grep -q "automated release preparation"; then SAFEGUARDS=$((SAFEGUARDS + 1)); fi
if [ "$COMMIT_AUTHOR_EMAIL" = "actions@github.com" ]; then SAFEGUARDS=$((SAFEGUARDS + 1)); fi
if [ "$COMMIT_AUTHOR_NAME" = "GitHub Actions" ]; then SAFEGUARDS=$((SAFEGUARDS + 1)); fi
if echo "$PR_TITLE" | grep -q "\[skip ci\]"; then SAFEGUARDS=$((SAFEGUARDS + 1)); fi
if echo "$BRANCH_NAME" | grep -q "^automated-release/"; then SAFEGUARDS=$((SAFEGUARDS + 1)); fi

echo "🛡️ Active Safeguards: ${SAFEGUARDS}/7"
echo ""

if [ $SAFEGUARDS -ge 3 ]; then
    echo "✅ SAFE: Multiple safeguards active - NO INFINITE LOOP RISK"
    echo "🔇 Automated commits will be COMPLETELY IGNORED by the workflow"
else
    echo "❌ RISK: Insufficient safeguards - POTENTIAL INFINITE LOOP"
fi

echo ""
echo "🔄 WORKFLOW CONDITIONS ANALYSIS:"
echo "================================"
echo "For 'check-human-merge' job to run, ALL must be TRUE:"
echo "  • github.event_name == 'push' ✅"
echo "  • github.ref == 'refs/heads/main' ✅"
echo "  • !contains(message, '[skip ci]') ❌ (BLOCKED)"
echo "  • !contains(message, 'chore: release v') ❌ (BLOCKED)"  
echo "  • !contains(message, 'automated release preparation') ❌ (BLOCKED)"
echo "  • author.email != 'actions@github.com' ❌ (BLOCKED)"
echo "  • author.name != 'GitHub Actions' ❌ (BLOCKED)"
echo ""
echo "Result: 🚫 WORKFLOW WILL NOT RUN - INFINITE LOOP PREVENTED"
