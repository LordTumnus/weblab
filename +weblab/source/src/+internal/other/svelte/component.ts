import { componentMixin } from '../../component'
import { SvelteComponentDev } from 'svelte/internal'


export default function svelteComponent(SvelteElement: typeof SvelteComponentDev) {
    return class extends componentMixin(HTMLElement) {
        _element: SvelteComponentDev;

        constructor() {
            super();
            this._element = new SvelteElement({
                target: this,
            });
            // Overload subscription to dirty prop. event
            this.subscribe("wb__dirty_prop", (data: any) => { this.setDirtyProperty(data) });
        }


        /**
         * Overload set dirty property method
         * @param {{ name: string, value:any }} prop 
         */
        setDirtyProperty(prop: { name: string, value: any }) {
            if (this._element[prop.name] !== undefined) {
                this._element[prop.name] = prop.value;
                return;
            }
            this[prop.name] = prop.value;
        }

        /**
         * Overload getProperty
         */
         getProperty(name: string) {
            if (Object.getPrototypeOf(this._element).hasOwnProperty(name)) {
                return this._element[name];
            } else if (Object.getPrototypeOf(this).hasOwnProperty(name)) {
                return this[name];
            } else {
                return null;
            }
        }


    }
}