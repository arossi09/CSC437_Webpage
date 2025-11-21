import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";
//import reset from "../styles/reset.css";

export class SongSectionElement extends LitElement {
	@property()
	type = "";

	@property()
	lyrics = "";

	override render() {
		return html`
			<section>
				<h3>${this.type}</h3>
				<p>${this.lyrics}</p>
			</section>
		`;
	}

	static styles = [
		css ``
	];
}

