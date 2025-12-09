import { Auth, Observer, define, Form, View, History } from "@calpoly/mustang";
import { css, html } from "lit";
import { state } from "lit/decorators.js";
import { Song } from "server/models";
import { Msg } from "../messages";
import { Model } from "../model";
import reset from "../styles/reset.css";

export class SongCreateElement extends View<Model, Msg> {
	static uses = define({
		"mu-form": Form.Element,
	});

	_authObserver = new Observer<Auth.Model>(this, "goodtabs:auth");

	@state()
	get song(): Song | undefined {
		return this.model.song;
	}
	@state()
	loggedIn = false;

	@state()
	userid?: string;

	@state()
	sectionsCount = 1;

	@state()
	chordsCount = 1;

	@state()
	tabsCount = 1;

	constructor() {
		super("goodtabs:model");
	}

	connectedCallback() {
		super.connectedCallback();

		this._authObserver.observe((auth: Auth.Model) => {
			const { user } = auth;

			if (user && user.authenticated) {
				this.loggedIn = true;
				this.userid = user.username;
			} else {
				this.loggedIn = false;
				this.userid = undefined;
			}
		});
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
				grid-column: 2 / -1;

				text-decoration: underline;
				background-color: var(--color-song-card);
				color: var(--color-alt-text);
				border: 1px dotted;

				width: fit-content;
			}
			fieldset {
				background-color: var(--color-song-card);
				grid-column: 2 / 6;
				display: grid;
				border: 1px dotted black;
				
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
						border: 1px dotted var(--color-border, #ccc);
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
				border: none;
				color: white;
				background-color: var(--color-header);
        grid-column: 2 / 4;
        padding: var(--size-spacing-small) var(--size-spacing-medium);
      }

			.remove-section-btn {
				color: white;
				border: none;
				background-color: var(--color-header);
        grid-column: 4 / 6;
        padding: var(--size-spacing-small) var(--size-spacing-medium);
      }

			input{
				background: transparent;
				border: none;
				color: var(--color-text);
				border-bottom: 1px solid var(--color-text);
				padding: var(--size-spacing-small) 0;
			}
			input:focus {
				outline: none;


				border-bottom: 2px solid var(--color-text);
			}


			select{
				background: transparent;
				border: none;
				color: var(--color-text);
				border-bottom: 1px solid var(--color-text) ;
				padding: var(--size-spacing-small) 0;
			}

			select:focus {
				outline: none;
				border-bottom: 2px solid var(--color-text);
			}

			legend{
				background-color: 
			}


			.remove-section-btn:disabled {
				opacity: 0.4;
			}

			textarea{
				color: var(--color-text);
				background-color: var(--color-song-card);
			}

			button > submit {
				border: none;
				background-color: var(--color-header);
			}

		`,
	];

	render() {
		return html`
    <main class="page">
      <mu-form .init=${this.song} @mu-form:submit=${this.handleSubmit}>

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
							<option value="" selected disabled>— Select —</option>
							<option value="easy"> Easy </option>
							<option value="medium"> Medium  </option>
							<option value="hard"> Hard</option>
						</select>
          </label>

					<label>
						<span>Instrument</span>
						<select name="instrument">
							<option value="" selected disabled>— Select —</option>
							<option value="guitar">guitar</option>
							<option value="bass">bass</option>
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
			{ length: this.sectionsCount },
			(_, i) => html`
          <fieldset>
            <legend>Lyrics Section ${i + 1}</legend>
            
            <label>
              <span>Type</span>
              <select name="section-${i}-type" >
								<option value="" selected disabled>— Select —</option>
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
              <textarea name="section-${i}-lyrics"></textarea>
            </label>
          </fieldset>
        `,
		)}
		<button 
		type="button"
		class="add-section-btn"
		@click=${() => this.sectionsCount++}>
		+ Add Lyrics Section
		</button>
		<button 
		type="button"
		class="remove-section-btn"
		?disabled=${this.sectionsCount <= 1}
    @click=${() => {
				if (this.sectionsCount > 1) this.sectionsCount--;
			}}>
		- Remove Lyrics Section
		</button>




        <h3>Chords Sections</h3>
        ${Array.from(
				{ length: this.chordsCount },
				(_, i) => html`
          <fieldset>
            <legend>Section ${i + 1}

						</legend>
            
            <label>
              <span>Type</span>
              <select name="chord-${i}-type" >
								<option value="" selected disabled>— Select —</option>
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
              <textarea name="chord-${i}-chords"></textarea>
            </label>
          </fieldset>
        `,
			)}
		<button 
            type="button" 
            class="add-section-btn"
            @click=${() => this.chordsCount++}>
            + Add Chords Section
    </button>
		<button 
            type="button" 
            class="remove-section-btn"
							?disabled=${this.chordsCount <= 1}
            @click=${() => {
				if (this.chordsCount > 1) this.chordsCount--;
			}}>
            - Remove Chords Section
    </button>


        <h3>Tabs Sections</h3>
        ${Array.from(
				{ length: this.tabsCount },
				(_, i) => html`
          <fieldset>
            <legend>Section ${i + 1}</legend>
            
            <label>
              <span>Type</span>
              <select name="tab-${i}-type">
								<option value="" selected disabled>— Select —</option>
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
              <textarea name="tab-${i}-tabBody">  </textarea>
            </label>
          </fieldset>
        `,
			)}
		<button 
			type="button" 
			class="add-section-btn"
			@click=${() => this.tabsCount++}>
			+ Add Tab Section
		</button>
		<button 
			type="button" 
			class="remove-section-btn"
			?disabled=${this.tabsCount <= 1}
      @click=${() => {
				if (this.tabsCount > 1) this.tabsCount--;
			}}>
			- Remove Tab Section
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

		// Reconstruct sections array
		json.sections = Array.from({ length: this.sectionsCount }, (_, i) => ({
			type: ex(`section-${i}-type`),
			lyrics: ex(`section-${i}-lyrics`),
		}));

		// Reconstruct chords array
		json.chords = Array.from({ length: this.chordsCount }, (_, i) => ({
			section: ex(`chord-${i}-type`),
			chords: ex(`chord-${i}-chords`),
		}));

		json.tabs = Array.from({ length: this.tabsCount }, (_, i) => ({
			section: ex(`tab-${i}-type`),
			tabBody: ex(`tab-${i}-tabBody`),
		}));
		if(this.loggedIn) {
			json.userid = this.userid;
		}else{
			json.userid = "Anonymous";
		}

		console.log("Reconstructed data:", json);

		this.dispatchMessage([
			"song/create",
			{
				song: json as Song,
			},
			{
				onSuccess: () =>
					History.dispatch(this, "history/navigate", {
						href: `/app`,
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
