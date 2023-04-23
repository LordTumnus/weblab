import Component from "../../+internal/component";
import Tagify from "@yaireo/tagify";
import debounce from "lodash/debounce";
import "@yaireo/tagify/dist/tagify.css";
import "./style.css";


export default class TagBar extends Component {

    tagify: Tagify;
    #input: HTMLInputElement;

    constructor() {
        super();
        this.#initialize();

        // Subscriptions
        this.subscribe("clear_tags", () => {
            this.tagify.removeAllTags();
        });

        // Events
        this.tagify.on("change", debounce(() => {
            this.publish("tags_changed", this.tagify.getCleanValue().map((t) => {
                return t.value;
            }));
        }, 150, {leading: true}));
        this.tagify.on("focus", () => { this.publish("focus", []) })
        this.tagify.on("blur", () => { this.publish("blur", []) })
    }

    #initialize() {
        // Create an input element and append it to the componenz
        this.#input = document.createElement("input");
        this.appendChild(this.#input);
        this.classList.add("tagbar");

        // Use the Tagify lib to create the search bar
        this.tagify = new Tagify(this.#input, {
            placeholder: "Search",
            delimiters: " ",
            editTags: 2,
            duplicates: true,
            addTagOnBlur: true,
            skipInvalid: true,
            backspace: true,
            trim: false,
            a11y: { focusableTags: true },
        });
    }

    // Stainable properties
    set tags(t: string | Array<string>) {
        this.tagify.removeAllTags();
        this.tagify.addTags(t);
    }
    set placeholder(ph: string) {
        this.tagify.DOM.input.setAttribute('data-placeholder', ph)
    }
    set delimiters(del: string | Array<string>) {
        this.tagify.settings.delimiters = new RegExp(Array.from(del).join('|'), 'g');
    }
    set backspace(bs: any) {
        this.tagify.settings.backspace = bs;
    }
    set duplicates(dup: boolean) {
        this.tagify.settings.duplicates = dup;
    }
    set edit_tags(tf: boolean) {
        this.tagify.settings.editTags = tf ? 2 : false;
    }
    set validation_pattern(vl: string) {
        this.tagify.settings.pattern = new RegExp(vl);
    }
    set blacklist(bl: string | Array<string>) {
        this.tagify.settings.blacklist = Array.from(bl);
    }
    set whitelist(wl: string | Array<string>) {
        if (wl === '') {
            this.tagify.settings.enforceWhitelist = false;
            this.tagify.settings.whitelist = [''];
            return
        }
        this.tagify.settings.enforceWhitelist = true;
        this.tagify.settings.whitelist = Array.from(wl);
    }

};

customElements.define('weblab-tagbar', TagBar);

