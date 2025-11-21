
import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";
//import reset from "../styles/reset.css";

export class ChordSheetElement extends LitElement {
	@property()
	section = "";

	@property({type: Array})
	chords : string[] =[] 

	@property({type: Boolean})
	inline = false;

	override render() {
		if (this.inline){
			return html `<p><strong>${this.section}:</strong> ${this.chords.join(" ")}</p>`;
		}else{

			return html`
			<div>

				<h4>${this.section}</h4>
				<pre>${this.chords.join(" ")}</pre>
			</div>
			`;
		}
	}

	static styles = [
		css ``
	];
}

