import { define, Form, View, History } from "@calpoly/mustang";
import { html, css } from "lit";
import { property, state } from "lit/decorators.js";
import { Song } from "server/models";
import { Msg } from "../messages";
import { Model } from "../model";
import reset from "../styles/reset.css";

export class SongEditElement extends View<Model, Msg> {
	static uses = define({
		"mu-form": Form.Element,
	});

	@property({ attribute: "song-id" })
	songid = "";

	@state()
	get song(): Song | undefined {
		return this.model.song;
	}

	@state()
	additionalSections = 0;

	@state()
	additionalChords = 0;

	@state()
	additionalTabs = 0;

	constructor() {
		super("goodtabs:model");
	}

	static styles = [
		reset.styles,
		css` 
		main.page {
        --page-grids: 8;

        display: grid;
        grid-column: 1/-1;
        grid-template-columns: repeat(var(--page-grids), 1fr);
        gap: var(--size-spacing-small)
          var(--size-spacing-medium);
        padding: var(--size-spacing-medium);
        grid-template-rows: auto auto 1fr auto;
        grid-template-areas: "-- fm fm fm fm fm fm -1";
        gap: var(--size-spacing-medium)
          var(--size-spacing-large);
      }
      mu-form {
        display: grid;
        grid-area: fm;
        grid-template-columns: subgrid;
      }
      input {
        grid-column: input / span 2;
      }
			h3 {
				grid-column: 1 / -1;
				text-decoration: underline;
			}
			fieldset {
				grid-column: 2 / 6;
				display: grid;
				grid-template-columns: subgrid;
				gap: var(--size-spacing-medium);

				> legend {
					grid-column: 1 / -1;
				}

				> label {
					display: grid;
					grid-template-columns: subgrid;
					gap: var(--size-spacing-small);
				}

				> label:has(select) {
					grid-column: 1 / -1;  
					display: flex;
					flex-direction: column;
					gap: var(--size-spacing-xsmall);

					> span {
						font-size: 0.85rem;
						font-weight: 500;
					}

					> select {
						width: fit-content;
						max-width: 200px;
						padding: var(--size-spacing-small);
						border: 1px solid var(--color-border, #ccc);
						border-radius: var(--size-radius-small, 4px);
						font-size: 0.9rem;
					}
				}

				> label:has(textarea) {
					grid-column: 1 / -1;
					display: flex;
					flex-direction: column;
					gap: var(--size-spacing-small);

					> span {
						font-weight: 500;
						font-size: 0.95rem;
					}

					> textarea {
						min-height: 120px;
						padding: var(--size-spacing-small);
						border: 1px solid var(--color-border, #ccc);
						border-radius: var(--size-radius-small, 4px);
						font-family: inherit;
						font-size: 0.95rem;
						resize: vertical;
						line-height: 1.5;

						&:focus {
							outline: 2px solid var(--color-accent, #007bff);
							outline-offset: 1px;
						}
					}
				}
			}
			.add-section-btn {
        grid-column: 2 / 4;
        padding: var(--size-spacing-small) var(--size-spacing-medium);
      }

			.remove-section-btn {
        grid-column: 4 / 6;
        padding: var(--size-spacing-small) var(--size-spacing-medium);
      }
		`,
	];

	render() {
		const init = this.song
			? {
				...this.song,

				...(this.song.sections?.reduce((acc, section, i) => {
					acc[`section-${i}-type`] = section.type;
					acc[`section-${i}-lyrics`] = section.lyrics;
					return acc;
				}, {} as any) || {}),

				...(this.song.chords?.reduce((acc, chord, i) => {
					acc[`chord-${i}-type`] = chord.section;
					acc[`chord-${i}-chords`] = chord.chords;
					return acc;
				}, {} as any) || {}),

				...(this.song.tabs?.reduce((acc, tab, i) => {
					acc[`tab-${i}-type`] = tab.section;
					acc[`tab-${i}-tabBody`] = tab.tabBody;
					return acc;
				}, {} as any) || {}),
			}
			: {};

		const sectionsCount =
			(this.song?.sections?.length || 0) + this.additionalSections;
		const chordsCount =
			(this.song?.chords?.length || 0) + this.additionalChords;
		const tabsCount = (this.song?.tabs?.length || 0) + this.additionalTabs;

		return html`
    <main class="page">
      <mu-form .init=${init} @mu-form:submit=${this.handleSubmit}>

					<h3>Song Information</h3>
					<label>
            <span>Song Title</span>
            <input name="title" />
					</label>

					<label>
            <span>Artist</span>
            <input name="artist" />
					</label>

					<label>
						<span>Difficulty</span>
						<select name="difficulty">
							<option value="easy"> Easy </option>
							<option value="medium"> Medium  </option>
							<option value="hard"> Hard</option>
						</select>
          </label>

					<label>
						<span>Genre</span>
						<input name="genre"/>
					</label>


					<label>
						<span>Key</span>
						<input name="key"/>
					</label>

					<label>
						<span>BPM</span>
						<input name="bpm"/>
					</label>

        <h3>Lyrics Sections</h3>
        ${Array.from(
			{ length: sectionsCount },
			(_, i) => html`
          <fieldset>
            <legend>Section ${i + 1}</legend>
            
            <label>
              <span>Type</span>
              <select name="section-${i}-type" .value=${init[`section-${i}-type`] || ""}>
                <option value="intro">Intro</option>
                <option value="verse">Verse</option>
                <option value="prechorus">Prechorus</option>
                <option value="chorus">Chorus</option>
                <option value="bridge">Bridge</option>
                <option value="solo">Solo</option>
                <option value="outro">Outro</option>
                <option value="other">Other</option>
              </select>
            </label>
            
            <label>
              <span>Lyrics</span>
              <textarea name="section-${i}-lyrics">${init[`section-${i}-lyrics`] || ""}</textarea>
            </label>
          </fieldset>
        `,
		)}
		<button 
		type="button"
		class="add-section-btn"
		@click=${() => this.additionalSections++}>
		+ Add Lyrics Section
		</button>
		<button 
		type="button"
		class="remove-section-btn"
		@click=${() => this.additionalSections--}>
		- Add Lyrics Section
		</button>




        <h3>Chords Sections</h3>
        ${Array.from(
			{ length: chordsCount },
			(_, i) => html`
          <fieldset>
            <legend>Section ${i + 1}

						</legend>
            
            <label>
              <span>Type</span>
              <select name="chord-${i}-type" .value=${init[`chord-${i}-type`] || ""}>
                <option value="intro">Intro</option>
                <option value="verse">Verse</option>
                <option value="prechorus">Prechorus</option>
                <option value="chorus">Chorus</option>
                <option value="bridge">Bridge</option>
                <option value="solo">Solo</option>
                <option value="outro">Outro</option>
                <option value="other">Other</option>
              </select>
            </label>
            
            <label>
              <span>Chords</span>
              <textarea name="chord-${i}-chords"> ${init[`chord-${i}-chords`] || ""}</textarea>
            </label>
          </fieldset>
        `,
		)}
		<button 
            type="button" 
            class="add-section-btn"
            @click=${() => this.additionalChords++}>
            + Add Chords Section
    </button>
		<button 
            type="button" 
            class="remove-section-btn"
            @click=${() => this.additionalChords--}>
            - Add Chords Section
    </button>


        <h3>Tabs Sections</h3>
        ${Array.from(
			{ length: tabsCount },
			(_, i) => html`
          <fieldset>
            <legend>Section ${i + 1}</legend>
            
            <label>
              <span>Type</span>
              <select name="tab-${i}-type" .value=${init[`tab-${i}-type`] || ""}>
                <option value="intro">Intro</option>
                <option value="verse">Verse</option>
                <option value="prechorus">Prechorus</option>
                <option value="chorus">Chorus</option>
                <option value="bridge">Bridge</option>
                <option value="solo">Solo</option>
                <option value="outro">Outro</option>
                <option value="other">Other</option>
              </select>
            </label>
            
            <label>
              <span>Tabs</span>
              <textarea name="tab-${i}-tabBody"> ${init[`tab-${i}-tabBody`] || ""}</textarea>
            </label>
          </fieldset>
        `,
		)}
		<button 
			type="button" 
			class="add-section-btn"
			@click=${() => this.additionalTabs++}>
			+ Add Tab Section
		</button>
		<button 
			type="button" 
			class="remove-section-btn"
			@click=${() => this.additionalTabs--}>
			- Add Tab Section
		</button>
      </mu-form>
    </main>`;
	}

	handleSubmit(event: Form.SubmitEvent<Song>) {
		console.log("Submitting form", event);
		console.log("Form data:", JSON.stringify(event.detail, null, 2));

		let json = event.detail as any;

		const ex = (n: string) => {
			const value = json[n];
			delete json[n];
			return value;
		};

		const sectionsCount =
			(this.song?.sections?.length || 0) + this.additionalSections;
		const chordsCount =
			(this.song?.chords?.length || 0) + this.additionalChords;
		const tabsCount = (this.song?.tabs?.length || 0) + this.additionalTabs;
		// Reconstruct sections array
		json.sections = Array.from({ length: sectionsCount }, (_, i) => ({
			type: ex(`section-${i}-type`),
			lyrics: ex(`section-${i}-lyrics`),
		}));

		// Reconstruct chords array
		json.chords = Array.from({ length: chordsCount }, (_, i) => ({
			section: ex(`chord-${i}-type`),
			chords: ex(`chord-${i}-chords`),
		}));

		json.tabs = Array.from({ length: tabsCount }, (_, i) => ({
			section: ex(`tab-${i}-type`),
			chords: ex(`tab-${i}-tabBody`),
		}));

		console.log("Reconstructed data:", json);
		this.dispatchMessage([
			"song/save",
			{
				songid: this.songid,
				song: json,
			},
			{
				onSuccess: () =>
					History.dispatch(this, "history/navigate", {
						href: `/app/song/${this.songid}`,
					}),
				onFailure: (error: Error) => console.log("ERROR:", error),
			},
		]);
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string) {
		super.attributeChangedCallback(name, oldValue, newValue);

		if (name === "song-id" && newValue) {
			this.dispatchMessage(["song/request", { songid: newValue }]);
		}
	}
}
