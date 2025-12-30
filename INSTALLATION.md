# Installation & Testing Guide

Complete guide for installing and testing the Richpanel n8n integration.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Installation Options](#installation-options)
3. [Build & Development](#build--development)
4. [Testing](#testing)
5. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before installing, ensure you have:

- ✅ n8n installed (version ≥ 0.187.0)
- ✅ Node.js (version compatible with your n8n installation)
- ✅ npm or yarn package manager
- ✅ Richpanel account with API access
- ✅ Richpanel API key (from Settings → Integrations → API Keys)

### Check Your n8n Version

```bash
n8n --version
```

---

## Installation Options

### Option 1: Install via npm (Recommended for Production)

If this package is published to npm:

```bash
# Install globally for global n8n installation
npm install -g n8n-nodes-richpanel

# Or install locally in your n8n project
cd ~/.n8n/nodes  # or your custom nodes directory
npm install n8n-nodes-richpanel
```

### Option 2: n8n Community Nodes UI

1. Open your n8n instance in a browser
2. Go to **Settings** → **Community Nodes**
3. Click **Install a community node**
4. Enter: `n8n-nodes-richpanel`
5. Click **Install**
6. Wait for installation to complete
7. Restart n8n if required

### Option 3: Local Development Installation

For development or testing from source:

```bash
# Clone or navigate to this directory
cd /Users/tristan/richpanel-n8n

# Install dependencies
npm install

# Build the project
npm run build

# Link to your n8n installation
npm link

# In your n8n custom nodes directory
cd ~/.n8n/custom
npm link n8n-nodes-richpanel
```

### Option 4: Docker Installation

If using n8n with Docker:

1. **Create a custom Dockerfile:**

```dockerfile
FROM n8nio/n8n:latest

USER root
RUN npm install -g n8n-nodes-richpanel
USER node
```

2. **Or mount as volume:**

```yaml
# docker-compose.yml
version: '3.8'
services:
  n8n:
    image: n8nio/n8n
    volumes:
      - ./richpanel-n8n:/home/node/.n8n/custom/n8n-nodes-richpanel
    environment:
      - N8N_CUSTOM_EXTENSIONS=/home/node/.n8n/custom
```

---

## Build & Development

### Initial Setup

```bash
# Install dependencies
npm install

# Build the project
npm run build
```

### Development Mode

```bash
# Watch mode - automatically rebuild on changes
npm run dev
```

### Build Output

After building, check the `dist/` directory:

```bash
ls -la dist/
# Should contain:
# - credentials/RichpanelApi.credentials.js
# - nodes/Richpanel/Richpanel.node.js
# - nodes/Richpanel/richpanel.svg
```

### Code Quality

```bash
# Run linter
npm run lint

# Fix linting issues automatically
npm run lintfix

# Format code with Prettier
npm run format
```

---

## Testing

### 1. Verify Installation

After installation, verify the node appears in n8n:

1. Open n8n
2. Create a new workflow
3. Click the **+** button to add a node
4. Search for "Richpanel"
5. The Richpanel node should appear in the results

### 2. Test Credentials

1. Add a Richpanel node to a workflow
2. Click on **Credential to connect with**
3. Click **Create New Credential**
4. Select **Richpanel API**
5. Enter your API key
6. Click **Test** button
7. Should show success message

### 3. Manual Test Workflows

#### Test 1: List Users (Simple GET)

1. Add **Manual Trigger** node
2. Add **Richpanel** node:
   - Resource: User
   - Operation: Get Many
3. Execute workflow
4. Verify it returns list of users

#### Test 2: Create Customer (Simple POST)

1. Add **Manual Trigger** node
2. Add **Richpanel** node:
   - Resource: Customer
   - Operation: Create or Update
   - Customer Fields:
     - First Name: `Test`
     - Last Name: `User`
     - Email: `test@example.com`
3. Execute workflow
4. Verify customer is created in Richpanel

#### Test 3: Create Conversation (Complex POST)

1. Add **Manual Trigger** node
2. Add **Richpanel** node:
   - Resource: Conversation
   - Operation: Create
   - Message Body: `This is a test ticket`
   - Channel: Email
   - From: `customer@example.com`
   - To: `support@yourcompany.com`
   - Additional Fields:
     - Status: Open
     - Priority: Low
3. Execute workflow
4. Check Richpanel dashboard for new ticket

### 4. Import Example Workflows

```bash
# In n8n UI
# 1. Click "Import from File"
# 2. Select: examples/create-ticket-from-email.json
# 3. Configure credentials
# 4. Execute to test
```

### 5. Test Error Handling

#### Test Invalid Credentials
1. Create workflow with Richpanel node
2. Use invalid API key
3. Execute workflow
4. Should show authentication error

#### Test Invalid Data
1. Create conversation without required fields
2. Should show validation error

#### Test Rate Limiting
1. Create workflow with loop
2. Make >100 requests per minute
3. Should show rate limit error

---

## Verification Checklist

Use this checklist to verify installation:

- [ ] Node appears in n8n node list
- [ ] Credentials can be created
- [ ] Credentials test passes
- [ ] Can list users successfully
- [ ] Can create customer
- [ ] Can create conversation
- [ ] Can update conversation
- [ ] Can add tags to conversation
- [ ] Can create order
- [ ] Error messages are clear
- [ ] Icon displays correctly
- [ ] All operations show in dropdown
- [ ] Help text is visible

---

## Troubleshooting

### Node Not Appearing in n8n

**Symptom**: Can't find Richpanel in node list

**Solutions**:
1. Restart n8n: `systemctl restart n8n` or restart Docker container
2. Clear n8n cache: `rm -rf ~/.n8n/cache`
3. Verify build: `ls dist/nodes/Richpanel/`
4. Check n8n logs for errors

### Build Errors

**Symptom**: `npm run build` fails

**Solutions**:
1. Delete `node_modules` and `package-lock.json`
2. Run `npm install` again
3. Ensure TypeScript is installed: `npm install -D typescript`
4. Check Node.js version compatibility

### Credential Test Fails

**Symptom**: "Test" button shows error

**Solutions**:
1. Verify API key is correct (no extra spaces)
2. Check Richpanel account is active
3. Verify API access is enabled in Richpanel
4. Check network connectivity to `api.richpanel.com`

### Runtime Errors

**Symptom**: Node executes but returns errors

**Solutions**:

1. **Authentication Error**:
   - Regenerate API key in Richpanel
   - Update credentials in n8n

2. **Rate Limit Error**:
   - Add Wait node between operations
   - Reduce request frequency

3. **Invalid Request**:
   - Check all required fields are provided
   - Verify data types (string vs number)
   - Check JSON fields have valid JSON

### Development Issues

**Symptom**: Changes not reflected after rebuild

**Solutions**:
1. Stop n8n
2. Run `npm run build`
3. Clear n8n cache: `rm -rf ~/.n8n/cache`
4. Restart n8n

### Docker Issues

**Symptom**: Node not available in Docker container

**Solutions**:
1. Verify volume mount: `docker exec <container> ls /home/node/.n8n/custom`
2. Check permissions: `chown -R node:node /path/to/richpanel-n8n`
3. Rebuild image if using custom Dockerfile

---

## Development Workflow

### Making Changes

1. Edit source files in `credentials/` or `nodes/`
2. Run `npm run build`
3. Restart n8n
4. Test changes
5. Run `npm run lint` before committing

### Adding New Operations

1. Edit `nodes/Richpanel/Richpanel.node.ts`
2. Add operation to properties array
3. Add handler function
4. Build and test
5. Update documentation

### Testing Locally

```bash
# Terminal 1: Watch mode
npm run dev

# Terminal 2: Run n8n
n8n start

# Make changes → Build auto-runs → Restart n8n → Test
```

---

## Next Steps

After successful installation:

1. ✅ Read [QUICKSTART.md](QUICKSTART.md) for usage examples
2. ✅ Import example workflows from `examples/`
3. ✅ Review [README.md](README.md) for full documentation
4. ✅ Join [n8n community](https://community.n8n.io/) for support
5. ✅ Check [Richpanel API docs](https://developer.richpanel.com/reference)

---

## Getting Help

If you encounter issues:

1. Check this troubleshooting guide
2. Review n8n logs: `~/.n8n/logs/` or `docker logs <container>`
3. Search [n8n community forum](https://community.n8n.io/)
4. Check [Richpanel API status](https://status.richpanel.com/)
5. Open an issue on GitHub with:
   - n8n version
   - Error message
   - Steps to reproduce
   - Relevant logs

---

## Uninstallation

### Remove from npm

```bash
npm uninstall n8n-nodes-richpanel
```

### Remove from n8n Community Nodes

1. Go to **Settings** → **Community Nodes**
2. Find **n8n-nodes-richpanel**
3. Click **Uninstall**

### Remove Development Installation

```bash
# Unlink from n8n
cd ~/.n8n/custom
npm unlink n8n-nodes-richpanel

# Unlink from source
cd /Users/tristan/richpanel-n8n
npm unlink
```

---

**Installation Complete!** 🎉

You're now ready to automate your Richpanel workflows with n8n.
