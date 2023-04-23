// COMPONENTONTAINER
import Component from "./component";
import connector from "./connector";
import mapComponent from "./mapComponent";



export default class ComponentContainer extends Component {

    /**
     * Children components from this container
     * @type {Array<Component>}
     */
    components: Array<Component> = [];

    constructor() {
        super();
        this.subscribe("wb__insert", (data: { id: string, class: string }) => {
            this.insertComponent(data);
        });

        this.subscribe("wb__childevent", (ev: {name: string, id:string, data:any}) => {
            let src = this.components.find((e) => { return e.id === ev.id });
            if (src) {
                src.handleEvent(ev.name, ev.data);
            }
        })
    }

    /**
     * Append an existing element into the container
     * @param {Component} el The element added to the component
     */
    appendComponent(el: Component) {
        this.appendChild(el);
        this.components.push(el);
        connector.register(el);
    }

    /**
     * Dynamically insert a new component
     * @async
     * @param {{id:string, class:string}} data Object containing the id and class of the inserted element
     * @returns {Promise<Component>} A promise resolving to the inserted element
     */
    async insertComponent(data: { id: string, class: string }): Promise<Component|undefined> {
        connector.preregister(data.id);
        const myImport = await mapComponent(data.class);
        if (myImport) {
            let el = new (myImport.default)();
            el.id = data.id;
            this.appendComponent(el);
            return el;
        }
    }
}
