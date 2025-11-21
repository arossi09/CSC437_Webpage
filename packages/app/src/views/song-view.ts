import { define, View } from "@calpoly/mustang";
import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { TabSheetElement } from "../components/tab-sheet";
import { ChordSheetElement } from "../components/chord-sheet";
import { SongSectionElement } from "../components/song-section";
import { Song } from "server/models";
import { Msg } from "../messages";
import { Model } from "../model";

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
			<main>
        <header>
          <h2>${this.song.title}</h2>
          <h3>${this.song.artist}</h3>
          ${this.song.key ? html`<p>Key: ${this.song.key}</p>` : ""}
          ${this.song.bpm ? html`<p>BPM: ${this.song.bpm}</p>` : ""}
        </header>

        <section class="sections">
          ${this.song.sections?.map(
			(s: any) =>
				html`<song-section
                .type=${s.type}
                .lyrics=${s.lyrics}
              ></song-section>`,
		)}
        </section>

        <section class="chords">
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
          ${this.song.tabs?.map(
			(t: any) =>
				html`<tab-sheet
                .instrument=${t.instrument}
                .section=${t.section}
                .tabBody=${t.tabBody}
              ></tab-sheet>`,
		)}
        </section>
      </main>
		`;
	}

	static styles = css`
    :host {
      display: block;
      padding: 1rem;
      font-family: var(--font-family-body, sans-serif);
    }

    header h2,
    header h3 {
      margin: 0.25rem 0;
    }

    section {
      margin-top: 1rem;
    }
  `;
}
