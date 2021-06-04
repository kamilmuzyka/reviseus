/** @module Context/Theme */

/** Manages the app colour theme. Available themes can be found in <i>index.css</i> file. */
class Theme {
    /** Current theme available for the app components. */
    private currentTheme;

    /** Dispatches a custom event needed to refresh affected components. */
    private dispatch(): void {
        window.dispatchEvent(
            new CustomEvent('themechange', {
                bubbles: true,
                composed: true,
            })
        );
    }

    /** System preferred theme. */
    get preferred(): string {
        const media = window.matchMedia('(prefers-color-scheme: dark)');
        return media.matches ? 'dark' : 'light';
    }

    /** Lets components look up the current theme. */
    get current() {
        return this.currentTheme;
    }

    /** Saves provided theme to the local storage. */
    private save(name: string): void {
        localStorage.setItem('theme', name);
    }

    /** Activates the current theme by overwriting existing styles. */
    private activate(): void {
        document.documentElement.className = this.currentTheme;
    }

    /** Toggles the current theme and saves it to the local storage. */
    toggle(): void {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.currentTheme = newTheme;
        this.dispatch();
        this.activate();
        this.save(newTheme);
    }

    /** Loads theme settings saved in local storage or creates new ones based on
     * the system preferred theme. */
    load(): void {
        const theme = localStorage.getItem('theme');
        if (theme) {
            this.currentTheme = theme;
            this.dispatch();
            this.activate();
            return;
        }
        const preferredTheme = this.preferred;
        this.currentTheme = preferredTheme;
        this.dispatch();
        this.activate();
        this.save(preferredTheme);
    }
}

export default new Theme();
