# n8n-nodes-richpanel

This is an n8n community node that provides integration with the [Richpanel](https://www.richpanel.com/) customer support platform.

[n8n](https://n8n.io/) is a fair-code licensed workflow automation platform.

[Richpanel](https://www.richpanel.com/) is a customer service platform for e-commerce businesses that combines live chat, helpdesk, and self-service capabilities.

## Table of Contents

- [Installation](#installation)
- [Prerequisites](#prerequisites)
- [Credentials](#credentials)
- [Supported Operations](#supported-operations)
- [Usage Examples](#usage-examples)
- [Compatibility](#compatibility)
- [Resources](#resources)
- [License](#license)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

### Community Node Installation

1. Go to **Settings > Community Nodes** in your n8n instance
2. Select **Install**
3. Enter `n8n-nodes-richpanel` in **Enter npm package name**
4. Agree to the risks and select **Install**

After installing the node, you can use it like any other node in n8n.

### Manual Installation

To get started, install the package in your n8n root directory:

```bash
npm install n8n-nodes-richpanel
```

For Docker-based deployments, add the following line to your `package.json` in the n8n custom nodes section:

```json
"n8n-nodes-richpanel": "^1.0.0"
```

## Prerequisites

- n8n installed (version 0.187.0 or above)
- A Richpanel account

## Credentials

To use this node, you'll need a Richpanel API key. Here's how to obtain it:

1. Log in to your Richpanel account
2. Navigate to **Settings** → **Integrations** → **API Keys**
3. Generate a new API key or copy an existing one
4. In n8n, create new **Richpanel API** credentials
5. Paste your API key in the **API Key** field

## Supported Operations

### Conversation

- **Create**: Create a new conversation/ticket
- **Update**: Update an existing conversation
- **Get**: Retrieve a conversation by ID
- **Get by Number**: Retrieve a conversation by conversation number
- **Get by Customer**: Retrieve conversations by customer email or phone
- **Add Tags**: Add tags to a conversation
- **Remove Tags**: Remove tags from a conversation
- **Attach Order**: Attach an order to a conversation

### Customer

- **Create or Update**: Create a new customer or update an existing one
- **Get**: Retrieve a customer by email or phone number

### Order

- **Create or Update**: Create a new order or update an existing one
- **Get**: Retrieve an order by ID
- **Get from Conversation**: Retrieve an order linked to a conversation

### Subscription

- **Create or Update**: Create a new subscription or update an existing one

### User (Agent)

- **Get**: Retrieve a specific user/agent by ID
- **Get Many**: Retrieve all users/agents (with pagination support)

### Tag

- **Create**: Create a new tag
- **Get Many**: Retrieve all tags (with pagination support)

### Channel

- **Get**: Retrieve a specific channel by ID
- **Get Many**: Retrieve all channels (with pagination support)

## Usage Examples

### Example 1: Create a Conversation from Email

This workflow creates a new support ticket when an email is received:

1. Add an **Email Trigger** node (or any other trigger)
2. Add the **Richpanel** node
3. Configure:
   - **Resource**: Conversation
   - **Operation**: Create
   - **Message Body**: `{{$json.body}}`
   - **Channel**: Email
   - **From**: `{{$json.from}}`
   - **To**: `support@yourcompany.com`

### Example 2: Create or Update Customer

Sync customer data from your e-commerce platform:

1. Add a trigger node (e.g., Webhook, Shopify)
2. Add the **Richpanel** node
3. Configure:
   - **Resource**: Customer
   - **Operation**: Create or Update
   - **Customer Fields**:
     - First Name: `{{$json.customer.first_name}}`
     - Last Name: `{{$json.customer.last_name}}`
     - Email: `{{$json.customer.email}}`
     - Phone: `{{$json.customer.phone}}`

### Example 3: Create Order

Create an order in Richpanel when a purchase is completed:

1. Add a trigger node from your e-commerce platform
2. Add the **Richpanel** node
3. Configure:
   - **Resource**: Order
   - **Operation**: Create or Update
   - **App Client ID**: Your API Key
   - **Order ID**: `{{$json.order.id}}`
   - **Amount**: `{{$json.order.total}}`
   - **User UID**: `{{$json.customer.id}}`
   - **Items**:
     ```json
     [
       {
         "id": "{{$json.items[0].id}}",
         "price": {{$json.items[0].price}},
         "name": "{{$json.items[0].name}}",
         "quantity": {{$json.items[0].quantity}}
       }
     ]
     ```

### Example 4: Add Tags to Conversation

Automatically tag conversations based on keywords:

1. Add a **Richpanel Trigger** or webhook
2. Add an **IF** node to check for specific keywords
3. Add the **Richpanel** node
4. Configure:
   - **Resource**: Conversation
   - **Operation**: Add Tags
   - **Conversation ID**: `{{$json.ticket.id}}`
   - **Tags**: `urgent, billing` (comma-separated)

### Example 5: Get Customer Information

Retrieve customer details for further processing:

1. Add a trigger node
2. Add the **Richpanel** node
3. Configure:
   - **Resource**: Customer
   - **Operation**: Get
   - **Type**: Email
   - **Customer Identifier**: `customer@example.com`

## Pagination

For operations that return multiple results (Get Many), pagination is supported:

- **Page**: Specify which page to retrieve (default: 1)
- **Per Page**: Number of records per page (max: 100, default: 100)
- **Return All**: Automatically paginate through all results

Example usage:
1. Set "Return All" to `true` to automatically fetch all pages
2. Or manually control pagination with "Page" and "Per Page" options

## API Rate Limiting

Richpanel API has the following rate limits:

- **100 calls per minute**
- Rate limit headers are included in responses:
  - `X-RateLimit-Limit`: Total allowed requests
  - `X-RateLimit-Remaining`: Remaining requests
  - `Retry-After`: Seconds to wait when rate limited

The node will return rate limit errors if you exceed these limits. Consider adding delay nodes in your workflows to stay within limits.

## Compatibility

- Minimum n8n version: 0.187.0
- Tested with n8n version: 1.0.0+

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [Richpanel API Documentation](https://developer.richpanel.com/reference/getting-started-with-your-api)
- [Richpanel Authentication Guide](https://developer.richpanel.com/reference/authentication)

## Development

To develop and test this node locally:

```bash
# Clone the repository
git clone https://github.com/yourusername/n8n-nodes-richpanel.git
cd n8n-nodes-richpanel

# Install dependencies
npm install

# Build the node
npm run build

# Link to your local n8n installation
npm link
cd ~/.n8n/nodes
npm link n8n-nodes-richpanel
```

## Support

For issues, questions, or contributions:

- [GitHub Issues](https://github.com/yourusername/n8n-nodes-richpanel/issues)
- [Richpanel Support](mailto:tech@richpanel.com)
- [n8n Community Forum](https://community.n8n.io/)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

[MIT](LICENSE.md)

## Version History

### 1.0.0 (Initial Release)

- Support for Conversation operations (create, update, get, tag management)
- Support for Customer operations (create/update, get)
- Support for Order operations (create/update)
- Support for User/Agent operations (get, list)
- Support for Tag operations (create, list)
- Support for Channel operations (get, list)
- API Key authentication
- Full TypeScript support

## Roadmap

- [ ] Add pagination support for list operations
- [ ] Add file upload functionality
- [ ] Add webhook trigger node
- [ ] Add team management operations
- [ ] Add subscription management operations
- [ ] Add bulk operations support

## Notes

- This is a community-maintained node and is not officially supported by Richpanel
- Partial updates are supported for conversation and customer updates (only send the fields you want to modify)
- Custom properties can be added to customers using the Custom Properties field (JSON format)
- For phone channels, use ID fields instead of address fields in the source configuration
