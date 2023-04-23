
import debounce from "lodash/debounce"
import Component from "./component"

interface HTMLConnector {
    Data: any,
    addEventListener: Function;
};
let connector: HTMLConnector | undefined = undefined;
let components: Array<Component> = [];
let preIds: Array<{ id: string, events: Array<{ name: string, data: any }> }> = [];
let evtQueue: Array<{ id: string, name: string, data: any }> = [];

const debouncedPublish = debounce(()=>{
    connector!.Data = evtQueue;
    evtQueue = [];
}, 50, {leading: false, trailing: true});

export default {
    /**
     * Send an event to matlab
     * @param {string} id The identifier of the component publishing the event
     * @param  { {name: string, data: any} } event  The info to be passed
     */
    publish(id: string, event: { name: string, data: any }) {
        evtQueue.push({ id: id, name: event.name, data: event.data })
        debouncedPublish();
    },
    /**
     * Store the element with its ID
     * @param {Component} element The component itself
     */
    register(element: Component) {
        components.push(element);
        const idx = preIds.findIndex((e) => { return e.id === element.id });
        if (idx !== -1) {
            preIds[idx].events.forEach((ev) => {
                element.handleEvent(ev.name, ev.data);
            });
            preIds.splice(idx, 1);
        }
    },

    /**
     * 
     * @param {string} id 
     */
    preregister(id: string) {
        preIds.push({ id: id, events: [] });
    },

    /**
     * Setup
     * @param {HTMLConnector} html The html component
     */
    setup(html: HTMLConnector) {
        connector = html;
        connector.addEventListener("DataChanged", () => {
            html.Data.forEach((ev: { id: string, name: string, data: any }) => {
                handleMatlabEvent(ev.id, ev.name, ev.data);
            })
        })
    }
}

/**
 * 
 * @param {string} id 
 * @param {string} name 
 * @param {any} data 
 */
function handleMatlabEvent(id: string, name: string, data: any) {
    let src = components.find((e) => { return e.id === id });
    if (src !== undefined) {
        src.handleEvent(name, data);
        return;
    }
    let pre = preIds.find((e) => { return e.id === id });
    if (pre !== undefined) {
        pre.events.push({ name: name, data: data });
        return;
    }
}