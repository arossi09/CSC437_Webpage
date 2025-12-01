import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";
import reset from "../styles/reset.css";

export class SongSectionElement extends LitElement {
	@property()
	type = "";

	@property()
	lyrics = "";

	override render() {
		return html`
			<section>
				<h4>[${this.type}]</h4>
				<pre>${this.lyrics}</pre>
			</section>
		`;
	}

	static styles = [
		reset.styles,
		css`

			:host {
        display: contents;
      }
		`
	];
}

