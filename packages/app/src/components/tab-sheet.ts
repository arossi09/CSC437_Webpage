import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";
import reset from "../styles/reset.css";

export class TabSheetElement extends LitElement {
	
	@property()
	section = "";

	@property()
	tabBody = "";

	override render() {
		return html`
			<div class="tab-sheet">
        <h4>[${this.section}]</h4>
        <pre><code>${this.tabBody}</code></pre>
      </div>		`;
	}

	static styles = [
		reset.styles,
		css`
			
			:host {
        display: contents;
      }
		`];
}
