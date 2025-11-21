import { Auth, History, Switch, Store, define } from "@calpoly/mustang";
import { html } from "lit";
import { Msg } from "./messages";
import { Model, init } from "./model";
import update from "./update";
import { HeaderElement } from "./components/header";
import { HomeViewElement } from "./views/home-view";
import { SongViewElement } from "./views/song-view";
import { SongCardElement } from "./components/songcard";
import { SongsElement } from "./components/songs";

const routes = [
	{
		path: "/app/song/:id",
		view: (params: Switch.Params) => html`
		<song-view song-id=${params.id}></song-view>
		`,
	},

	{
		path: "/app",
		view: () => html`
			<home-view></home-view>
		`,
	},
	{
		path: "/",
		redirect: "/app",
	},
];

define({
	"mu-auth": Auth.Provider,
	"mu-history": History.Provider,
	"goodtabs-header": HeaderElement,
	"home-view": HomeViewElement,
	"song-card": SongCardElement,
	"song-list": SongsElement,
	"mu-switch": class AppSwitch extends Switch.Element {
		constructor() {
			super(routes, "goodtabs:history", "goodtabs:auth");
		}
	},
	"mu-store": class AppStore extends Store.Provider<Model, Msg> {
		constructor() {
			super(update, init, "goodtabs:auth");
		}
	},

	"song-view": SongViewElement,
});
