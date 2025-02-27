import {authRoles} from 'app/auth';
import store from 'app/store';
import {logoutUser} from 'app/auth/store/actions';

export const LogoutConfig = {
    auth  : authRoles.user,
    routes: [
        {
            path     : '/logout',
            component: () => {
                store.dispatch(logoutUser("Logout", null));
                return 'Logging out..'
            }
        }
    ]
};

