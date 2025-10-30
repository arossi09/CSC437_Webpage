import { html, css, LitElement } from "lit";
import { state, property } from "lit/decorators.js";
import reset from "./styles/reset.css.ts";

interface songCard {
	title: string;
	artist: string;
	difficulty: string;
	genre: string;
	song_link: string | undefined;
	artist_link: string | undefined;
	genre_link: string | undefined;
	difficulty_link: string | undefined;
}

export class SongElement extends LitElement {
	@property() src?: string;

	@state()
	songCards: Array<songCard> = [];

	connectedCallback() {
		super.connectedCallback();
		if (this.src) this.hydrate(this.src);
	}

	hydrate(src: string) {
		fetch(src)
			.then((res) => res.json())
			.then((json: object) => {
				if (json) {
					const songs = json as {
						songCards: Array<object>;
					};
					this.songCards = songs.songCards as Array<songCard>;
				}
			});
	}

	render() {
		const { songCards } = this;

		function renderSongCards(songCard: songCard) {
			return html`
				<song-card title=${songCard.title}
				           artist=${songCard.artist}
				           difficulty=${songCard.difficulty}
				           genre=${songCard.genre}
				           song_link=${songCard.song_link}
				           artist_link=${songCard.artist_link}
				           difficulty_link=${songCard.difficulty_link}
				           genre_link=${songCard.genre_link}
				>
				</song-card>
		`;
		}
		return html`
			<ul class="songs">
				${songCards.map(renderSongCards)}
			</ul>
		`;
	}

	static styles = [
		reset.styles,
		css`

.songs {
	display: grid;
	grid-template-columns: [start] 1fr 1fr 1fr[end];
	margin: var(--size-spacing-small);
	padding: var(--size-spacing-small);

	@media screen and (max-width: 30rem) {
		/*this rules applies up to max width of 30em*/
		display: flex;
		flex-wrap: wrap;
		flex-basis: auto;
	}

	&>* {

		/*flex-grow: 1;*/
		/*any descendant of songs is affected by this*/

		@media screen and (max-width: 30rem) {

			/*this rules applies up to max width of 30em*/
			display: flex;
			flex-basis: auto;
		}
	}

}
	`,
	];
}
