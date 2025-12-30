# Example Workflows

This directory contains example n8n workflows that demonstrate how to use the Richpanel node.

## Available Examples

### 1. create-ticket-from-email.json
Creates a support ticket in Richpanel from email data.

**Use Case**: Automatically convert customer emails into support tickets

**Demonstrates**:
- Creating conversations
- Setting priority and status
- Adding customer profile information
- Email channel configuration

**How to Use**:
1. Import this workflow into n8n
2. Configure your Richpanel API credentials
3. Click "Execute Workflow" to test

### 2. sync-customer-and-order.json
Syncs customer information and order data to Richpanel.

**Use Case**: E-commerce integration to sync customer and order data

**Demonstrates**:
- Creating/updating customers
- Creating orders with line items
- Using the Set node to prepare data
- Parallel operations

**How to Use**:
1. Import this workflow into n8n
2. Configure your Richpanel API credentials
3. Update the `appClientId` in the "Create Order" node with your API key
4. Click "Execute Workflow" to test

## Importing Workflows

### Method 1: From n8n UI
1. Open n8n
2. Click on "Workflows" in the left sidebar
3. Click "Import from File"
4. Select the JSON file
5. Configure credentials when prompted

### Method 2: From n8n CLI
```bash
n8n import:workflow --input=/path/to/workflow.json
```

## Customizing Examples

After importing:

1. **Update Credentials**: Ensure you've configured the Richpanel API credentials
2. **Modify Data**: Update the sample data to match your use case
3. **Add Logic**: Add IF nodes, Switch nodes, or other logic as needed
4. **Connect Services**: Replace the Manual Trigger with real triggers (Webhooks, Email, etc.)

## Real-World Workflow Ideas

### Email to Ticket with Auto-Tagging
```
Email Trigger → Extract Keywords → Richpanel (Create Conversation) → Richpanel (Add Tags)
```

### Order Webhook Integration
```
Shopify Webhook → Transform Data → Richpanel (Create Customer) → Richpanel (Create Order)
```

### High-Priority Alert
```
Richpanel Webhook → Check Priority → IF (High) → Slack Notification
```

### Customer Journey Tracking
```
CRM Webhook → Richpanel (Update Customer) → Richpanel (Attach Order to Conversation)
```

## Need More Help?

- Check the [QUICKSTART.md](../QUICKSTART.md) for detailed setup instructions
- Read the [README.md](../README.md) for comprehensive documentation
- Visit the [n8n community forum](https://community.n8n.io/) for support

## Contributing Examples

Have a great workflow to share? We'd love to see it! Please:

1. Test your workflow thoroughly
2. Remove any sensitive information
3. Add comments explaining the workflow
4. Submit a pull request with your example

---

Happy automating!
