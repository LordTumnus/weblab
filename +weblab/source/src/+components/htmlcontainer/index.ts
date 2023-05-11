import ComponentContainer from "../../+internal/container";

import debounce from "lodash/debounce";
import throttle from "lodash/throttle";
import pick from "lodash/pick";
import has from "lodash/has";

export default class HTMLContainer extends ComponentContainer {

    #elements: HTMLElement[] = [];
    #listeners: {} = {};

    constructor() {
        super();
        this.subscribe("insert_html", (data: { id: string, type: string }) => {
            this.insertHTML(data.id, data.type);
        })
        this.subscribe("inline_style", (data: { source: string, pdata: any }) => {
            this.setChildInlineStyle(data.source, data.pdata);
        })
        this.subscribe("set_attribute", (data: { source: string, pdata: any }) => {
            this.setChildAttribute(data.source, data.pdata.attribute, data.pdata.value);
        })
        this.subscribe("event_listener", (data: { source: string, pdata: any }) => {
            this.addChildListener(data.source, data.pdata);
        })
        this.subscribe("remove_listener", (data: { source: string, pdata: any }) => {
            this.removeChildListener(data.source, data.pdata);
        })
    }

    /**
     * Insert a new HTML element inside the container
     * @param {{id: string, type: string}} el Object containing the HTML type and id
     */
    insertHTML(id: string, type: string) {
        let r = document.createElement(type);
        r.id = id;
        this.#elements.push(r);
        this.appendChild(r);
    }

    /**
     * Modify an attribute of an internal child
     * @param {string} id The id of the child
     * @param {string} attr The attribute to be modified
     * @param {any} value The value of the attribute
     */
    setChildAttribute(id: string, attr: string, value: any) {
        let child = this.#elements.find((c) => { return c.id === id });
        if (child !== undefined) {
            child.setAttribute(attr, value);
        }
    }

    /**
     * Change the inline style of the child
     * @param {string} id The id of the child
     * @param {{}} style An object containing the style attributes
     */
    setChildInlineStyle(id: string, style: {}) {
        let child = this.#elements.find((c) => { return c.id === id });
        if (child !== undefined) {
            Object.assign(child.style, style);
        }
    }

    /**
     * Adds a new listener for a child
     * @param {string} id The id of the child element
     * @param listener An object containing the listener properties
     */
    addChildListener(id: string, listener: { mode: { type: 'normal' | 'debounce' | 'throttle', time: number }, event: string, back: string[] }) {
        let child = this.#elements.find((c) => { return c.id === id });

        // If no child, do nothing
        if (child === undefined) {
            return
        }

        // Create the callback function based on the listener mode
        let q = (e:any) => { this.publish("internal_event", { source: id, data: { name: listener.event, data: pick(e, listener.back) }}) };
        let f: (e: any) => void;
        switch (listener.mode.type) {
            case 'debounce':
                f = debounce((e: any) => q(e), listener.mode.time);
                break;
            case 'throttle':
                f = throttle((e: any) => q(e), listener.mode.time);
                break;
            case 'normal':
                f = (e: any) => q(e);
        }

        // If there are no listeners registered yet to the child, create one
        if (~has(this.#listeners, id)) {
            this.#listeners[id] = {};
        }
        if (has(this.#listeners[id], listener.event)) {
            // Remove the listener before creating a new one
            this.removeChildListener(id, listener.event);
        }
        this.#listeners[id][listener.event] = (e: any) => f(e);
        child.addEventListener(listener.event, this.#listeners[id][listener.event])
    }

    removeChildListener(id: string, event: string) {
        let child = this.#elements.find((c) => { return c.id === id });
        if (child !== undefined && has(this.#listeners, id) && has(this.#listeners[id], event)) {
            child.removeEventListener(event, this.#listeners[id][event]);
            delete this.#listeners[id][event]
        }
    }
}

customElements.define("weblab-htmlcontainer", HTMLContainer);




