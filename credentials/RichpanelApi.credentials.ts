import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class RichpanelApi implements ICredentialType {
	name = 'richpanelApi';
	displayName = 'Richpanel API';
	documentationUrl = 'https://developer.richpanel.com/reference/authentication';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description: 'API Key from Settings -> Integrations -> API Keys in your Richpanel account',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'x-richpanel-key': '={{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.richpanel.com/v1',
			url: '/users',
			method: 'GET',
		},
	};
}
