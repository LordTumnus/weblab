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
        this.subscribe("set_text", (data: { source: string, pdata: string }) => {
            this.setTextContent(data.source, data.pdata);
        })
        this.subscribe("insert_subhtml", (data: { source: string, pdata: any }) => {
            this.subinsertHTML(data.source, data.pdata);
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
     * @param {string} id the identifier of the inserted element
     * @param {string} type the type of the inserted element
     */
    insertHTML(id: string, type: string) {
        let r = document.createElement(type);
        r.id = id;
        this.#elements.push(r);
        this.appendChild(r);
    }

    /**
     * Add text to an element
     * @param {string} id the identifier of the element
     * @param {string} text the text content
     */
    setTextContent(id: string, text: string) {
        let child = this.#elements.find((c) => { return c.id === id });
        if (child !== undefined) {
            child.textContent = text;
        }
    }

    /**
     * Insert a new HTML element inside another element
     * @param {string} id the identifier of the element acting as container
     * @param {{id: string, type: string}} el object containing the HTML type and id of the inserted element
     */
    subinsertHTML(id: string, el: { id: string, type: string }) {
        let child = this.#elements.find((c) => { return c.id === id });
        if (child !== undefined) {
            let r = document.createElement(el.type);
            r.id = el.id;
            this.#elements.push(r);
            child.appendChild(r);
        }
    }

    /**
     * Modify an attribute of an internal child
     * @param {string} id the id of the child
     * @param {string} attr the attribute to be modified
     * @param {any} value the value of the attribute
     */
    setChildAttribute(id: string, attr: string, value: any) {
        let child = this.#elements.find((c) => { return c.id === id });
        if (child !== undefined) {
            child.setAttribute(attr, value);
        }
    }

    /**
     * Change the inline style of the child
     * @param {string} id the id of the child
     * @param {{}} style an object containing the style attributes
     */
    setChildInlineStyle(id: string, style: {}) {
        let child = this.#elements.find((c) => { return c.id === id });
        if (child !== undefined) {
            Object.assign(child.style, style);
        }
    }

    /**
     * Adds a new listener for a child
     * @param {string} id the id of the child element
     * @param listener an object containing the listener properties
     */
    addChildListener(id: string, data: {
        event: string,
        options: {
            mode: 'normal' | 'debounce' | 'throttle',
            eventProps: string[],
            useCapture: boolean,
            stopPropagation: boolean
            time: number,
        }
    }) {

        let child = this.#elements.find((c) => { return c.id === id });
        // If no child, do nothing
        if (child === undefined) {
            return
        }

        const event = data.event;
        const eventProps = data.options.eventProps;
        const mode = data.options.mode;
        const time = data.options.time;
        const stopPropagation = data.options.stopPropagation;
        const useCapture = data.options.useCapture;

        // Create the callback function based on the listener mode
        let q = (e: any) => { 
            if (stopPropagation) {
                e.stopImmediatePropagation();
            }
            this.publish("internal_event", { 
                source: id, 
                data: {
                    name: event,
                    data: pick(e, eventProps)
                }
            }) 
        };

        // Apply mode
        let f: (e: any) => void;
        switch (mode) {
            case 'debounce':
                f = debounce((e: any) => q(e), time);
                break;
            case 'throttle':
                f = throttle((e: any) => q(e), time);
                break;
            case 'normal':
                f = (e: any) => q(e);
        }

        // If there are no listeners registered yet to the child, create one
        if (~has(this.#listeners, id)) {
            this.#listeners[id] = {};
        }
        if (has(this.#listeners[id], event)) {
            // Remove the listener before creating a new one
            this.removeChildListener(id, event);
        }
        this.#listeners[id][event] = (e: any) => f(e);
        child.addEventListener(event, this.#listeners[id][event], useCapture)
    }

    removeChildListener(id: string, event: string) {
        let child = this.#elements.find((c) => { return c.id === id });
        if (child !== undefined && has(this.#listeners, id) && has(this.#listeners[id], event)) {
            // Remove both useCapture = true and useCapture = false 
            child.removeEventListener(event, this.#listeners[id][event], true);
            child.removeEventListener(event, this.#listeners[id][event], false);
            delete this.#listeners[id][event]
        }
    }
}

customElements.define("weblab-htmlcontainer", HTMLContainer);




