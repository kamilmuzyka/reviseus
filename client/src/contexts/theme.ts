/** @module Context/Theme */

/** Manages the app colour theme. Available themes can be found in <i>index.css</i> file. */
class Theme {
    /** Current theme available for the app components. */
    private currentTheme;

    /** System preferred theme. */
    get preferred(): string {
        const media = window.matchMedia('(prefers-color-scheme: dark)');
        return media.matches ? 'dark' : 'light';
    }

    /** Saves provided theme to the local storage. */
    save(name: string): void {
        localStorage.setItem('theme', name);
    }

    /** Activates the current theme by overwriting styles. */
    activate(): void {
        document.documentElement.className = this.currentTheme;
    }

    /** Toggles the current theme and saves it to the local storage. */
    toggle(): void {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.currentTheme = newTheme;
        this.activate();
        this.save(newTheme);
    }

    /** Loads theme settings saved in local storage or creates new ones based on
     * the system preferred theme. */
    load(): void {
        const theme = localStorage.getItem('theme');
        if (theme) {
            this.currentTheme = theme;
            this.activate();
            return;
        }
        const preferredTheme = this.preferred;
        this.currentTheme = preferredTheme;
        this.activate();
        this.save(preferredTheme);
    }
}

export default new Theme();
