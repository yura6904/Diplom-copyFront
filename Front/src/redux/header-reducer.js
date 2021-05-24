const ACTIVATE_MENU = 'ACTIVATE_MENU';
const ACTIVE_LINK = 'ACTIVE_LINK';


let initialState = {
    activateMenu: false,
    activeLink: false
}

export const headerReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIVATE_MENU: {
            state.activateMenu = !state.activateMenu;
            return {...state}
        }
        case ACTIVE_LINK : {
            debugger;
            state.activeLink = !state.activeLink;
            return {...state}
        }
        default: {
            return state;
        }
    }
}

export const toggleMenuAC = () => ({type: ACTIVATE_MENU});
export const toggleLinkAC = () => ({type: ACTIVE_LINK});