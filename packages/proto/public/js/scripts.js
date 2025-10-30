		<script>
			//custom event thats dispatched on call
			function toggleDarkMode(target, checked){
				const customEvent = new CustomEvent(
				"dark-mode:toggle", {
					bubbles: true,
					detail: {checked},
					});
					
					target.dispatchEvent(customEvent);
				}
				
				class songElement extends HTMLElement{
					connectedCallback(){
						const artist = this.getAttribute('artist');
						const song = this.getAttribute('song');
						const genre = this.getAttribute('genre');
						const difficulty = this.getAttribute('difficulty');
						
						this.innerHTML = `
						
						<li class="song">
						<svg class="icon">
						<use href="/icons/instruments.svg#icon-guitar"/>
						</svg>
						<a href="song.html">${song}</a>
						by
						<a href="band.html">${artist}</a>
						(Tags:
						<a href="difficulty.html">${difficulty}</a>,
						<a href="genre.html">${difficulty}</a>)
						</li>
						
						`;
					}
				}

			customElements.define("song-card", songElement);
		</script>
