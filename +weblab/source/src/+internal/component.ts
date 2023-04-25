// COMPONENT
import connector from "./connector";
import cssobj from "cssobj";

export default class Component extends HTMLElement {
    /**
     * Map between event names (received from Matlab) and their callback functions
     * @type {{[key: string]: Function}}
     */
    subscriptions: { [key: string]: Function } = {};

    /**
     * The parent component of this component
     * @type {HTMLElement | Component | null}
     */
    parentElement: HTMLElement | Component | null

    /**
     * The cssobj style
     * @type {CssObj.Result}
     */
    cssResult: CssObj.Result;

    cssClassName: string

    constructor() {
        super();
        this.subscribe("wb__dirty_prop", (data: any) => { this.setDirtyProperty(data) });

        // CSSObj 
        const randCSSId = (Math.random() + 1).toString(36).substring(6);
        this.cssClassName = `styleable_${randCSSId}`;
        this.classList.add(this.cssClassName);
        this.cssResult = cssobj({ ["."+this.cssClassName]: {} });
    }

    /**
     * Send an event to Matlab
     * @param {string} name The name of the event
     * @param {any} data Any information shared with Matlab
     */
    publish(name: string, data: any) {
        connector.publish(this.id, { name: name, data: data });
    }

    /**
     * Execute the specified callback whenever an event is received from Matlab
     * @param {string} name The name of the event
     * @param {Function} callback The function to be executed upon receiving the event
     */
    subscribe(name: string, callback: Function) {
        this.subscriptions[name] = callback;
    }

    /**
     * Call the individual setter of all the properties marked as dirty (stained) in Maltab
     * @param {{ name: string, value:any }} prop 
     */
    setDirtyProperty(prop: { name: string, value: any }) {
        this[prop.name] = prop.value;
    }

    /**
     * Upon receiving an event, checks if the component is subscribed to it and, if it is, 
     * executes the stored callback
     * @param {string} name 
     * @param {any} data 
     */
    handleEvent(name: string, data: any) {
        if (this.subscriptions[name] !== undefined) {
            this.subscriptions[name](data);
        }
    }

    /**
     * Update the style of the element
     * @param {any} s The style from matlab
     */
    set css_style(s: any) {
        this.cssResult.update({ ["."+this.cssClassName]: s })
    }
}
