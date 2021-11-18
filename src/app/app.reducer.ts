export interface State {
    isLoading: boolean;
}

interface Action {
    type: any;
}

const intialState = {
    isLoading: false
};

export function appReducer( state = intialState, action: Action ) {

    switch( action.type ) {
        case 'START_LOADING':
            return {
                isLoading: true
            }

        case 'STOP_LOADING':
            return {
                isLoading: false
            }

        default: 
            return state;
    }

    return state;
}