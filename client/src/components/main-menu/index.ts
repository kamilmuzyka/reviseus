/** @module Component/MainMenu */
import html from '../../utils/html-tag';

const template = document.createElement('template');
template.innerHTML = html`
    <style>
        .main-menu {
            position: fixed;
            top: 0;
            left: 0;
            z-index: 2;
            overflow-y: scroll;
            height: 100vh;
            transform: translateX(-100%);
            transition: transform 0.3s ease-in-out;
            background-color: var(--secondary-bg);
            box-shadow: 1px 0 2px rgba(0, 0, 0, 0.2);
            padding: 2.5rem 3.5rem;
        }

        .main-menu.active {
            transform: translateX(0);
        }

        .menu-logo {
            margin: 0;
            font-size: 3.2rem;
            color: var(--primary-text);
        }

        .menu-accent {
            color: var(--accent);
        }

        .menu-list {
            margin: 0;
            padding: 0;
            list-style-type: none;
        }

        .menu-item {
            margin-top: 2.5rem;
        }

        /** Temporary */
        .menu-item-protected {
            /* display: none; */
        }

        .menu-link {
            display: inline-block;
            text-decoration: none;
            color: var(--primary-text);
        }

        .menu-group {
            display: flex;
            align-items: center;
        }

        .menu-group > *:first-child {
            margin-right: 1rem;
        }

        .menu-logout {
            margin: 0;
            padding: 0;
            border: none;
            background: transparent;
            font-family: inherit;
            font-size: inherit;
            color: inherit;
            cursor: pointer;
        }
    </style>
    <nav class="main-menu">
        <h1 class="menu-logo">Revise<span class="menu-accent">.us</span></h1>
        <ol class="menu-list">
            <li class="menu-item">
                <a class="menu-link" href="/" is="router-link">
                    <div class="menu-group">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16.001"
                            height="14.77"
                            viewBox="0 0 16.001 14.77"
                        >
                            <path
                                d="M9.529,19.27V14.347h3.693V19.27h3.754V11.885h2.4l-8-7.385-8,7.385h2.4V19.27Z"
                                transform="translate(-3.375 -4.5)"
                                fill="var(--primary-text)"
                            />
                        </svg>
                        <div>Home</div>
                    </div>
                </a>
            </li>
            <li class="menu-item menu-item-protected">
                <a class="menu-link" href="#" is="router-link">
                    <div class="menu-group">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="12"
                            viewBox="0 0 16 10"
                        >
                            <path
                                d="M13.159,12.042a2.141,2.141,0,0,0,2.182-2.083,2.184,2.184,0,0,0-4.364,0A2.141,2.141,0,0,0,13.159,12.042Zm-5.818,0A2.141,2.141,0,0,0,9.523,9.958,2.141,2.141,0,0,0,7.341,7.875,2.141,2.141,0,0,0,5.159,9.958,2.141,2.141,0,0,0,7.341,12.042Zm0,1.528c-1.709,0-5.091.8-5.091,2.431v1.875H12.536V16C12.536,14.368,9.05,13.569,7.341,13.569Zm5.818.382a3.991,3.991,0,0,0-.623.035A2.059,2.059,0,0,1,13.679,16v1.875H18.25V16C18.25,14.368,14.868,13.951,13.159,13.951Z"
                                transform="translate(-2.25 -7.875)"
                                fill="var(--primary-text)"
                            />
                        </svg>
                        <div>Groups</div>
                    </div>
                </a>
            </li>
            <li class="menu-item menu-item-protected">
                <a class="menu-link" href="#" is="router-link">
                    <div class="menu-group">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16.001"
                            height="16.001"
                            viewBox="0 0 16.001 16.001"
                        >
                            <path
                                d="M17.451,12.176a5,5,0,0,0,.041-.8c0-.28-.041-.52-.041-.8l1.718-1.32a.367.367,0,0,0,.082-.52l-1.637-2.76a.4.4,0,0,0-.491-.16l-2.046.8a5.955,5.955,0,0,0-1.391-.8L13.4,3.7a.438.438,0,0,0-.409-.32H9.718a.438.438,0,0,0-.409.32l-.327,2.12a6.929,6.929,0,0,0-1.391.8l-2.046-.8a.383.383,0,0,0-.491.16L3.417,8.736a.483.483,0,0,0,.082.52l1.759,1.32c0,.28-.041.52-.041.8s.041.52.041.8L3.54,13.5a.367.367,0,0,0-.082.52L5.1,16.776a.4.4,0,0,0,.491.16l2.046-.8a5.954,5.954,0,0,0,1.391.8l.327,2.12a.4.4,0,0,0,.409.32h3.273a.438.438,0,0,0,.409-.32l.328-2.12a6.925,6.925,0,0,0,1.391-.8l2.046.8a.383.383,0,0,0,.491-.16l1.637-2.76a.482.482,0,0,0-.082-.52Zm-6.1,2a2.8,2.8,0,1,1,2.864-2.8A2.815,2.815,0,0,1,11.355,14.176Z"
                                transform="translate(-3.375 -3.375)"
                                fill="var(--primary-text)"
                            />
                        </svg>
                        <div>Preferences</div>
                    </div>
                </a>
            </li>
            <li class="menu-item menu-item-protected">
                <button class="menu-logout">
                    <div class="menu-group">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16.001"
                            height="16.001"
                            viewBox="0 0 16.001 16.001"
                        >
                            <g transform="translate(0)">
                                <path
                                    d="M13.5,15.766h7.3L19.12,17.485l1.15,1.15,3.693-3.693L20.27,11.25,19.077,12.4,20.8,14.119H13.5Z"
                                    transform="translate(-7.961 -6.942)"
                                    fill="var(--primary-text)"
                                />
                                <g transform="translate(0 0)">
                                    <path
                                        d="M11.364,17.734A6.358,6.358,0,1,1,15.845,6.871l1.165-1.165a8.5,8.5,0,0,0-1.065-.892,8.007,8.007,0,1,0,1.062,12.228L15.845,15.88A6.3,6.3,0,0,1,11.364,17.734Z"
                                        transform="translate(-3.375 -3.375)"
                                        fill="var(--primary-text)"
                                    />
                                    <path
                                        d="M31.458,17.958H31.5V18h-.046Z"
                                        transform="translate(-16.095 -9.98)"
                                        fill="var(--primary-text)"
                                    />
                                </g>
                            </g>
                        </svg>
                        <div>Log Out</div>
                    </div>
                </button>
            </li>
            <li class="menu-item">
                <a href="/login" class="menu-link">
                    <div class="menu-group">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16.001"
                            height="16.001"
                            viewBox="0 0 16.001 16.001"
                        >
                            <g transform="translate(0)">
                                <path
                                    d="M13.5,15.766h7.3L19.12,17.485l1.15,1.15,3.693-3.693L20.27,11.25,19.077,12.4,20.8,14.119H13.5Z"
                                    transform="translate(-7.961 -6.942)"
                                    fill="var(--primary-text)"
                                />
                                <g transform="translate(0 0)">
                                    <path
                                        d="M11.364,17.734A6.358,6.358,0,1,1,15.845,6.871l1.165-1.165a8.5,8.5,0,0,0-1.065-.892,8.007,8.007,0,1,0,1.062,12.228L15.845,15.88A6.3,6.3,0,0,1,11.364,17.734Z"
                                        transform="translate(-3.375 -3.375)"
                                        fill="var(--primary-text)"
                                    />
                                    <path
                                        d="M31.458,17.958H31.5V18h-.046Z"
                                        transform="translate(-16.095 -9.98)"
                                        fill="var(--primary-text)"
                                    />
                                </g>
                            </g>
                        </svg>
                        <div>Log In</div>
                    </div>
                </a>
            </li>
        </ol>
    </nav>
`;

class MainMenu extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

if (!customElements.get('main-menu')) {
    customElements.define('main-menu', MainMenu);
}

export default MainMenu;
