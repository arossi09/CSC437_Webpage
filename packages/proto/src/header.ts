import { Auth, Events, Observer } from "@calpoly/mustang";
import { html, css, LitElement } from "lit";
//import headings from "./styles/headings.css.ts";
import { state } from "lit/decorators.js";
import reset from "./styles/reset.css.ts";

export class HeaderElement extends LitElement {
	_authObserver = new Observer<Auth.Model>(this, "tabs:auth");

	@state()
	loggedIn = false;

	@state()
	userid?: string;

	connectedCallback() {
		super.connectedCallback();

		this._authObserver.observe((auth: Auth.Model) => {
			const { user } = auth;

			if (user && user.authenticated) {
				this.loggedIn = true;
				this.userid = user.username;
			} else {
				this.loggedIn = false;
				this.userid = undefined;
			}
		});
	}

	static initializeOnce() {
		function toggleDarkMode(page: HTMLElement | null, checked: any) {
			page?.classList.toggle("dark-mode", checked);
		}

		document.body.addEventListener("dark-mode", (event: Event) =>
			toggleDarkMode(
				event.currentTarget as HTMLElement,
				(event as CustomEvent).detail.checked,
			),
		);
	}

	renderSignOutButton() {
		return html`
			<button
				@click=${(e: UIEvent) => {
				Events.relay(e, "auth:message", ["auth/signout"]);
			}}
				>
				Sign Out
				</button>
		`;
	}

	renderSignInButton() {
		return html`
			<a href="/login.html">
				Sign In...
					</a>

		`;
	}

	render() {
		return html`
			<header>
				<h1>
					Songs
				</h1>
				<nav>
					<a href="instrument.html">Instruments</a>
					<a href="genre_list.html">Genres</a>
					<a href="difficulty_list.html">Difficulties</a>
					<a href="index.html">Songs</a>
				</nav>
				<label @change=${(event: Event) => Events.relay(event, "dark-mode", { checked: (event.target as HTMLInputElement)?.checked })}>
				<input type= "checkbox" autocomplete = "off" >
					Dark Mode
						</label>

		Hello, ${this.userid || "musician"}
		${this.loggedIn ? this.renderSignOutButton() : this.renderSignInButton()}
		<script>
					const page = document.body;
		page.addEventListener("dark-mode:toggle", (event) => {
			const checked = event.detail.checked;
			page.classList.toggle("dark-mode", checked);
		});
		</script>
			</header>
				`;
	}

	static styles = [
		reset.styles,
		css`
		:host {
	display: block;
	grid-column: start / end;
	width: 100%;
}

header {
	flex-basis: min-content;
	grid-column: start / end;
	display: flex;
	align-items: baseline;
	justify-content: space-between;
	background-color: black;
	color: white;
	font-family: "Chelsea Market", system-ui;
	font-weight: 400;
	font-style: normal;
}

nav {
	text-align: right;
	margin: var(--size-spacing-medium);
}

nav > a {
	color: white;
	text-align: right;
}

		`,
	];
}
