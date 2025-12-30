# Publishing to npm - Complete Guide

This guide will walk you through publishing your Richpanel n8n node to npm so users can install it via n8n's Community Nodes interface.

## Prerequisites

Before publishing, ensure you have:

- [ ] npm account (create at https://www.npmjs.com/signup)
- [ ] npm CLI installed (`npm --version` to check)
- [ ] Completed and tested your node
- [ ] All documentation ready

## Step 1: Create npm Account (if needed)

If you don't have an npm account:

```bash
# Visit https://www.npmjs.com/signup
# Or create via CLI:
npm adduser
```

## Step 2: Login to npm

```bash
npm login
```

Enter your:
- Username
- Password
- Email (this will be public)
- One-time password (if you have 2FA enabled)

Verify login:
```bash
npm whoami
```

## Step 3: Update package.json Metadata

Before publishing, update these fields in `package.json`:

```json
{
  "name": "n8n-nodes-richpanel",
  "version": "1.0.0",
  "description": "n8n community node for Richpanel customer support platform",
  "author": {
    "name": "Your Name",
    "email": "your.email@example.com"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/n8n-nodes-richpanel.git"
  },
  "homepage": "https://github.com/yourusername/n8n-nodes-richpanel#readme",
  "bugs": {
    "url": "https://github.com/yourusername/n8n-nodes-richpanel/issues"
  }
}
```

**Important naming convention:**
- Package name MUST start with `n8n-nodes-` for n8n to recognize it
- Use lowercase, hyphens only (no spaces or underscores)

## Step 4: Pre-publish Checklist

Run through this checklist:

```bash
# 1. Clean any previous builds
rm -rf dist node_modules package-lock.json

# 2. Fresh install of dependencies
npm install

# 3. Run linter
npm run lint

# 4. Fix any linting issues
npm run lintfix

# 5. Build the package
npm run build

# 6. Verify build output
ls -la dist/
# Should see:
# - dist/credentials/RichpanelApi.credentials.js
# - dist/nodes/Richpanel/Richpanel.node.js
# - dist/nodes/Richpanel/richpanel-logo.png
```

## Step 5: Test Package Contents

Before publishing, verify what will be included:

```bash
# Dry run - see what would be published
npm pack --dry-run

# Or create actual tarball for inspection
npm pack
# This creates: n8n-nodes-richpanel-1.0.0.tgz

# Extract and inspect
tar -xzf n8n-nodes-richpanel-1.0.0.tgz
ls -la package/

# Clean up test tarball
rm -rf package n8n-nodes-richpanel-1.0.0.tgz
```

## Step 6: Version Management

Choose your version number wisely (Semantic Versioning):
- **1.0.0** - First stable release
- **0.1.0** - Initial development release (safer for first publish)

Update version:
```bash
# Option 1: Manually edit package.json

# Option 2: Use npm version command
npm version 0.1.0  # For initial release
# or
npm version 1.0.0  # For stable release
```

## Step 7: Publish to npm

### First Time Publishing (Recommended: Start with beta)

```bash
# Publish as beta/preview first
npm publish --tag beta --access public
```

This publishes as version `1.0.0-beta` or with `@beta` tag, allowing testing before stable release.

### Publishing Stable Release

```bash
# Publish to npm (public package)
npm publish --access public
```

**Note:** The `--access public` flag is required for scoped packages or to ensure it's publicly accessible.

## Step 8: Verify Publication

1. **Check npm registry:**
   ```bash
   npm view n8n-nodes-richpanel
   ```

2. **Visit your package page:**
   ```
   https://www.npmjs.com/package/n8n-nodes-richpanel
   ```

3. **Test installation:**
   ```bash
   # In a test directory
   mkdir test-install && cd test-install
   npm install n8n-nodes-richpanel
   ls node_modules/n8n-nodes-richpanel/dist
   ```

## Step 9: Install in n8n

### Method 1: n8n Community Nodes UI (Easiest for users)

1. Open your n8n instance
2. Go to **Settings** → **Community Nodes**
3. Click **Install**
4. Enter: `n8n-nodes-richpanel`
5. Click **Install**
6. Restart n8n if needed

### Method 2: Docker

Add to your `docker-compose.yml`:

```yaml
version: '3.8'
services:
  n8n:
    image: n8nio/n8n
    environment:
      - N8N_COMMUNITY_PACKAGES_ENABLED=true
    volumes:
      - ~/.n8n:/home/node/.n8n
    command: >
      sh -c "npm install -g n8n-nodes-richpanel && n8n start"
```

### Method 3: npm Global Install

```bash
npm install -g n8n-nodes-richpanel
```

## Step 10: Post-Publication

### Update Documentation

Add installation badge to README.md:

```markdown
[![npm version](https://badge.fury.io/js/n8n-nodes-richpanel.svg)](https://www.npmjs.com/package/n8n-nodes-richpanel)
[![npm downloads](https://img.shields.io/npm/dm/n8n-nodes-richpanel.svg)](https://www.npmjs.com/package/n8n-nodes-richpanel)
```

### Create GitHub Release

1. Tag the release:
   ```bash
   git tag -a v1.0.0 -m "Release version 1.0.0"
   git push origin v1.0.0
   ```

2. Create release on GitHub with changelog

## Updating Your Package

When you make changes and want to publish updates:

```bash
# 1. Make your changes
# 2. Update version
npm version patch  # 1.0.0 -> 1.0.1 (bug fixes)
npm version minor  # 1.0.0 -> 1.1.0 (new features)
npm version major  # 1.0.0 -> 2.0.0 (breaking changes)

# 3. Build
npm run build

# 4. Publish
npm publish --access public

# 5. Push version tag to git
git push origin main --tags
```

## Troubleshooting

### Error: "Package name already exists"

- Choose a different name
- Or contact npm support if you believe you own the name

### Error: "You must verify your email"

```bash
# Check npm profile
npm profile get

# Request verification email
npm profile set email your@email.com
```

### Error: "403 Forbidden"

- Ensure you're logged in: `npm whoami`
- Check package name doesn't belong to someone else
- Add `--access public` flag

### Error: "ENEEDAUTH"

```bash
# Re-login
npm logout
npm login
```

### Package published but not showing in n8n

- Wait 5-10 minutes for npm registry to update
- Verify package.json has correct n8n configuration:
  ```json
  "n8n": {
    "n8nNodesApiVersion": 1,
    "credentials": ["dist/credentials/..."],
    "nodes": ["dist/nodes/..."]
  }
  ```
- Check package name starts with `n8n-nodes-`

## Unpublishing (Use with Caution!)

If you need to unpublish within 72 hours of publishing:

```bash
# Unpublish specific version
npm unpublish n8n-nodes-richpanel@1.0.0

# Unpublish entire package (within 72 hours only)
npm unpublish n8n-nodes-richpanel --force
```

**Warning:** After 72 hours, you cannot unpublish if your package has been downloaded. You can only deprecate:

```bash
npm deprecate n8n-nodes-richpanel@1.0.0 "This version has critical bugs. Please upgrade to 1.0.1"
```

## Best Practices

1. **Start with beta/alpha:**
   ```bash
   npm version 0.1.0-beta.1
   npm publish --tag beta --access public
   ```

2. **Test before publishing:**
   - Test locally using `npm link`
   - Test in actual n8n instance
   - Have someone else test if possible

3. **Semantic Versioning:**
   - Patch (1.0.x) - Bug fixes
   - Minor (1.x.0) - New features (backwards compatible)
   - Major (x.0.0) - Breaking changes

4. **Keep good changelog:**
   - Document all changes
   - Include breaking changes prominently
   - Link to issues/PRs

5. **Use .npmignore or files field:**
   - Already configured in package.json with `"files": ["dist"]`
   - Only distributes built files, not source

## Quick Command Reference

```bash
# Login
npm login

# Check what will be published
npm pack --dry-run

# Publish
npm publish --access public

# Update version
npm version patch|minor|major

# View package info
npm view n8n-nodes-richpanel

# Check who you're logged in as
npm whoami

# Logout
npm logout
```

## Support

- **npm documentation:** https://docs.npmjs.com/
- **n8n Community Nodes:** https://docs.n8n.io/integrations/community-nodes/
- **Semantic Versioning:** https://semver.org/

---

**Ready to publish?** Follow the steps above and your Richpanel node will be available to the entire n8n community! 🚀
