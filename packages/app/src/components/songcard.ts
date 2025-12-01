//src/songcard.ts

import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";
import reset from "../styles/reset.css";

export class SongCardElement extends LitElement {
	@property({ type: String }) title = "";
	@property({ type: String }) artist = "";
	@property({ type: String }) difficulty = "";
	@property({ type: String }) genre = "";
	@property({ type: String }) songId = "";
	/*
	@property({ type: String }) song_link = "";
	@property({ type: String }) artist_link = "";
	@property({ type: String }) difficulty_link= "";
	@property({ type: String }) genre_link= "";
	*/

	override render() {
		return html`
				<li class ="song">
					<svg class="icon">
						<use href="/icons/instruments.svg#icon-guitar"/>
					</svg>
					<a href="/app/song/${this.songId}">${this.title}</a>
					by
					${this.artist}
					(Tags:
					${this.difficulty},
					${this.genre})
				</li>

		`;
	}

	static styles = [
		reset.styles,
		css`
			:host {
        display: contents;
      }
			svg.icon {
				display: inline;
				height: 2em;
				width: 2em;
				vertical-align: top;
				fill: currentColor;

			}

			a {
				color: var(--color-link);
				font-weight: bold;
				text-decoration: none;
			}
			.song{
			gap: var(--size-spacing-small);
			border: 1px dotted;
			background-color: var(--color-song-card);
			padding: var(--size-spacing-small);
			margin: var(--size-spacing-small);
			text-align: center; 
			}
	`,
	];
}
