import { css, html, LitElement } from "lit";

export class HomeViewElement extends LitElement {
	render() {
		return html`
			<main class="page">
				<song-list src="/api/songcards">
				</song-list>
			</main>
		`;
	}
	static styles = css` 

svg.icon {
	display: inline;
	height: 2em;
	width: 2em;
	vertical-align: top;
	fill: currentColor;

}
	ul {
		list-style-type: none;

		padding: var(--size-spacing-small);
		margin: var(--size-spacing-small);
	}

	.saved {
		grid-column-start: 4;
	}
	.page {
		display: grid;
		grid-template-columns: [start] 1fr 1fr 1fr 1fr[end];


		@media screen and (max-width: 30rem) {

			/*this rules applies up to max width of 30em*/
			display: block;
			flex-basis: auto;
		}
	}

			.song {
				border: solid;
				border-style: ridge;
				background-color: var(--color-song-card);
				padding: var(--size-spacing-small);
				margin: var(--size-spacing-small);
				text-align: center; 
			}
	`;
}
