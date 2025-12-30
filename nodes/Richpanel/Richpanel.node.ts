import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IDataObject,
	JsonObject,
	NodeOperationError,
} from 'n8n-workflow';

export class Richpanel implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Richpanel',
		name: 'richpanel',
		icon: 'file:richpanel-logo.png',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Richpanel API',
		defaults: {
			name: 'Richpanel',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'richpanelApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.richpanel.com/v1',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			// Resource selector
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Conversation',
						value: 'conversation',
					},
					{
						name: 'Customer',
						value: 'customer',
					},
					{
						name: 'Order',
						value: 'order',
					},
					{
						name: 'Subscription',
						value: 'subscription',
					},
					{
						name: 'User',
						value: 'user',
					},
					{
						name: 'Tag',
						value: 'tag',
					},
					{
						name: 'Channel',
						value: 'channel',
					},
				],
				default: 'conversation',
			},

			// ----------------------------------------
			//         Conversation Operations
			// ----------------------------------------
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['conversation'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new conversation',
						action: 'Create a conversation',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a conversation',
						action: 'Update a conversation',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a conversation by ID',
						action: 'Get a conversation',
					},
					{
						name: 'Get by Number',
						value: 'getByNumber',
						description: 'Get a conversation by conversation number',
						action: 'Get a conversation by number',
					},
					{
						name: 'Get by Customer',
						value: 'getByCustomer',
						description: 'Get conversations by customer email or phone',
						action: 'Get conversations by customer',
					},
					{
						name: 'Add Tags',
						value: 'addTags',
						description: 'Add tags to a conversation',
						action: 'Add tags to a conversation',
					},
					{
						name: 'Remove Tags',
						value: 'removeTags',
						description: 'Remove tags from a conversation',
						action: 'Remove tags from a conversation',
					},
					{
						name: 'Attach Order',
						value: 'attachOrder',
						description: 'Attach an order to a conversation',
						action: 'Attach order to a conversation',
					},
				],
				default: 'create',
			},

			// ----------------------------------------
			//         Customer Operations
			// ----------------------------------------
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['customer'],
					},
				},
				options: [
					{
						name: 'Create or Update',
						value: 'upsert',
						description: 'Create or update a customer',
						action: 'Create or update a customer',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a customer by email or phone',
						action: 'Get a customer',
					},
				],
				default: 'upsert',
			},

			// ----------------------------------------
			//         Order Operations
			// ----------------------------------------
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['order'],
					},
				},
				options: [
					{
						name: 'Create or Update',
						value: 'upsert',
						description: 'Create or update an order',
						action: 'Create or update an order',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get an order by ID',
						action: 'Get an order',
					},
					{
						name: 'Get from Conversation',
						value: 'getFromConversation',
						description: 'Get order linked to a conversation',
						action: 'Get order from conversation',
					},
				],
				default: 'upsert',
			},

			// ----------------------------------------
			//         Subscription Operations
			// ----------------------------------------
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['subscription'],
					},
				},
				options: [
					{
						name: 'Create or Update',
						value: 'upsert',
						description: 'Create or update a subscription',
						action: 'Create or update a subscription',
					},
				],
				default: 'upsert',
			},

			// ----------------------------------------
			//         User Operations
			// ----------------------------------------
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['user'],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get a user by ID',
						action: 'Get a user',
					},
					{
						name: 'Get Many',
						value: 'getMany',
						description: 'Get all users',
						action: 'Get many users',
					},
				],
				default: 'getMany',
			},

			// ----------------------------------------
			//         Tag Operations
			// ----------------------------------------
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['tag'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new tag',
						action: 'Create a tag',
					},
					{
						name: 'Get Many',
						value: 'getMany',
						description: 'Get all tags',
						action: 'Get many tags',
					},
				],
				default: 'getMany',
			},

			// ----------------------------------------
			//         Channel Operations
			// ----------------------------------------
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['channel'],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get a channel by ID',
						action: 'Get a channel',
					},
					{
						name: 'Get Many',
						value: 'getMany',
						description: 'Get all channels',
						action: 'Get many channels',
					},
				],
				default: 'getMany',
			},

			// ========================================
			//         CONVERSATION FIELDS
			// ========================================

			// Conversation: Create
			{
				displayName: 'Message Body',
				name: 'messageBody',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['conversation'],
						operation: ['create'],
					},
				},
				default: '',
				description: 'The message content for the conversation',
			},
			{
				displayName: 'Channel',
				name: 'channel',
				type: 'options',
				required: true,
				displayOptions: {
					show: {
						resource: ['conversation'],
						operation: ['create'],
					},
				},
				options: [
					{ name: 'Email', value: 'email' },
					{ name: 'SMS', value: 'sms' },
					{ name: 'Chat', value: 'chat' },
					{ name: 'Phone', value: 'phone' },
					{ name: 'Facebook', value: 'facebook' },
					{ name: 'Instagram', value: 'instagram' },
					{ name: 'WhatsApp', value: 'whatsapp' },
				],
				default: 'email',
				description: 'The communication channel for this conversation',
			},
			{
				displayName: 'From',
				name: 'from',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['conversation'],
						operation: ['create'],
						channel: ['email'],
					},
				},
				default: '',
				placeholder: 'customer@example.com',
				description: 'The sender email address',
			},
			{
				displayName: 'To',
				name: 'to',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['conversation'],
						operation: ['create'],
						channel: ['email'],
					},
				},
				default: '',
				placeholder: 'support@example.com',
				description: 'The recipient email address',
			},
			{
				displayName: 'From ID',
				name: 'fromId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['conversation'],
						operation: ['create'],
						channel: ['phone', 'sms'],
					},
				},
				default: '',
				placeholder: '+1234567890',
				description: 'The sender phone ID',
			},
			{
				displayName: 'To ID',
				name: 'toId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['conversation'],
						operation: ['create'],
						channel: ['phone', 'sms'],
					},
				},
				default: '',
				placeholder: '+0987654321',
				description: 'The recipient phone ID',
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['conversation'],
						operation: ['create'],
					},
				},
				options: [
					{
						displayName: 'Status',
						name: 'status',
						type: 'options',
						options: [
							{ name: 'Open', value: 'OPEN' },
							{ name: 'Closed', value: 'CLOSED' },
						],
						default: 'OPEN',
						description: 'The status of the conversation',
					},
					{
						displayName: 'Priority',
						name: 'priority',
						type: 'options',
						options: [
							{ name: 'High', value: 'HIGH' },
							{ name: 'Low', value: 'LOW' },
						],
						default: 'LOW',
						description: 'The priority level of the conversation',
					},
					{
						displayName: 'Subject',
						name: 'subject',
						type: 'string',
						default: '',
						description: 'The subject line for the conversation',
					},
					{
						displayName: 'Tags',
						name: 'tags',
						type: 'string',
						default: '',
						description: 'Comma-separated list of tag IDs to add to the conversation',
					},
					{
						displayName: 'Customer First Name',
						name: 'customerFirstName',
						type: 'string',
						default: '',
						description: 'Customer\'s first name',
					},
					{
						displayName: 'Customer Last Name',
						name: 'customerLastName',
						type: 'string',
						default: '',
						description: 'Customer\'s last name',
					},
				],
			},

			// Conversation: Update
			{
				displayName: 'Conversation ID',
				name: 'conversationId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['conversation'],
						operation: ['update', 'get', 'addTags', 'removeTags', 'attachOrder'],
					},
				},
				default: '',
				description: 'The ID of the conversation',
			},
			{
				displayName: 'Update Fields',
				name: 'updateFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['conversation'],
						operation: ['update'],
					},
				},
				options: [
					{
						displayName: 'Status',
						name: 'status',
						type: 'options',
						options: [
							{ name: 'Open', value: 'OPEN' },
							{ name: 'Closed', value: 'CLOSED' },
						],
						default: 'OPEN',
						description: 'The status of the conversation',
					},
					{
						displayName: 'Priority',
						name: 'priority',
						type: 'options',
						options: [
							{ name: 'High', value: 'HIGH' },
							{ name: 'Low', value: 'LOW' },
						],
						default: 'LOW',
						description: 'The priority level of the conversation',
					},
					{
						displayName: 'Tags',
						name: 'tags',
						type: 'string',
						default: '',
						description: 'Comma-separated list of tag IDs',
					},
				],
			},

			// Conversation: Get by Number
			{
				displayName: 'Conversation Number',
				name: 'conversationNumber',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['conversation'],
						operation: ['getByNumber'],
					},
				},
				default: '',
				description: 'The conversation number',
			},

			// Conversation: Get by Customer
			{
				displayName: 'Type',
				name: 'customerType',
				type: 'options',
				required: true,
				displayOptions: {
					show: {
						resource: ['conversation'],
						operation: ['getByCustomer'],
					},
				},
				options: [
					{ name: 'Email', value: 'email' },
					{ name: 'Phone', value: 'phone' },
				],
				default: 'email',
				description: 'The type of customer identifier',
			},
			{
				displayName: 'Customer Identifier',
				name: 'customerIdentifier',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['conversation'],
						operation: ['getByCustomer'],
					},
				},
				default: '',
				placeholder: 'customer@example.com or +1234567890',
				description: 'The customer email or phone number',
			},

			// Conversation: Add/Remove Tags
			{
				displayName: 'Tags',
				name: 'tags',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['conversation'],
						operation: ['addTags', 'removeTags'],
					},
				},
				default: '',
				description: 'Comma-separated list of tag names',
			},

			// Conversation: Attach Order
			{
				displayName: 'App Client ID',
				name: 'appClientId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['conversation'],
						operation: ['attachOrder'],
					},
				},
				default: '',
				description: 'The application client ID',
			},
			{
				displayName: 'Order ID',
				name: 'orderId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['conversation'],
						operation: ['attachOrder'],
					},
				},
				default: '',
				description: 'The ID of the order to attach',
			},

			// ========================================
			//         CUSTOMER FIELDS
			// ========================================

			{
				displayName: 'Customer Fields',
				name: 'customerFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['customer'],
						operation: ['upsert'],
					},
				},
				options: [
					{
						displayName: 'Public ID',
						name: 'publicId',
						type: 'string',
						default: '',
						description: 'Public identifier for the customer',
					},
					{
						displayName: 'UID',
						name: 'uid',
						type: 'string',
						default: '',
						description: 'Unique user identifier',
					},
					{
						displayName: 'First Name',
						name: 'firstName',
						type: 'string',
						default: '',
						description: 'Customer\'s first name',
					},
					{
						displayName: 'Last Name',
						name: 'lastName',
						type: 'string',
						default: '',
						description: 'Customer\'s last name',
					},
					{
						displayName: 'Email',
						name: 'email',
						type: 'string',
						default: '',
						placeholder: 'customer@example.com',
						description: 'Customer\'s email address',
					},
					{
						displayName: 'Phone',
						name: 'phone',
						type: 'string',
						default: '',
						placeholder: '+1234567890',
						description: 'Customer\'s phone number',
					},
					{
						displayName: 'City',
						name: 'city',
						type: 'string',
						default: '',
						description: 'Customer\'s city',
					},
					{
						displayName: 'Country',
						name: 'country',
						type: 'string',
						default: '',
						description: 'Customer\'s country',
					},
					{
						displayName: 'Custom Properties',
						name: 'customProperties',
						type: 'json',
						default: '{}',
						description: 'Custom properties as JSON object',
					},
				],
			},

			// Customer: Get
			{
				displayName: 'Type',
				name: 'customerType',
				type: 'options',
				required: true,
				displayOptions: {
					show: {
						resource: ['customer'],
						operation: ['get'],
					},
				},
				options: [
					{ name: 'Email', value: 'email' },
					{ name: 'Phone', value: 'phone' },
				],
				default: 'email',
				description: 'The type of customer identifier',
			},
			{
				displayName: 'Customer Identifier',
				name: 'customerIdentifier',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['customer'],
						operation: ['get'],
					},
				},
				default: '',
				placeholder: 'customer@example.com or +1234567890',
				description: 'The customer email or phone number',
			},

			// ========================================
			//         ORDER FIELDS
			// ========================================

			{
				displayName: 'App Client ID',
				name: 'appClientId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['order'],
						operation: ['upsert'],
					},
				},
				default: '',
				description: 'The API client ID',
			},
			{
				displayName: 'Order ID',
				name: 'orderId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['order'],
						operation: ['upsert'],
					},
				},
				default: '',
				description: 'The unique order identifier',
			},
			{
				displayName: 'Amount',
				name: 'amount',
				type: 'number',
				required: true,
				displayOptions: {
					show: {
						resource: ['order'],
						operation: ['upsert'],
					},
				},
				default: 0,
				description: 'The total order amount',
			},
			{
				displayName: 'User UID',
				name: 'userUid',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['order'],
						operation: ['upsert'],
					},
				},
				default: '',
				description: 'The unique user identifier',
			},
			{
				displayName: 'Items',
				name: 'items',
				type: 'json',
				required: true,
				displayOptions: {
					show: {
						resource: ['order'],
						operation: ['upsert'],
					},
				},
				default: '[{"id": "1", "price": 10.00, "name": "Product", "quantity": 1}]',
				description: 'Array of order items as JSON',
			},
			{
				displayName: 'Order Fields',
				name: 'orderFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['order'],
						operation: ['upsert'],
					},
				},
				options: [
					{
						displayName: 'Currency',
						name: 'currency',
						type: 'string',
						default: 'USD',
						description: 'The currency code',
					},
					{
						displayName: 'Status',
						name: 'status',
						type: 'string',
						default: 'processing',
						description: 'The order status',
					},
					{
						displayName: 'Fulfillment Status',
						name: 'fulfillmentStatus',
						type: 'string',
						default: 'unfulfilled',
						description: 'The fulfillment status',
					},
					{
						displayName: 'Payment Method',
						name: 'paymentMethod',
						type: 'string',
						default: '',
						description: 'The payment method used',
					},
					{
						displayName: 'User Email',
						name: 'userEmail',
						type: 'string',
						default: '',
						description: 'Customer email address',
					},
					{
						displayName: 'User Phone',
						name: 'userPhone',
						type: 'string',
						default: '',
						description: 'Customer phone number',
					},
					{
						displayName: 'User First Name',
						name: 'userFirstName',
						type: 'string',
						default: '',
						description: 'Customer first name',
					},
					{
						displayName: 'User Last Name',
						name: 'userLastName',
						type: 'string',
						default: '',
						description: 'Customer last name',
					},
				],
			},

			// Order: Get
			{
				displayName: 'Order ID',
				name: 'orderIdGet',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['order'],
						operation: ['get'],
					},
				},
				default: '',
				description: 'The ID of the order to retrieve',
			},

			// Order: Get from Conversation
			{
				displayName: 'Conversation ID',
				name: 'conversationIdForOrder',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['order'],
						operation: ['getFromConversation'],
					},
				},
				default: '',
				description: 'The conversation ID to get the linked order from',
			},

			// ========================================
			//         SUBSCRIPTION FIELDS
			// ========================================

			{
				displayName: 'App Client ID',
				name: 'appClientId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['subscription'],
						operation: ['upsert'],
					},
				},
				default: '',
				description: 'The API client ID',
			},
			{
				displayName: 'Subscription ID',
				name: 'subscriptionId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['subscription'],
						operation: ['upsert'],
					},
				},
				default: '',
				description: 'The unique subscription identifier',
			},
			{
				displayName: 'User UID',
				name: 'userUid',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['subscription'],
						operation: ['upsert'],
					},
				},
				default: '',
				description: 'The unique user identifier',
			},
			{
				displayName: 'Status',
				name: 'subscriptionStatus',
				type: 'options',
				required: true,
				displayOptions: {
					show: {
						resource: ['subscription'],
						operation: ['upsert'],
					},
				},
				options: [
					{ name: 'Active', value: 'active' },
					{ name: 'Cancelled', value: 'cancelled' },
					{ name: 'Paused', value: 'paused' },
					{ name: 'Expired', value: 'expired' },
				],
				default: 'active',
				description: 'The subscription status',
			},
			{
				displayName: 'Subscription Fields',
				name: 'subscriptionFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['subscription'],
						operation: ['upsert'],
					},
				},
				options: [
					{
						displayName: 'Amount',
						name: 'amount',
						type: 'number',
						default: 0,
						description: 'The subscription amount',
					},
					{
						displayName: 'Currency',
						name: 'currency',
						type: 'string',
						default: 'USD',
						description: 'The currency code',
					},
					{
						displayName: 'Billing Interval',
						name: 'billingInterval',
						type: 'options',
						options: [
							{ name: 'Daily', value: 'daily' },
							{ name: 'Weekly', value: 'weekly' },
							{ name: 'Monthly', value: 'monthly' },
							{ name: 'Yearly', value: 'yearly' },
						],
						default: 'monthly',
						description: 'The billing interval',
					},
					{
						displayName: 'Next Billing Date',
						name: 'nextBillingDate',
						type: 'string',
						default: '',
						placeholder: '2024-12-31T00:00:00Z',
						description: 'The next billing date (ISO 8601 format)',
					},
					{
						displayName: 'Product Name',
						name: 'productName',
						type: 'string',
						default: '',
						description: 'The name of the subscribed product',
					},
					{
						displayName: 'User Email',
						name: 'userEmail',
						type: 'string',
						default: '',
						description: 'Customer email address',
					},
					{
						displayName: 'User First Name',
						name: 'userFirstName',
						type: 'string',
						default: '',
						description: 'Customer first name',
					},
					{
						displayName: 'User Last Name',
						name: 'userLastName',
						type: 'string',
						default: '',
						description: 'Customer last name',
					},
				],
			},

			// ========================================
			//         USER FIELDS
			// ========================================

			{
				displayName: 'User ID',
				name: 'userId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['user'],
						operation: ['get'],
					},
				},
				default: '',
				description: 'The ID of the user to retrieve',
			},

			// Pagination for Get Many operations
			{
				displayName: 'Options',
				name: 'options',
				type: 'collection',
				placeholder: 'Add Option',
				default: {},
				displayOptions: {
					show: {
						resource: ['user'],
						operation: ['getMany'],
					},
				},
				options: [
					{
						displayName: 'Page',
						name: 'page',
						type: 'number',
						default: 1,
						description: 'Page number to retrieve (starts at 1)',
					},
					{
						displayName: 'Per Page',
						name: 'perPage',
						type: 'number',
						default: 100,
						description: 'Number of records per page (max 100)',
					},
					{
						displayName: 'Return All',
						name: 'returnAll',
						type: 'boolean',
						default: false,
						description: 'Whether to return all results by auto-paginating',
					},
				],
			},

			// ========================================
			//         TAG FIELDS
			// ========================================

			{
				displayName: 'Tag Name',
				name: 'tagName',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['tag'],
						operation: ['create'],
					},
				},
				default: '',
				description: 'The name of the tag to create',
			},
			{
				displayName: 'Tag Color',
				name: 'tagColor',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['tag'],
						operation: ['create'],
					},
				},
				default: '#FF0000',
				description: 'The color for the tag (hex format)',
			},

			// Pagination for Tag Get Many
			{
				displayName: 'Options',
				name: 'options',
				type: 'collection',
				placeholder: 'Add Option',
				default: {},
				displayOptions: {
					show: {
						resource: ['tag'],
						operation: ['getMany'],
					},
				},
				options: [
					{
						displayName: 'Page',
						name: 'page',
						type: 'number',
						default: 1,
						description: 'Page number to retrieve (starts at 1)',
					},
					{
						displayName: 'Per Page',
						name: 'perPage',
						type: 'number',
						default: 100,
						description: 'Number of records per page (max 100)',
					},
					{
						displayName: 'Return All',
						name: 'returnAll',
						type: 'boolean',
						default: false,
						description: 'Whether to return all results by auto-paginating',
					},
				],
			},

			// ========================================
			//         CHANNEL FIELDS
			// ========================================

			{
				displayName: 'Channel ID',
				name: 'channelId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['channel'],
						operation: ['get'],
					},
				},
				default: '',
				description: 'The ID of the channel to retrieve',
			},

			// Pagination for Channel Get Many
			{
				displayName: 'Options',
				name: 'options',
				type: 'collection',
				placeholder: 'Add Option',
				default: {},
				displayOptions: {
					show: {
						resource: ['channel'],
						operation: ['getMany'],
					},
				},
				options: [
					{
						displayName: 'Page',
						name: 'page',
						type: 'number',
						default: 1,
						description: 'Page number to retrieve (starts at 1)',
					},
					{
						displayName: 'Per Page',
						name: 'perPage',
						type: 'number',
						default: 100,
						description: 'Number of records per page (max 100)',
					},
					{
						displayName: 'Return All',
						name: 'returnAll',
						type: 'boolean',
						default: false,
						description: 'Whether to return all results by auto-paginating',
					},
				],
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData: IDataObject | IDataObject[];

				if (resource === 'conversation') {
					responseData = await handleConversationOperations.call(this, operation, i);
				} else if (resource === 'customer') {
					responseData = await handleCustomerOperations.call(this, operation, i);
				} else if (resource === 'order') {
					responseData = await handleOrderOperations.call(this, operation, i);
				} else if (resource === 'subscription') {
					responseData = await handleSubscriptionOperations.call(this, operation, i);
				} else if (resource === 'user') {
					responseData = await handleUserOperations.call(this, operation, i);
				} else if (resource === 'tag') {
					responseData = await handleTagOperations.call(this, operation, i);
				} else if (resource === 'channel') {
					responseData = await handleChannelOperations.call(this, operation, i);
				} else {
					throw new NodeOperationError(
						this.getNode(),
						`The resource "${resource}" is not supported`,
						{ itemIndex: i },
					);
				}

				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(responseData),
					{ itemData: { item: i } },
				);
				returnData.push(...executionData);
			} catch (error) {
				if (this.continueOnFail()) {
					const executionErrorData = this.helpers.constructExecutionMetaData(
						this.helpers.returnJsonArray({ error: error.message }),
						{ itemData: { item: i } },
					);
					returnData.push(...executionErrorData);
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}

// ========================================
//         CONVERSATION HANDLERS
// ========================================

async function handleConversationOperations(
	this: IExecuteFunctions,
	operation: string,
	itemIndex: number,
): Promise<IDataObject> {
	if (operation === 'create') {
		const messageBody = this.getNodeParameter('messageBody', itemIndex) as string;
		const channel = this.getNodeParameter('channel', itemIndex) as string;
		const additionalFields = this.getNodeParameter('additionalFields', itemIndex) as IDataObject;

		const body: IDataObject = {
			ticket: {
				comment: {
					sender_type: 'customer',
					body: messageBody,
				},
				via: {
					channel,
					source: {},
				},
			},
		};

		// Handle channel-specific source fields
		if (channel === 'email') {
			const from = this.getNodeParameter('from', itemIndex) as string;
			const to = this.getNodeParameter('to', itemIndex) as string;
			(body.ticket as IDataObject).via = {
				channel,
				source: {
					from: { address: from },
					to: { address: to },
				},
			};
		} else if (channel === 'phone' || channel === 'sms') {
			const fromId = this.getNodeParameter('fromId', itemIndex) as string;
			const toId = this.getNodeParameter('toId', itemIndex) as string;
			(body.ticket as IDataObject).via = {
				channel,
				source: {
					from: { id: fromId },
					to: { id: toId },
				},
			};
		}

		// Add additional fields
		if (additionalFields.status) {
			(body.ticket as IDataObject).status = additionalFields.status;
		}
		if (additionalFields.priority) {
			(body.ticket as IDataObject).priority = additionalFields.priority;
		}
		if (additionalFields.subject) {
			(body.ticket as IDataObject).subject = additionalFields.subject;
		}
		if (additionalFields.tags) {
			(body.ticket as IDataObject).tags = (additionalFields.tags as string)
				.split(',')
				.map((tag) => tag.trim());
		}
		if (additionalFields.customerFirstName || additionalFields.customerLastName) {
			(body.ticket as IDataObject).customer_profile = {
				firstName: additionalFields.customerFirstName || '',
				lastName: additionalFields.customerLastName || '',
			};
		}

		return await this.helpers.httpRequestWithAuthentication.call(this, 'richpanelApi', {
			method: 'POST',
			url: '/tickets',
			body,
			json: true,
		});
	} else if (operation === 'update') {
		const conversationId = this.getNodeParameter('conversationId', itemIndex) as string;
		const updateFields = this.getNodeParameter('updateFields', itemIndex) as IDataObject;

		const body: IDataObject = { ticket: {} };

		if (updateFields.status) {
			(body.ticket as IDataObject).status = updateFields.status;
		}
		if (updateFields.priority) {
			(body.ticket as IDataObject).priority = updateFields.priority;
		}
		if (updateFields.tags) {
			(body.ticket as IDataObject).tags = (updateFields.tags as string)
				.split(',')
				.map((tag) => tag.trim());
		}

		return await this.helpers.httpRequestWithAuthentication.call(this, 'richpanelApi', {
			method: 'PUT',
			url: `/tickets/${conversationId}`,
			body,
			json: true,
		});
	} else if (operation === 'get') {
		const conversationId = this.getNodeParameter('conversationId', itemIndex) as string;

		return await this.helpers.httpRequestWithAuthentication.call(this, 'richpanelApi', {
			method: 'GET',
			url: `/tickets/${conversationId}`,
			json: true,
		});
	} else if (operation === 'getByNumber') {
		const conversationNumber = this.getNodeParameter('conversationNumber', itemIndex) as string;

		return await this.helpers.httpRequestWithAuthentication.call(this, 'richpanelApi', {
			method: 'GET',
			url: `/tickets/number/${conversationNumber}`,
			json: true,
		});
	} else if (operation === 'getByCustomer') {
		const customerType = this.getNodeParameter('customerType', itemIndex) as string;
		const customerIdentifier = this.getNodeParameter('customerIdentifier', itemIndex) as string;

		return await this.helpers.httpRequestWithAuthentication.call(this, 'richpanelApi', {
			method: 'GET',
			url: `/tickets/${customerType}/${customerIdentifier}`,
			json: true,
		});
	} else if (operation === 'addTags') {
		const conversationId = this.getNodeParameter('conversationId', itemIndex) as string;
		const tags = this.getNodeParameter('tags', itemIndex) as string;

		return await this.helpers.httpRequestWithAuthentication.call(this, 'richpanelApi', {
			method: 'PUT',
			url: `/tickets/${conversationId}/add-tags`,
			body: {
				tags: tags.split(',').map((tag) => tag.trim()),
			},
			json: true,
		});
	} else if (operation === 'removeTags') {
		const conversationId = this.getNodeParameter('conversationId', itemIndex) as string;
		const tags = this.getNodeParameter('tags', itemIndex) as string;

		return await this.helpers.httpRequestWithAuthentication.call(this, 'richpanelApi', {
			method: 'PUT',
			url: `/tickets/${conversationId}/remove-tags`,
			body: {
				tags: tags.split(',').map((tag) => tag.trim()),
			},
			json: true,
		});
	} else if (operation === 'attachOrder') {
		const conversationId = this.getNodeParameter('conversationId', itemIndex) as string;
		const appClientId = this.getNodeParameter('appClientId', itemIndex) as string;
		const orderId = this.getNodeParameter('orderId', itemIndex) as string;

		return await this.helpers.httpRequestWithAuthentication.call(this, 'richpanelApi', {
			method: 'PUT',
			url: `/tickets/${conversationId}/attach-order/${appClientId}/${orderId}`,
			json: true,
		});
	}

	throw new NodeOperationError(
		this.getNode(),
		`The operation "${operation}" is not supported for conversation`,
		{ itemIndex },
	);
}

// ========================================
//         CUSTOMER HANDLERS
// ========================================

async function handleCustomerOperations(
	this: IExecuteFunctions,
	operation: string,
	itemIndex: number,
): Promise<IDataObject> {
	if (operation === 'upsert') {
		const customerFields = this.getNodeParameter('customerFields', itemIndex) as IDataObject;

		const body: IDataObject = {};

		if (customerFields.publicId) body.publicId = customerFields.publicId;
		if (customerFields.uid) body.uid = customerFields.uid;
		if (customerFields.firstName) body.firstName = customerFields.firstName;
		if (customerFields.lastName) body.lastName = customerFields.lastName;
		if (customerFields.email) body.email = customerFields.email;
		if (customerFields.phone) body.phone = customerFields.phone;
		if (customerFields.city) body.city = customerFields.city;
		if (customerFields.country) body.country = customerFields.country;

		// Add custom properties
		if (customerFields.customProperties) {
			try {
				const customProps =
					typeof customerFields.customProperties === 'string'
						? JSON.parse(customerFields.customProperties as string)
						: customerFields.customProperties;
				Object.assign(body, customProps);
			} catch (error) {
				throw new NodeOperationError(
					this.getNode(),
					'Custom properties must be valid JSON',
					{ itemIndex },
				);
			}
		}

		return await this.helpers.httpRequestWithAuthentication.call(this, 'richpanelApi', {
			method: 'POST',
			url: '/customers',
			body,
			json: true,
		});
	} else if (operation === 'get') {
		const customerType = this.getNodeParameter('customerType', itemIndex) as string;
		const customerIdentifier = this.getNodeParameter('customerIdentifier', itemIndex) as string;

		return await this.helpers.httpRequestWithAuthentication.call(this, 'richpanelApi', {
			method: 'GET',
			url: `/customers/${customerType}/${customerIdentifier}`,
			json: true,
		});
	}

	throw new NodeOperationError(
		this.getNode(),
		`The operation "${operation}" is not supported for customer`,
		{ itemIndex },
	);
}

// ========================================
//         ORDER HANDLERS
// ========================================

async function handleOrderOperations(
	this: IExecuteFunctions,
	operation: string,
	itemIndex: number,
): Promise<IDataObject> {
	if (operation === 'upsert') {
		const appClientId = this.getNodeParameter('appClientId', itemIndex) as string;
		const orderId = this.getNodeParameter('orderId', itemIndex) as string;
		const amount = this.getNodeParameter('amount', itemIndex) as number;
		const userUid = this.getNodeParameter('userUid', itemIndex) as string;
		const itemsJson = this.getNodeParameter('items', itemIndex) as string;
		const orderFields = this.getNodeParameter('orderFields', itemIndex) as IDataObject;

		let items: IDataObject[];
		try {
			items = typeof itemsJson === 'string' ? JSON.parse(itemsJson) : itemsJson;
		} catch (error) {
			throw new NodeOperationError(this.getNode(), 'Items must be valid JSON array', {
				itemIndex,
			});
		}

		const body: IDataObject = {
			event: 'order',
			properties: {
				orderId,
				amount,
				items,
			},
			userProperties: {
				uid: userUid,
			},
			time: {
				sentAt: new Date().toISOString(),
			},
			appClientId,
		};

		// Add optional order fields
		if (orderFields.currency) {
			(body.properties as IDataObject).currency = orderFields.currency;
		}
		if (orderFields.status) {
			(body.properties as IDataObject).status = orderFields.status;
		}
		if (orderFields.fulfillmentStatus) {
			(body.properties as IDataObject).fulfillmentStatus = orderFields.fulfillmentStatus;
		}
		if (orderFields.paymentMethod) {
			(body.properties as IDataObject).paymentMethod = orderFields.paymentMethod;
		}

		// Add user properties
		if (orderFields.userEmail) {
			(body.userProperties as IDataObject).email = orderFields.userEmail;
		}
		if (orderFields.userPhone) {
			(body.userProperties as IDataObject).phone = orderFields.userPhone;
		}
		if (orderFields.userFirstName) {
			(body.userProperties as IDataObject).firstName = orderFields.userFirstName;
		}
		if (orderFields.userLastName) {
			(body.userProperties as IDataObject).lastName = orderFields.userLastName;
		}

		return await this.helpers.httpRequestWithAuthentication.call(this, 'richpanelApi', {
			method: 'POST',
			url: `/order/${appClientId}`,
			body,
			json: true,
		});
	} else if (operation === 'get') {
		const orderIdGet = this.getNodeParameter('orderIdGet', itemIndex) as string;

		return await this.helpers.httpRequestWithAuthentication.call(this, 'richpanelApi', {
			method: 'GET',
			url: `/order/${orderIdGet}`,
			json: true,
		});
	} else if (operation === 'getFromConversation') {
		const conversationIdForOrder = this.getNodeParameter(
			'conversationIdForOrder',
			itemIndex,
		) as string;

		return await this.helpers.httpRequestWithAuthentication.call(this, 'richpanelApi', {
			method: 'GET',
			url: `/tickets/${conversationIdForOrder}/order`,
			json: true,
		});
	}

	throw new NodeOperationError(
		this.getNode(),
		`The operation "${operation}" is not supported for order`,
		{ itemIndex },
	);
}

// ========================================
//         SUBSCRIPTION HANDLERS
// ========================================

async function handleSubscriptionOperations(
	this: IExecuteFunctions,
	operation: string,
	itemIndex: number,
): Promise<IDataObject> {
	if (operation === 'upsert') {
		const appClientId = this.getNodeParameter('appClientId', itemIndex) as string;
		const subscriptionId = this.getNodeParameter('subscriptionId', itemIndex) as string;
		const userUid = this.getNodeParameter('userUid', itemIndex) as string;
		const subscriptionStatus = this.getNodeParameter('subscriptionStatus', itemIndex) as string;
		const subscriptionFields = this.getNodeParameter(
			'subscriptionFields',
			itemIndex,
		) as IDataObject;

		const body: IDataObject = {
			event: 'subscription',
			properties: {
				subscriptionId,
				status: subscriptionStatus,
			},
			userProperties: {
				uid: userUid,
			},
			time: {
				sentAt: new Date().toISOString(),
			},
			appClientId,
		};

		// Add optional subscription fields
		if (subscriptionFields.amount) {
			(body.properties as IDataObject).amount = subscriptionFields.amount;
		}
		if (subscriptionFields.currency) {
			(body.properties as IDataObject).currency = subscriptionFields.currency;
		}
		if (subscriptionFields.billingInterval) {
			(body.properties as IDataObject).billingInterval = subscriptionFields.billingInterval;
		}
		if (subscriptionFields.nextBillingDate) {
			(body.properties as IDataObject).nextBillingDate = subscriptionFields.nextBillingDate;
		}
		if (subscriptionFields.productName) {
			(body.properties as IDataObject).productName = subscriptionFields.productName;
		}

		// Add user properties
		if (subscriptionFields.userEmail) {
			(body.userProperties as IDataObject).email = subscriptionFields.userEmail;
		}
		if (subscriptionFields.userFirstName) {
			(body.userProperties as IDataObject).firstName = subscriptionFields.userFirstName;
		}
		if (subscriptionFields.userLastName) {
			(body.userProperties as IDataObject).lastName = subscriptionFields.userLastName;
		}

		return await this.helpers.httpRequestWithAuthentication.call(this, 'richpanelApi', {
			method: 'POST',
			url: `/subscription/${appClientId}`,
			body,
			json: true,
		});
	}

	throw new NodeOperationError(
		this.getNode(),
		`The operation "${operation}" is not supported for subscription`,
		{ itemIndex },
	);
}

// ========================================
//         USER HANDLERS
// ========================================

async function handleUserOperations(
	this: IExecuteFunctions,
	operation: string,
	itemIndex: number,
): Promise<IDataObject> {
	if (operation === 'get') {
		const userId = this.getNodeParameter('userId', itemIndex) as string;

		return await this.helpers.httpRequestWithAuthentication.call(this, 'richpanelApi', {
			method: 'GET',
			url: `/users/${userId}`,
			json: true,
		});
	} else if (operation === 'getMany') {
		const options = this.getNodeParameter('options', itemIndex, {}) as IDataObject;
		const returnAll = options.returnAll as boolean;

		if (returnAll) {
			// Auto-paginate through all results
			return await paginateResults.call(this, '/users', itemIndex);
		} else {
			// Return single page
			const qs: IDataObject = {};
			if (options.page) qs.page = options.page;
			if (options.perPage) qs.per_page = options.perPage;

			return await this.helpers.httpRequestWithAuthentication.call(this, 'richpanelApi', {
				method: 'GET',
				url: '/users',
				qs,
				json: true,
			});
		}
	}

	throw new NodeOperationError(
		this.getNode(),
		`The operation "${operation}" is not supported for user`,
		{ itemIndex },
	);
}

// ========================================
//         TAG HANDLERS
// ========================================

async function handleTagOperations(
	this: IExecuteFunctions,
	operation: string,
	itemIndex: number,
): Promise<IDataObject> {
	if (operation === 'create') {
		const tagName = this.getNodeParameter('tagName', itemIndex) as string;
		const tagColor = this.getNodeParameter('tagColor', itemIndex) as string;

		return await this.helpers.httpRequestWithAuthentication.call(this, 'richpanelApi', {
			method: 'POST',
			url: '/tags',
			body: {
				name: tagName,
				color: tagColor,
			},
			json: true,
		});
	} else if (operation === 'getMany') {
		const options = this.getNodeParameter('options', itemIndex, {}) as IDataObject;
		const returnAll = options.returnAll as boolean;

		if (returnAll) {
			// Auto-paginate through all results
			return await paginateResults.call(this, '/tags', itemIndex);
		} else {
			// Return single page
			const qs: IDataObject = {};
			if (options.page) qs.page = options.page;
			if (options.perPage) qs.per_page = options.perPage;

			return await this.helpers.httpRequestWithAuthentication.call(this, 'richpanelApi', {
				method: 'GET',
				url: '/tags',
				qs,
				json: true,
			});
		}
	}

	throw new NodeOperationError(
		this.getNode(),
		`The operation "${operation}" is not supported for tag`,
		{ itemIndex },
	);
}

// ========================================
//         CHANNEL HANDLERS
// ========================================

async function handleChannelOperations(
	this: IExecuteFunctions,
	operation: string,
	itemIndex: number,
): Promise<IDataObject> {
	if (operation === 'get') {
		const channelId = this.getNodeParameter('channelId', itemIndex) as string;

		return await this.helpers.httpRequestWithAuthentication.call(this, 'richpanelApi', {
			method: 'GET',
			url: `/channel/${channelId}`,
			json: true,
		});
	} else if (operation === 'getMany') {
		const options = this.getNodeParameter('options', itemIndex, {}) as IDataObject;
		const returnAll = options.returnAll as boolean;

		if (returnAll) {
			// Auto-paginate through all results
			return await paginateResults.call(this, '/channel', itemIndex);
		} else {
			// Return single page
			const qs: IDataObject = {};
			if (options.page) qs.page = options.page;
			if (options.perPage) qs.per_page = options.perPage;

			return await this.helpers.httpRequestWithAuthentication.call(this, 'richpanelApi', {
				method: 'GET',
				url: '/channel',
				qs,
				json: true,
			});
		}
	}

	throw new NodeOperationError(
		this.getNode(),
		`The operation "${operation}" is not supported for channel`,
		{ itemIndex },
	);
}

// ========================================
//         HELPER FUNCTIONS
// ========================================

async function paginateResults(
	this: IExecuteFunctions,
	endpoint: string,
	itemIndex: number,
): Promise<IDataObject> {
	const returnData: IDataObject[] = [];
	let page = 1;
	let hasMore = true;

	while (hasMore) {
		const response = (await this.helpers.httpRequestWithAuthentication.call(
			this,
			'richpanelApi',
			{
				method: 'GET',
				url: endpoint,
				qs: { page, per_page: 100 },
				json: true,
			},
		)) as IDataObject;

		// Extract the data array from the response
		// The response structure varies by endpoint (users, tags, channels, etc.)
		const dataKey = Object.keys(response).find(
			(key) => Array.isArray(response[key]) && key !== 'count',
		);

		if (dataKey && Array.isArray(response[dataKey])) {
			returnData.push(...(response[dataKey] as IDataObject[]));
		}

		// Check if there's a next page
		hasMore = !!response.next_page;
		page++;
	}

	return returnData.length === 1 ? returnData[0] : (returnData as unknown as IDataObject);
}
