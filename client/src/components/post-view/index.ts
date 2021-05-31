/** @module Component/PostView */
import html from '../../utils/html-tag';
import convertDate from '../../utils/convert-date';
import activateLinks from '../../utils/activate-links';
import Elements from '../../interfaces/elements-interface';
import Answer from '../../interfaces/answer-interface';
import BrowserRouter from '../browser-router/index';
import socket from '../../contexts/socketio';
import auth from '../../contexts/auth';
import '../primary-heading/index';
import '../secondary-heading/index';
import '../user-entry/index';
import '../download-button/index';
import '../post-answer-form/index';
import '../post-answer/index';

const template = document.createElement('template');
template.innerHTML = html`
    <style>
        .post-body {
            padding: 2.5rem;
            background-color: var(--secondary-bg);
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
            border-radius: 10px;
        }

        .post-section:not(:first-child) {
            margin-top: 3.5rem;
        }

        .post-title {
            margin-bottom: 3.5rem;
        }

        .post-content {
            margin: 1.5rem 0 0 0;
            word-break: break-word;
        }

        .post-content > a {
            color: var(--accent);
        }

        .post-files {
            display: flex;
            flex-wrap: wrap;
        }

        .post-files > * {
            margin: 1.5rem 1.5rem 0 0;
        }

        .post-images > * {
            display: block;
            margin: 1.5rem 0 0 0;
            max-width: 100%;
            border: 1px solid var(--border);
        }

        .post-tags {
            display: flex;
            flex-wrap: wrap;
            margin: 0;
            padding: 0;
            list-style-type: none;
        }

        .post-tags > * {
            margin-top: 1.5rem;
            color: var(--accent);
        }

        .post-tags > *:not(:last-child) {
            margin-right: 1.5rem;
        }

        .post-tags a {
            text-decoration: none;
            color: var(--accent);
        }

        .post-tags a:hover {
            text-decoration: underline;
        }
    </style>
    <article class="post">
        <section class="post-section">
            <primary-heading class="post-title" data-color="var(--accent)">
            </primary-heading>
            <div class="post-body">
                <user-entry class="post-user"></user-entry>
                <p class="post-content"></p>
                <div class="post-images"></div>
                <div class="post-files"></div>
                <ul class="post-tags"></ul>
            </div>
        </section>
        <section class="post-section">
            <post-answer-form class="post-answer-form"></post-answer-form>
        </section>
        <section class="post-section">
            <secondary-heading class="post-answers-count"></secondary-heading>
            <div class="post-answers"></div>
        </section>
    </article>
`;

class PostView extends HTMLElement {
    /** Post's data fetched from the server. */
    private details;

    /** Buffered HTML elements. */
    private el: Elements = {};

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
        this.loadElements();
        this.addEventListeners();
        socket.io.on('postAnswer', (details) => this.handleNewAnswer(details));
    }

    /** Buffers required HTML elements. */
    loadElements(): void {
        const requestedElements = {
            user: this.shadowRoot?.querySelector('.post-user'),
            title: this.shadowRoot?.querySelector('.post-title'),
            content: this.shadowRoot?.querySelector('.post-content'),
            files: this.shadowRoot?.querySelector('.post-files'),
            images: this.shadowRoot?.querySelector('.post-images'),
            tags: this.shadowRoot?.querySelector('.post-tags'),
            form: this.shadowRoot?.querySelector('.post-answer-form'),
            answers: this.shadowRoot?.querySelector('.post-answers'),
            count: this.shadowRoot?.querySelector('.post-answers-count'),
        };
        for (const element in requestedElements) {
            if (element) {
                this.el[element] = requestedElements[element];
            }
        }
    }

    /** Adds global and local event listeners. */
    addEventListeners(): void {
        window.addEventListener('authchange', () => this.protectForm());
    }

    /** Shows or hides the answer form based on the user's auth status. */
    protectForm(): void {
        if (auth.ok) {
            this.el.form.style.display = 'block';
            return;
        }
        this.el.form.style.display = 'none';
    }

    /** Requests post's data from the server. */
    async loadDetails(): Promise<void> {
        const currentPostId = this.dataset.id;
        const currentPost = await fetch(`/api/post/${currentPostId}`);
        if (!currentPost.ok) {
            BrowserRouter.redirect('/404');
            return;
        }
        const details = await currentPost.json();
        const postAnswers = await fetch(`/api/post/${currentPostId}/answers`);
        details.answers = await postAnswers.json();
        this.details = details;
    }

    /** Creates post-answer component based on provided properties. */
    createAnswerElement(details: Answer): HTMLElement {
        /** Answer Author */
        const userImage = document.createElement('img');
        userImage.setAttribute('slot', 'image');
        userImage.setAttribute(
            'alt',
            `${details.user.firstName}'s profile picture`
        );
        userImage.setAttribute('src', details.user.profilePhoto);
        const userName = document.createElement('span');
        userName.setAttribute('slot', 'name');
        userName.textContent = `${details.user.firstName} ${details.user.lastName}`;
        const userTime = document.createElement('time');
        userTime.setAttribute('slot', 'time');
        userTime.setAttribute('datetime', details.createdAt);
        userTime.textContent = convertDate(new Date(details.createdAt));
        setInterval(() => {
            userTime.textContent = convertDate(new Date(details.createdAt));
        }, 36000);
        const user = document.createElement('user-entry');
        user.setAttribute('slot', 'user');
        user.appendChild(userImage);
        user.appendChild(userName);
        user.appendChild(userTime);
        /** Answer Content */
        const p = document.createElement('p');
        p.setAttribute('slot', 'content');
        p.innerHTML = activateLinks(details.content);
        /** Answer Element */
        const postAnswer = document.createElement('post-answer');
        postAnswer.appendChild(user);
        postAnswer.appendChild(p);
        return postAnswer;
    }

    /** Displays a new count of answers. */
    updateAnswersCount(count: number): void {
        this.el.count.textContent =
            count === 1 ? `${count} Answer` : `${count} Answers`;
    }

    /** Populates the post-view component with data downloaded from the server. */
    displayDetails(): void {
        if (!this.details) {
            return;
        }
        /** Post Author */
        const userImage = document.createElement('img');
        userImage.setAttribute('slot', 'image');
        userImage.setAttribute(
            'alt',
            `${this.details.user.firstName}'s profile picture`
        );
        userImage.setAttribute('src', this.details.user.profilePhoto);
        const userName = document.createElement('span');
        userName.setAttribute('slot', 'name');
        userName.textContent = `${this.details.user.firstName} ${this.details.user.lastName}`;
        const userTime = document.createElement('time');
        userTime.setAttribute('slot', 'time');
        userTime.setAttribute('datetime', this.details.createdAt);
        userTime.textContent = convertDate(new Date(this.details.createdAt));
        this.el.user.appendChild(userImage);
        this.el.user.appendChild(userName);
        this.el.user.appendChild(userTime);
        /** Post Title */
        this.el.title.textContent = this.details.title;
        /** Post Content */
        this.el.content.innerHTML = activateLinks(this.details.content);
        /** Post Files */
        const imagesFragment = document.createDocumentFragment();
        const filesFragment = document.createDocumentFragment();
        this.details.files.forEach((file) => {
            const resource = `/api/${file.uri}`;
            /** If the file is an image, then render it. */
            if (file.mimetype.includes('image')) {
                const image = document.createElement('img');
                image.src = resource;
                imagesFragment.appendChild(image);
                return;
            }
            /** Otherwise, create a download button. */
            const link = document.createElement('a');
            link.href = resource;
            link.setAttribute('download', file.name);
            const button = document.createElement('download-button');
            button.textContent = file.name;
            link.appendChild(button);
            filesFragment.appendChild(link);
        });
        this.el.images.appendChild(imagesFragment);
        this.el.files.appendChild(filesFragment);
        /** Post Tags */
        const tagsFragment = document.createDocumentFragment();
        this.details.tags.forEach((tag) => {
            const item = document.createElement('li');
            const link = document.createElement('a', { is: 'router-link' });
            link.href = `/search?query=${tag.name}`;
            link.textContent = `#${tag.name}`;
            item.appendChild(link);
            tagsFragment.appendChild(item);
        });
        this.el.tags.appendChild(tagsFragment);
        /** Answer Form */
        this.el.form.setAttribute('data-post', this.dataset.id ?? '');
        /** Answers Count */
        this.updateAnswersCount(this.details.answers.length);
        const answersFragment = document.createDocumentFragment();
        this.details.answers.forEach((answer) => {
            const postAnswer = this.createAnswerElement(answer);
            answersFragment.appendChild(postAnswer);
        });
        this.el.answers.appendChild(answersFragment);
    }

    /** Renders a new answer at the end of the list. */
    handleNewAnswer(details: Answer): void {
        if (details.postId === this.dataset.id) {
            const postAnswer = this.createAnswerElement(details);
            this.el.answers.appendChild(postAnswer);
            this.updateAnswersCount(this.el.answers.children.length);
            if (details.userId === auth.user.id) {
                window.scrollTo({
                    left: 0,
                    top: document.body.scrollHeight,
                    behavior: 'smooth',
                });
            }
        }
    }

    /** Removes data from all populated HTML elements. */
    clearDetails(): void {
        [...this.el.user.children].forEach((child) => child.remove());
        this.el.title.textContent = '';
        this.el.content.textContent = '';
        [...this.el.files.children].forEach((file) => file.remove());
        [...this.el.images.children].forEach((image) => image.remove());
        [...this.el.tags.children].forEach((tag) => tag.remove());
        this.el.count.textContent = '0';
        [...this.el.answers.children].forEach((answer) => answer.remove());
    }

    connectedCallback(): void {
        (async () => {
            await this.loadDetails();
            this.clearDetails();
            this.displayDetails();
            socket.io.emit('subscribePost', this.dataset.id);
        })();
    }

    disconnectedCallback(): void {
        this.clearDetails();
        socket.io.emit('unsubscribePost', this.dataset.id);
    }
}

if (!customElements.get('post-view')) {
    customElements.define('post-view', PostView);
}

export default PostView;
