import { html, css, LitElement } from "lit";
import { Auth, Observer } from "@calpoly/mustang";
import { state, property } from "lit/decorators.js";
import reset from "../styles/reset.css.ts";

interface songCard {
	title: string;
	artist: string;
	difficulty: string;
	genre: string;
	songId: string;
}

export class SongsElement extends LitElement {
	@property() src?: string;

	@state()
	songCards: Array<songCard> = [];

	_authObserver = new Observer<Auth.Model>(this, "goodtabs:auth");
	_user?: Auth.User;

	get authorization() {
		if (this._user?.authenticated)
			return {
				Authorization: `Bearer ${(this._user as Auth.AuthenticatedUser).token}`,
			};
		return undefined;
	}

	connectedCallback() {
		super.connectedCallback();
		this._authObserver.observe((auth: Auth.Model) => {
			this._user = auth.user;
			if (this.src) this.hydrate(this.src);
		});
	}

	//gather the song cards given a src
	hydrate(src: string) {
		fetch(src, { headers: this.authorization })
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
									 songId=${songCard.songId}
				>
				</song-card>
		`;
		}
		return html`
			<ul class="songs">
				<h2>
					<div class="grouped-h2">
					list
					<a style="text-align: right;" href="/app/song/create">New Song +</a>
					</div>
					<hr>
				</h2>
				${songCards.map(renderSongCards)}
			</ul>
		`;
	}

	static styles = [
		reset.styles,
		css`
		:host {
      display: contents;
    }

    
.songs {

	grid-column-end: span 2;
	margin: var(--size-spacing-small);
	padding: var(--size-spacing-small);

	@media screen and (max-width: 30rem) {
		/*this rules applies up to max width of 30em*/
		display: flex;
		flex-wrap: wrap;
		flex-basis: auto;
	}

	hr { 
		margin: 10 10;
		border: none;
		border-top: 1px dotted;
		padding: 10 10;
	}

	.grouped-h2 {
		display: flex;
		justify-content: space-between;
		margin: 10 10;
	}

	a{
		color: var(--color-link);
		text-decoration: none;
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
