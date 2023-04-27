import {componentMixin} from '../../component'
import { SvelteComponentDev } from 'svelte/internal'


export default function svelteComponent(SvelteElement: typeof SvelteComponentDev) {
    return componentMixin(class extends HTMLElement{
        _element: SvelteComponentDev;

        constructor() {
            super();
            this._element = new SvelteElement({
                target: this,
            });
        }
    })
}