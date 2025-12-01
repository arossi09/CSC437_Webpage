import { Auth, Events, Observer } from "@calpoly/mustang";
import { html, css, LitElement } from "lit";
//import headings from "./styles/headings.css.ts";
import { state } from "lit/decorators.js";
import reset from "../styles/reset.css";


function toggleDarkMode(ev: InputEvent) {
	const target = ev.target as HTMLInputElement;
	const checked = target.checked;

	Events.relay(ev, "dark-mode", { checked });
}

export class HeaderElement extends LitElement {
	_authObserver = new Observer<Auth.Model>(this, "goodtabs:auth");

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
		GoodTabs
		</h1>
		<nav>
	<!-- 
		<a href="instrument.html">Instruments</a>
		<a href="genre_list.html">Genres</a>
		<a href="difficulty_list.html">Difficulties</a>
		<a href="index.html">Songs</a>
		-->
		</nav>

		<div class="grouped-header">
		Hello, ${this.userid || "musician"}
		${this.loggedIn ? this.renderSignOutButton() : this.renderSignInButton()}
		<label @change=${toggleDarkMode}>
		<input type="checkbox" />
		Dark Mode
		</label>		
		</div>
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

			.grouped-header{
				display:flex;
				margin: 10 10;
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

			a {
				color: var(--color-link);
				font-weight: bold;
				text-decoration: none;
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
