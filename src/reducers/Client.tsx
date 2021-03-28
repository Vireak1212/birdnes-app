const Client = (state = [], action: { type: any; client: any[]; error: any; }) => {
    switch (action.type) {
        case 'LOAD_CLIENT':
            return action.client.length > 0 ? action.client[0] : action.client;
        case 'CLIENT_ERROR':
            return action.error;
        default:
            return state;
    }
}
export default Client;