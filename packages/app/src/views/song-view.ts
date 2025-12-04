import { define, View } from "@calpoly/mustang";
import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { TabSheetElement } from "../components/tab-sheet";
import { ChordSheetElement } from "../components/chord-sheet";
import { SongSectionElement } from "../components/song-section";
import { Song } from "server/models";
import { Msg } from "../messages";
import { Model } from "../model";
import reset from "../styles/reset.css";

export class SongViewElement extends View<Model, Msg> {
	static uses = define({
		"tab-sheet": TabSheetElement,
		"chord-sheet": ChordSheetElement,
		"song-section": SongSectionElement,
	});

	@property({ attribute: "song-id" })
	songId?: string;

	@state()
	get song(): Song | undefined {
		return this.model.song;
	}

	constructor() {
		super("goodtabs:model");
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string) {
		super.attributeChangedCallback(name, oldValue, newValue);
		if (name === "song-id" && oldValue !== newValue && newValue) {
			this.dispatchMessage(["song/request", { songid: newValue }]);
		}
	}

	render() {
		if (!this.song) return html`<p> Loading song</p>`;

		return html`
			<main class="page">
        <header>
					<div class="grouped">
						<h2>${this.song.title}</h2> by
						<h3>${this.song.artist}</h3>
					</div>
					<div class="grouped meta">
					Difficulty: ${this.song.difficulty} ⋆
          ${this.song.key ? html`<p>Key: ${this.song.key}</p>` : ""} ⋆
          ${this.song.bpm ? html`<p>BPM: ${this.song.bpm}</p>` : ""} ⋆
					<a href="/app/song/${this.songId}/edit">Edit Song</a>
					</div>
        </header>

				<hr>

				<div class="song-layout">
        <section class="lyrics">
				<h3> Lyrics </h3>
          ${this.song.sections?.map(
			(s: any) =>
				html`<song-section
                .type=${s.type}
                .lyrics=${s.lyrics}
              ></song-section>`,
		)}
        </section>

        <section class="chords">
				<h3> Chords </h3>
          ${this.song.chords?.map(
			(c: any) =>
				html`<chord-sheet
                .section=${c.section}
                .chords=${c.chords}
                .inline=${c.inline || false}
              ></chord-sheet>`,
		)}
        </section>

        <section class="tabs">
				<h3> Tabs</h3>
          ${this.song.tabs?.map(
			(t: any) =>
				html`<tab-sheet
                .section=${t.section}
                .tabBody=${t.tabBody}
              ></tab-sheet>`,
		)}
        </section>
				</div>
      </main>
		`;
	}

	static styles = [
		reset.styles,
		css`
    :host {
      display: block;
    }

    header {
      margin-bottom: 1rem;
    }

		.page{

			display: grid;
			place-content: center;
			width: 100%;
			min-width: 1400px;
			height: auto;
			padding: 2rem;

			max-width: 1600px;
  		margin: 0 auto;
		}

    header h2,
    header h3 {
      margin: 0.25rem 0;
    }

    .grouped {
      display: flex;
      align-items: baseline;
      gap: 0.4rem;
    }

    .grouped.meta {
      font-size: 0.85rem;
      gap: 0.25rem;
      opacity: 0.9; /* subtle grunge fade */
    }

		.song-layout{
			display:grid;
			flex: 1;
			height: auto;
			grid-template-columns: 1fr 1fr;
			grid-template-rows: 1fr auto;
			grid-template-areas:
				"lyrics chords"
				"tabs tabs";
			gap: 1rem;
			padding: 1rem;
		}

		.song-layout > section h3{
			background-color: var(--color-song-card);
			color: var(--color-alt-text);
			border: 1px dotted;
			position: absolute;
			top: 0;
			left: 0;
			transform: translate(-10%, -50%) rotate(-5deg)	
		}

		.lyrics {grid-area: lyrics;}
		.chords {grid-area: chords;}
		.tabs {grid-area: tabs;}

		.song-layout > section{
			position: relative;
			overflow: visible;
			padding: 1rem;
			border: 1px dotted;
			background-color: var(--color-song-card); 
			z-index: 1;
		}

a {
	color: var(--color-link);
	font-weight: bold;
	text-decoration: none;
}

    hr {
      border: none;
      border-bottom: 1px solid rgba(0,0,0,0.15);
      margin: 1rem 0;
    }
  `,
	];
}
