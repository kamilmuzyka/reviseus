/** @module Context/Auth */
import User from '../interfaces/user-interface';

/** Keeps track of current user's auth status and stores their data. */
class Auth {
    private isAuth;
    private currentUser;

    constructor() {
        this.isAuth = false;
    }

    private dispatch(): void {
        window.dispatchEvent(
            new CustomEvent('authchange', {
                bubbles: true,
                composed: true,
            })
        );
    }

    check(): void {
        (async () => {
            const response = await fetch('/auth/identity');
            if (response.ok) {
                this.isAuth = true;
                this.currentUser = await response.json();
                this.dispatch();
                return;
            }
            this.isAuth = false;
            this.currentUser = {};
            this.dispatch();
        })();
    }

    logOut(): void {
        (async () => {
            const response = await fetch('/auth/logout');
            if (response.ok) {
                this.isAuth = false;
                this.currentUser = null;
                this.dispatch();
                return;
            }
        })();
    }

    get ok(): boolean {
        return this.isAuth;
    }

    get user(): User {
        return this.currentUser;
    }
}

export default new Auth();
