const Client = (state = [], action: { type: any; clients: any[]; error: any; }) => {
    switch (action.type) {
        case 'LOAD_CLIENT':
            return action.clients.length > 0 ? action.clients[0] : action.clients;
        case 'CLIENT_ERROR':
            return action.error;
        default:
            return state;
    }
}
export default Client;