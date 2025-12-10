import{a as O,i as b,O as $,d as I,b as tt,e as W,x as a,r as p,c,f as l,n as d,V as L,g as X,h as M,s as et,_ as ot}from"./reset.css-Dua8Cnst.js";const st={};function rt(n,o,t){const[e,s,r]=n;switch(e){case"song/request":{const{songid:i}=s;if(console.log("song/request",i,o.song),o.song?.songid===i)break;return[{...o,song:{songid:i}},nt(s,t).then(D=>["song/load",{songid:i,song:D}])]}case"song/load":{if(!("song"in s))throw new Error("Payload missing song for song/load");const{song:i}=s;return{...o,song:i}}case"song/save":{const{songid:i}=s;return console.log("Saving song to API..."),[o,it(s,t,r).then(D=>["song/load",{songid:i,song:D}])]}case"song/create":{if(!("song"in s))throw new Error("Payload missing song for song/create");return[o,lt(s,t,r).then(i=>["song/load",{song:i}])]}default:{const i=e;throw new Error(`Unhandled message "${i}"`)}}return o}function nt(n,o){return fetch(`/api/songs/${n.songid}`,{headers:O.headers(o)}).then(t=>{if(t.status===200)return t.json();throw new Error("No response from server")}).then(t=>{if(t)return t;throw new Error("No JSON in server response")})}function it(n,o,t){return at(n,o),fetch(`/api/songs/${n.songid}`,{method:"PUT",headers:{"Content-Type":"application/json",...O.headers(o)},body:JSON.stringify(n.song)}).then(e=>{if(e.status===200)return e.json();throw new Error(`Failed to save song for ${n.song}`)}).then(e=>{if(e)return t?.onSuccess&&t.onSuccess(),e;throw"No JSON in API response"}).catch(e=>{throw t?.onFailure&&t.onFailure(e),e})}function at(n,o){return console.log("saveSongCard()",n.songid,n.song),fetch(`/api/songcards/by-song/${n.songid}`,{method:"PUT",headers:{"Content-Type":"application/json",...O.headers(o)},body:JSON.stringify({title:n.song.title,artist:n.song.artist,difficulty:n.song.difficulty,genre:n.song.genre,instrument:n.song.instrument,songId:n.song.songid,userid:n.song.userid})}).then(t=>{if(!t.ok)throw new Error(`Failed to update songCard for ${n.songid}`)})}function lt(n,o,t){return fetch("/api/songs/",{method:"POST",headers:{"Content-Type":"application/json",...O.headers(o)},body:JSON.stringify(n.song)}).then(e=>{if(console.log("Response status:",e.status),console.log("Response ok:",e.ok),e.status===200||e.status===201)return e.json();throw new Error(`Failed to create song for ${n.song}`)}).then(e=>{if(e)return t?.onSuccess&&t.onSuccess(),e;throw"No JSON in API response"}).catch(e=>{throw t?.onFailure&&t.onFailure(e),e})}var dt=Object.defineProperty,Y=(n,o,t,e)=>{for(var s=void 0,r=n.length-1,i;r>=0;r--)(i=n[r])&&(s=i(o,t,s)||s);return s&&dt(o,t,s),s};function ct(n){const t=n.target.checked;W.relay(n,"dark-mode",{checked:t})}const P=class P extends b{constructor(){super(...arguments),this._authObserver=new $(this,"goodtabs:auth"),this.loggedIn=!1}connectedCallback(){super.connectedCallback(),this._authObserver.observe(o=>{const{user:t}=o;t&&t.authenticated?(this.loggedIn=!0,this.userid=t.username):(this.loggedIn=!1,this.userid=void 0)})}static initializeOnce(){function o(t,e){t?.classList.toggle("dark-mode",e)}document.body.addEventListener("dark-mode",t=>o(t.currentTarget,t.detail.checked))}renderSignOutButton(){return a`
			<button
				@click=${o=>{W.relay(o,"auth:message",["auth/signout"])}}
				>
				Sign Out
				</button>
		`}renderSignInButton(){return a`
			<a href="/login.html">
				Sign In...
			</a>
		`}render(){return a`
		<header>
		<h1>
		<a href="/app">GoodTabs</a>
		</h1>
		<nav>
	<!-- 
		<a href="instrument.html">Instruments</a>
		<a href="genre_list.html">Genres</a>
		<a href="difficulty_list.html">Difficulties</a>
		<a href="index.html">Songs</a>
		-->
		</nav>

		<div class="grouped-header">
		<mu-dropdown>
		<a slot="actuator">
            Hello,
            <span id="userid">${this.userid||"musician"}</span>
          </a>
		<menu>
		${this.loggedIn?this.renderSignOutButton():this.renderSignInButton()}
		<label @change=${ct}>
		<input type="checkbox" />
		Dark Mode
		</label>		
		</menu>
		</mu-dropdown>
		</div>
		</header>
				`}};P.uses=I({"mu-dropdown":tt.Element}),P.styles=[p.styles,c`
			:host {
				display: block;
				grid-column: start / end;
				width: 100%;
			}

			.grouped-header{
				display:flex;
				margin: 10 10;
				padding: 10 10;
			}

			header {
				flex-basis: min-content;
				grid-column: start / end;
				display: flex;
				align-items: baseline;
				justify-content: space-between;
				background-color: var(--color-header);
				color: white;
				font-family: "Chelsea Market", system-ui;
				font-weight: 400;
				font-style: normal;
			}
			header > h1 > a{
				color: white;
			}
			a[slot="actuator"] {
        color: var(--color-link-inverted);
        cursor: pointer;
      }
			menu a {
        color: var(--color-link);
        cursor: pointer;
        text-decoration: underline;
      }

			a {
				color: white;
				font-weight: bold;
				text-decoration: none;
			}
			nav {
				text-align: right;
				margin: var(--size-spacing-medium);
			}

			nav > a {
				color: white;
				text-align: right;
			}

			`];let v=P;Y([l()],v.prototype,"loggedIn");Y([l()],v.prototype,"userid");var pt=Object.defineProperty,x=(n,o,t,e)=>{for(var s=void 0,r=n.length-1,i;r>=0;r--)(i=n[r])&&(s=i(o,t,s)||s);return s&&pt(o,t,s),s};const F=class F extends b{constructor(){super(...arguments),this.title="",this.artist="",this.difficulty="",this.genre="",this.songId="",this.instrument=""}render(){return console.log("Instrument value:",this.instrument),a`
				<li class ="song">
					<svg class="icon">
						<use href="/icons/instruments.svg#icon-${this.instrument}"/>
					</svg>
					<a href="/app/song/${this.songId}">${this.title}</a>
					by
					${this.artist}
					(Tags:
					${this.difficulty},
					${this.genre})
				</li>

		`}};F.styles=[p.styles,c`
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
	`];let u=F;x([d({type:String})],u.prototype,"title");x([d({type:String})],u.prototype,"artist");x([d({type:String})],u.prototype,"difficulty");x([d({type:String})],u.prototype,"genre");x([d({type:String})],u.prototype,"songId");x([d({type:String})],u.prototype,"instrument");var ut=Object.defineProperty,Z=(n,o,t,e)=>{for(var s=void 0,r=n.length-1,i;r>=0;r--)(i=n[r])&&(s=i(o,t,s)||s);return s&&ut(o,t,s),s};const J=class J extends b{constructor(){super(...arguments),this.songCards=[],this._authObserver=new $(this,"goodtabs:auth")}get authorization(){if(this._user?.authenticated)return{Authorization:`Bearer ${this._user.token}`}}connectedCallback(){super.connectedCallback(),this._authObserver.observe(o=>{this._user=o.user,this.src&&this.hydrate(this.src)})}hydrate(o){fetch(o,{headers:this.authorization}).then(t=>t.json()).then(t=>{if(t){const e=t;this.songCards=e.songCards}})}render(){const{songCards:o}=this;function t(e){return a`
				<song-card title=${e.title}
				           artist=${e.artist}
				           difficulty=${e.difficulty}
				           genre=${e.genre}
									 instrument=${e.instrument}
									 songId=${e.songId}
				>
				</song-card>
		`}return a`
			<ul class="songs">
				<h2>
					<div class="grouped-h2">
					list
					</div>
					<hr>
				</h2>
				${o.map(t)}
			</ul>
		`}};J.styles=[p.styles,c`
		:host {
      display: contents;
    }

    
.songs {

	grid-column: 1/ 3;
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
	`];let _=J;Z([d()],_.prototype,"src");Z([l()],_.prototype,"songCards");var ht=Object.defineProperty,T=(n,o,t,e)=>{for(var s=void 0,r=n.length-1,i;r>=0;r--)(i=n[r])&&(s=i(o,t,s)||s);return s&&ht(o,t,s),s};const q=class q extends b{constructor(){super(...arguments),this.songCards=[],this.loggedIn=!1,this._authObserver=new $(this,"goodtabs:auth")}get authorization(){if(this._user?.authenticated)return{Authorization:`Bearer ${this._user.token}`}}connectedCallback(){super.connectedCallback(),this._authObserver.observe(o=>{this._user=o.user,this.src&&this.hydrate(this.src),this._user&&this._user.authenticated?(this.loggedIn=!0,this.userid=this._user.username):(this.loggedIn=!1,this.userid=void 0)})}hydrate(o){fetch(o,{headers:this.authorization}).then(t=>t.json()).then(t=>{if(t){const e=t;this.songCards=e.songCards}})}render(){const{songCards:o}=this,t=e=>a`
		${this.userid===e.userid&&e.userid?a`
				<song-card
					title=${e.title}
					artist=${e.artist}
					difficulty=${e.difficulty}
					genre=${e.genre}
					instrument=${e.instrument}
					songId=${e.songId}>
				</song-card>
			`:""}
	`;return a`
			<ul class="songs">
				<h2>
					<div class="grouped-h2">
					My Songs
					<a style="text-align: right;" href="/app/song/create">New Song +</a>
					</div>
					<hr>
				</h2>
				${o.map(t)}
			</ul>
		`}};q.styles=[p.styles,c`
		:host {
      display: contents;
    }

    
.songs {

	grid-column: 4/ 5;
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
	`];let m=q;T([d()],m.prototype,"src");T([l()],m.prototype,"songCards");T([l()],m.prototype,"userid");T([l()],m.prototype,"loggedIn");var gt=Object.defineProperty,H=(n,o,t,e)=>{for(var s=void 0,r=n.length-1,i;r>=0;r--)(i=n[r])&&(s=i(o,t,s)||s);return s&&gt(o,t,s),s};const G=class G extends b{constructor(){super(...arguments),this._authObserver=new $(this,"goodtabs:auth"),this.loggedIn=!1}connectedCallback(){super.connectedCallback(),this._authObserver.observe(o=>{const{user:t}=o;t&&t.authenticated?(this.loggedIn=!0,this.userid=t.username):(this.loggedIn=!1,this.userid=void 0)})}render(){return a`
			<main class="page">
				<song-list src="/api/songcards">
				</song-list>
				<my-song-list src="/api/songcards">
				</my-song-list>
			</main>
		`}};G.styles=c` 

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
	`;let z=G;H([l()],z.prototype,"loggedIn");H([l()],z.prototype,"userid");var bt=Object.defineProperty,V=(n,o,t,e)=>{for(var s=void 0,r=n.length-1,i;r>=0;r--)(i=n[r])&&(s=i(o,t,s)||s);return s&&bt(o,t,s),s};const K=class K extends b{constructor(){super(...arguments),this.section="",this.tabBody=""}render(){return a`
			<div class="tab-sheet">
        <h4>[${this.section}]</h4>
        <pre><code>${this.tabBody}</code></pre>
      </div>		`}};K.styles=[p.styles,c`
			
			:host {
        display: contents;
      }
		`];let k=K;V([d()],k.prototype,"section");V([d()],k.prototype,"tabBody");var mt=Object.defineProperty,N=(n,o,t,e)=>{for(var s=void 0,r=n.length-1,i;r>=0;r--)(i=n[r])&&(s=i(o,t,s)||s);return s&&mt(o,t,s),s};const U=class U extends b{constructor(){super(...arguments),this.section="",this.chords=[],this.inline=!1}render(){return this.inline?a`<p><strong>${this.section}:</strong> ${this.chords.join(" ")}</p>`:a`

				<h4>[${this.section}]</h4>
				<pre>${this.chords.join(" ")}</pre>
			`}};U.styles=[p.styles,c`

			:host {
        display: contents;
      }
		`];let y=U;N([d()],y.prototype,"section");N([d({type:Array})],y.prototype,"chords");N([d({type:Boolean})],y.prototype,"inline");var ft=Object.defineProperty,E=(n,o,t,e)=>{for(var s=void 0,r=n.length-1,i;r>=0;r--)(i=n[r])&&(s=i(o,t,s)||s);return s&&ft(o,t,s),s};const Q=class Q extends b{constructor(){super(...arguments),this.type="",this.lyrics=""}render(){return a`
			<section>
				<h4>[${this.type}]</h4>
				<pre>${this.lyrics}</pre>
			</section>
		`}};Q.styles=[p.styles,c`

			:host {
        display: contents;
      }
		`];let S=Q;E([d()],S.prototype,"type");E([d()],S.prototype,"lyrics");var vt=Object.defineProperty,yt=Object.getOwnPropertyDescriptor,R=(n,o,t,e)=>{for(var s=e>1?void 0:e?yt(o,t):o,r=n.length-1,i;r>=0;r--)(i=n[r])&&(s=(e?i(o,t,s):i(s))||s);return e&&s&&vt(o,t,s),s};const B=class B extends L{constructor(){super("goodtabs:model"),this._authObserver=new $(this,"goodtabs:auth"),this.loggedIn=!1}connectedCallback(){super.connectedCallback(),this._authObserver.observe(o=>{const{user:t}=o;t&&t.authenticated?(this.loggedIn=!0,this.userid=t.username):(this.loggedIn=!1,this.userid=void 0)})}get song(){return this.model.song}attributeChangedCallback(o,t,e){super.attributeChangedCallback(o,t,e),o==="song-id"&&t!==e&&e&&this.dispatchMessage(["song/request",{songid:e}])}render(){return this.song?a`
			<main class="page">
        <header>
					<div class="grouped">
						<h2>${this.song.title}</h2> by
						<h3>${this.song.artist}</h3>
					</div>
					<div class="grouped meta">
					Difficulty: ${this.song.difficulty} ⋆
          ${this.song.key?a`<p>Key: ${this.song.key}</p>`:""} ⋆
          ${this.song.bpm?a`<p>BPM: ${this.song.bpm}</p>`:""} ⋆

					<svg class="icon">
					<use href="/icons/instruments.svg#icon-${this.song.instrument}"/>
					</svg> ⋆
					Created by ${this.song.userid} ⋆
					${this.song.userid===this.userid?a`<a href="/app/song/${this.songId}/edit">Edit Song</a>`:""}
					</div> 
        </header>

				<hr>

				<div class="song-layout">
        <section class="lyrics">
				<h3> Lyrics </h3>
          ${this.song.sections?.map(o=>a`<song-section
                .type=${o.type}
                .lyrics=${o.lyrics}
              ></song-section>`)}
        </section>

        <section class="chords">
				<h3> Chords </h3>
          ${this.song.chords?.map(o=>a`<chord-sheet
                .section=${o.section}
                .chords=${o.chords}
                .inline=${o.inline||!1}
              ></chord-sheet>`)}
        </section>

        <section class="tabs">
				<h3> Tabs</h3>
          ${this.song.tabs?.map(o=>a`<tab-sheet
                .section=${o.section}
                .tabBody=${o.tabBody}
              ></tab-sheet>`)}
        </section>
				</div>
      </main>
		`:a`<p> Loading song</p>`}};B.uses=I({"tab-sheet":k,"chord-sheet":y,"song-section":S}),B.styles=[p.styles,c`
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

		svg.icon {
			display: inline;
			height: 3em;
			width: 3em;
			vertical-align: middle;
			fill: currentColor;

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
  `];let f=B;R([d({attribute:"song-id"})],f.prototype,"songId",2);R([l()],f.prototype,"song",1);R([l()],f.prototype,"loggedIn",2);R([l()],f.prototype,"userid",2);var $t=Object.defineProperty,xt=Object.getOwnPropertyDescriptor,C=(n,o,t,e)=>{for(var s=e>1?void 0:e?xt(o,t):o,r=n.length-1,i;r>=0;r--)(i=n[r])&&(s=(e?i(o,t,s):i(s))||s);return e&&s&&$t(o,t,s),s};const A=class A extends L{constructor(){super("goodtabs:model"),this.songid="",this.sectionsCount=0,this.chordsCount=0,this.tabsCount=0,this._initialized=!1}get song(){return this.model.song}updated(o){console.log("updated props:",[...o.keys()]),this.song&&!this._initialized&&this.song.sections.length>=1&&(this.sectionsCount=this.song.sections?.length,this.chordsCount=this.song.chords?.length||0,this.tabsCount=this.song.tabs?.length||0,this._initialized=!0)}render(){const o=this.song?{...this.song,...this.song.sections?.reduce((t,e,s)=>(t[`section-${s}-type`]=e.type,t[`section-${s}-lyrics`]=e.lyrics,t),{})||{},...this.song.chords?.reduce((t,e,s)=>(t[`chord-${s}-type`]=e.section,t[`chord-${s}-chords`]=e.chords,t),{})||{},...this.song.tabs?.reduce((t,e,s)=>(t[`tab-${s}-type`]=e.section,t[`tab-${s}-tabBody`]=e.tabBody,t),{})||{}}:{};return a`
    <main class="page">
      <mu-form .init=${o} @mu-form:submit=${this.handleSubmit}>

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
						<span>Instrument</span>
						<select name="instrument">
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
        ${Array.from({length:this.sectionsCount},(t,e)=>a`
          <fieldset>
            <legend>Section ${e+1}</legend>
            
            <label>
              <span>Type</span>
              <select name="section-${e}-type" .value=${o[`section-${e}-type`]||""}>
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
              <textarea name="section-${e}-lyrics">${o[`section-${e}-lyrics`]||""}</textarea>
            </label>
          </fieldset>
        `)}
		<button 
		type="button"
		class="add-section-btn"
		@click=${()=>this.sectionsCount++}>
		+ Add Lyrics Section
		</button>
		<button 
		type="button"
		class="remove-section-btn"
		?disabled=${this.sectionsCount<=1}
    @click=${()=>{this.sectionsCount>1&&this.sectionsCount--}}>
		- Remove Lyrics Section
		</button>




        <h3>Chords Sections</h3>
        ${Array.from({length:this.chordsCount},(t,e)=>a`
          <fieldset>
            <legend>Section ${e+1}

						</legend>
            
            <label>
              <span>Type</span>
              <select name="chord-${e}-type" .value=${o[`chord-${e}-type`]||""}>
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
              <textarea name="chord-${e}-chords"> ${o[`chord-${e}-chords`]||""}</textarea>
            </label>
          </fieldset>
        `)}
		<button 
            type="button" 
            class="add-section-btn"
            @click=${()=>this.chordsCount++}>
            + Add Chords Section
    </button>
		<button 
            type="button" 
            class="remove-section-btn"
							?disabled=${this.chordsCount<=1}
            @click=${()=>{this.chordsCount>1&&this.chordsCount--}}>
            - Remove Chords Section
    </button>


        <h3>Tabs Sections</h3>
        ${Array.from({length:this.tabsCount},(t,e)=>a`
          <fieldset>
            <legend>Section ${e+1}</legend>
            
            <label>
              <span>Type</span>
              <select name="tab-${e}-type" .value=${o[`tab-${e}-type`]||""}>
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
              <textarea name="tab-${e}-tabBody"> ${o[`tab-${e}-tabBody`]||""}</textarea>
            </label>
          </fieldset>
        `)}
		<button 
			type="button" 
			class="add-section-btn"
			@click=${()=>this.tabsCount++}>
			+ Add Tab Section
		</button>
		<button 
			type="button" 
			class="remove-section-btn"
			?disabled=${this.tabsCount<=1}
      @click=${()=>{this.tabsCount>1&&this.tabsCount--}}>
			- Remove Tab Section
		</button>
      </mu-form>
    </main>`}handleSubmit(o){console.log("Submitting form",o),console.log("Form data:",JSON.stringify(o.detail,null,2));let t=o.detail;const e=s=>{const r=t[s];return delete t[s],r};t.sections=Array.from({length:this.sectionsCount},(s,r)=>({type:e(`section-${r}-type`),lyrics:e(`section-${r}-lyrics`)})),t.chords=Array.from({length:this.chordsCount},(s,r)=>({section:e(`chord-${r}-type`),chords:e(`chord-${r}-chords`)})),t.tabs=Array.from({length:this.tabsCount},(s,r)=>({section:e(`tab-${r}-type`),tabBody:e(`tab-${r}-tabBody`)})),console.log("Reconstructed data:",t),this.dispatchMessage(["song/save",{songid:this.songid,song:t},{onSuccess:()=>M.dispatch(this,"history/navigate",{href:`/app/song/${this.songid}`}),onFailure:s=>console.log("ERROR:",s)}])}attributeChangedCallback(o,t,e){super.attributeChangedCallback(o,t,e),o==="song-id"&&e&&this.dispatchMessage(["song/request",{songid:e}])}};A.uses=I({"mu-form":X.Element}),A.styles=[p.styles,c` 
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


			svg.icon {
				display: inline;
				height: 2em;
				width: 2em;
				vertical-align: top;
				fill: currentColor;

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

		`];let h=A;C([d({attribute:"song-id"})],h.prototype,"songid",2);C([l()],h.prototype,"song",1);C([l()],h.prototype,"sectionsCount",2);C([l()],h.prototype,"chordsCount",2);C([l()],h.prototype,"tabsCount",2);C([l()],h.prototype,"_initialized",2);var Ct=Object.defineProperty,wt=Object.getOwnPropertyDescriptor,w=(n,o,t,e)=>{for(var s=e>1?void 0:e?wt(o,t):o,r=n.length-1,i;r>=0;r--)(i=n[r])&&(s=(e?i(o,t,s):i(s))||s);return e&&s&&Ct(o,t,s),s};const j=class j extends L{constructor(){super("goodtabs:model"),this._authObserver=new $(this,"goodtabs:auth"),this.loggedIn=!1,this.sectionsCount=1,this.chordsCount=1,this.tabsCount=1}get song(){return this.model.song}connectedCallback(){super.connectedCallback(),this._authObserver.observe(o=>{const{user:t}=o;t&&t.authenticated?(this.loggedIn=!0,this.userid=t.username):(this.loggedIn=!1,this.userid=void 0)})}render(){return a`
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
        ${Array.from({length:this.sectionsCount},(o,t)=>a`
          <fieldset>
            <legend>Lyrics Section ${t+1}</legend>
            
            <label>
              <span>Type</span>
              <select name="section-${t}-type" >
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
              <textarea name="section-${t}-lyrics"></textarea>
            </label>
          </fieldset>
        `)}
		<button 
		type="button"
		class="add-section-btn"
		@click=${()=>this.sectionsCount++}>
		+ Add Lyrics Section
		</button>
		<button 
		type="button"
		class="remove-section-btn"
		?disabled=${this.sectionsCount<=1}
    @click=${()=>{this.sectionsCount>1&&this.sectionsCount--}}>
		- Remove Lyrics Section
		</button>




        <h3>Chords Sections</h3>
        ${Array.from({length:this.chordsCount},(o,t)=>a`
          <fieldset>
            <legend>Section ${t+1}

						</legend>
            
            <label>
              <span>Type</span>
              <select name="chord-${t}-type" >
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
              <textarea name="chord-${t}-chords"></textarea>
            </label>
          </fieldset>
        `)}
		<button 
            type="button" 
            class="add-section-btn"
            @click=${()=>this.chordsCount++}>
            + Add Chords Section
    </button>
		<button 
            type="button" 
            class="remove-section-btn"
							?disabled=${this.chordsCount<=1}
            @click=${()=>{this.chordsCount>1&&this.chordsCount--}}>
            - Remove Chords Section
    </button>


        <h3>Tabs Sections</h3>
        ${Array.from({length:this.tabsCount},(o,t)=>a`
          <fieldset>
            <legend>Section ${t+1}</legend>
            
            <label>
              <span>Type</span>
              <select name="tab-${t}-type">
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
              <textarea name="tab-${t}-tabBody">  </textarea>
            </label>
          </fieldset>
        `)}
		<button 
			type="button" 
			class="add-section-btn"
			@click=${()=>this.tabsCount++}>
			+ Add Tab Section
		</button>
		<button 
			type="button" 
			class="remove-section-btn"
			?disabled=${this.tabsCount<=1}
      @click=${()=>{this.tabsCount>1&&this.tabsCount--}}>
			- Remove Tab Section
		</button>
      </mu-form>
    </main>`}handleSubmit(o){console.log("Submitting form",o),console.log("Form data:",JSON.stringify(o.detail,null,2));let t=o.detail;const e=s=>{const r=t[s];return delete t[s],r};t.sections=Array.from({length:this.sectionsCount},(s,r)=>({type:e(`section-${r}-type`),lyrics:e(`section-${r}-lyrics`)})),t.chords=Array.from({length:this.chordsCount},(s,r)=>({section:e(`chord-${r}-type`),chords:e(`chord-${r}-chords`)})),t.tabs=Array.from({length:this.tabsCount},(s,r)=>({section:e(`tab-${r}-type`),tabBody:e(`tab-${r}-tabBody`)})),this.loggedIn?t.userid=this.userid:t.userid="Anonymous",console.log("Reconstructed data:",t),this.dispatchMessage(["song/create",{song:t},{onSuccess:()=>M.dispatch(this,"history/navigate",{href:"/app"}),onFailure:s=>console.log("ERROR:",s)}])}attributeChangedCallback(o,t,e){super.attributeChangedCallback(o,t,e),o==="song-id"&&e&&this.dispatchMessage(["song/request",{songid:e}])}};j.uses=I({"mu-form":X.Element}),j.styles=[p.styles,c` 
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

		`];let g=j;w([l()],g.prototype,"song",1);w([l()],g.prototype,"loggedIn",2);w([l()],g.prototype,"userid",2);w([l()],g.prototype,"sectionsCount",2);w([l()],g.prototype,"chordsCount",2);w([l()],g.prototype,"tabsCount",2);const _t=[{path:"/app/song/create",view:()=>a`
			<song-create></song-create>
		`},{path:"/app/song/:id/edit",view:n=>a`
			<song-edit song-id=${n.id}></song-edit>
		`},{path:"/app/song/:id",view:n=>a`
		<song-view song-id=${n.id}></song-view>
		`},{path:"/app",view:()=>a`
			<home-view></home-view>
		`},{path:"/",redirect:"/app"}];I({"mu-auth":O.Provider,"mu-history":M.Provider,"goodtabs-header":v,"home-view":z,"song-card":u,"song-list":_,"my-song-list":m,"mu-switch":class extends ot.Element{constructor(){super(_t,"goodtabs:history","goodtabs:auth")}},"mu-store":class extends et.Provider{constructor(){super(rt,st,"goodtabs:auth")}},"song-view":f,"song-edit":h,"song-create":g});v.initializeOnce();
