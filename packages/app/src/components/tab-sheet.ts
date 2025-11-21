import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";
//import reset from "../styles/reset.css";

export class TabSheetElement extends LitElement {
	@property()
	instrument = "";

	@property()
	section = "";

	@property()
	tabBody = "";

	override render() {
		return html`
			<div class="tab-sheet">
        <h4>${this.instrument}</h4>
        <h3>${this.section}</h3>
        <pre><code>${this.tabBody}</code></pre>
      </div>		`;
	}

	static styles = [css`

			:host {
        display: contents;
      }
		`];
}
