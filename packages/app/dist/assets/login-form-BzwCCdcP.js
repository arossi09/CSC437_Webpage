import{i as u,x as l,r as g,c as h,f as d,n as c}from"./reset.css-Dua8Cnst.js";var f=Object.defineProperty,o=(m,a,t,i)=>{for(var e=void 0,r=m.length-1,p;r>=0;r--)(p=m[r])&&(e=p(a,t,e)||e);return e&&f(a,t,e),e};const n=class n extends u{constructor(){super(...arguments),this.formData={},this.redirect="/"}get canSubmit(){return!!(this.api&&this.formData.username&&this.formData.password)}handleChange(a){const t=a.target,i=t?.name,e=t?.value,r=this.formData;switch(i){case"username":this.formData={...r,username:e};break;case"password":this.formData={...r,password:e};break}}handleSubmit(a){a.preventDefault(),this.canSubmit&&fetch(this?.api||"",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(this.formData)}).then(t=>{if(t.status!==200&&t.status!==201)throw"Login failed";return t.json()}).then(t=>{const{token:i}=t,e=new CustomEvent("auth:message",{bubbles:!0,composed:!0,detail:["auth/signin",{token:i,redirect:this.redirect}]});console.log("dispatching message",e),this.dispatchEvent(e)}).catch(t=>{console.log(t),this.error=t.toString()})}render(){return l`
		<main class ="page">
      <form
        @change=${a=>this.handleChange(a)}
        @submit=${a=>this.handleSubmit(a)}
      >
        <slot></slot>
        <slot name="button">
          <button
            ?disabled=${!this.canSubmit}
            type="submit">
            Login
          </button>
        </slot>
        <p class="error">${this.error}</p>
      </form>
		</main>
    `}};n.styles=[g.styles,h`
      .error:not(:empty) {
        color: var(--color-error);
        border: 1px solid var(--color-error);
        padding: var(--size-spacing-medium);
      }



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
  `];let s=n;o([d()],s.prototype,"formData");o([c()],s.prototype,"api");o([c()],s.prototype,"redirect");o([d()],s.prototype,"error");export{s as L};
