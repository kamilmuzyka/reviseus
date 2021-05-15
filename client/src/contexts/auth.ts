/** @module Context/Auth */
import User from '../interfaces/user-interface';

/** Keeps track of current user's auth status and stores their data. */
class Auth {
    private isAuth;
    private currentUser;

    constructor() {
        this.isAuth = false;
    }

    check() {
        (async () => {
            const response = await fetch('/auth/identity');
            if (response.ok) {
                this.isAuth = true;
                this.currentUser = await response.json();
                return;
            }
            this.isAuth = false;
            this.currentUser = {};
        })();
    }

    get status(): boolean {
        return this.isAuth;
    }

    get user(): User {
        return this.currentUser;
    }
}

export default new Auth();
