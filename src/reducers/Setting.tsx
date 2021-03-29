export const Setting = (state = [], action: { type: any; settings: any[]; error: any; }) => {
    switch (action.type) {
        case 'LOAD_SETTING':
            return action.settings;
        case 'SETTING_ERROR':
            return action.error;
        default:
            return state;
    }
}