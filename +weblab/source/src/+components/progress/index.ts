import Component from "../../+internal/component";
import "./style.css";


export default class Progress extends Component {

    progressType: 'linear' | 'circular';
    currentValue: number = 0;
    isIndeterminate: boolean = false;

    #bar: HTMLSpanElement;
    #root: HTMLSpanElement;

    constructor() {
        super();
    }

    set progress_type(t: 'linear' | 'circular') {
        if (t !== this.progressType) {
            this.progressType = t;
            this.#redraw();
        }
    }

    set value(v: number) {
        this.currentValue = v;
        if (!this.isIndeterminate) {
            this.#bar.style.transform = `translateX(${v-100}%)`;
        }
    }

    set indeterminate(tf: boolean) {
        if (tf == this.isIndeterminate) {
            return;
        }
        this.isIndeterminate = tf;
        if (tf) {
            this.#bar.style.transform = "unset";
            this.#bar.classList.add("progress__linear--bar--indeterminate");
        } else {
            this.#bar.classList.remove("progress__linear--bar--indeterminate");
            this.#bar.style.transform = `translateX(${this.currentValue-100}%)`;
        }
    }

    #redraw() {
        this.innerHTML = "";
        switch (this.progressType) {
            case 'linear':
                this.#drawLinearProgressBar();
                break;
            case 'circular':
                this.#drawCircularProgressBar();
                break;
            default:
                this.#drawLinearProgressBar();
                break;
        }
    }

    #drawLinearProgressBar() {
        this.#root = document.createElement('span');
        this.#root.classList.add("progress__linear--root");
        this.#bar = document.createElement('span');
        this.#bar.classList.add("progress__linear--bar");

        this.#root.appendChild(this.#bar);
        this.appendChild(this.#root);
    }

    #drawCircularProgressBar() {

    }

}

customElements.define('weblab-progress', Progress);

