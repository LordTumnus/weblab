import Component from "../../+internal/component";
import "./style.css";


export default class Progress extends Component {

    progressType: 'linear' | 'circular';
    currentValue: number = 0;
    isIndeterminate: boolean = false;
    isShowingValue: boolean = false;

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
            (this.progressType === 'linear') && setLinearValue(v);
            (this.progressType === 'circular') && setCircularValue(v);
        }

    }

    set show_value(tf: boolean) {
        if (this.isShowingValue === tf) {
            return;
        }
        this.isShowingValue = tf;
        if (this.isIndeterminate) {
            return;
        }
        if (this.progressType === 'linear') {
            const value = document.querySelector('.progress__linear--value')!;
            tf ? value.classList.add("display") : value.classList.remove("display");
        }
    }

    set indeterminate(tf: boolean) {
        if (tf == this.isIndeterminate) {
            return;
        }
        this.isIndeterminate = tf;
        (this.progressType === 'linear') && this.#setLinearIndeterminate(tf);
        (this.progressType === 'circular') && this.#setCircularIndeterminate(tf);
    }

    set border_style(s: 'round' | 'pill' | 'sharp') {
        if (this.progressType === 'circular') { return }

        const root = document.querySelector('.progress__linear--root')!;
        if (s === 'round') {
            root.classList.add("round-borders");
            root.classList.remove("pill-borders");
        } else if (s === 'pill') {
            root.classList.add("pill-borders");
            root.classList.remove("round-borders");
        } else {
            root.classList.remove("round-borders");
            root.classList.remove("pill-borders");
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

        let container = document.createElement('div');
        container.classList.add("progress__linear--container");
        let value = document.createElement('div');
        value.classList.add("progress__linear--value");
        value.innerHTML = "0%";

        let root = document.createElement('span');
        root.classList.add("progress__linear--root");
        let bar = document.createElement('span');
        bar.classList.add("progress__linear--bar");

        root.appendChild(bar);
        container.appendChild(root);
        this.appendChild(container);
        this.appendChild(value);
    }

    #drawCircularProgressBar() {

    }

    #setLinearIndeterminate(tf: boolean) {
        const bar = <HTMLSpanElement>document.querySelector(".progress__linear--bar")!;
        const value = <HTMLDivElement>document.querySelector(".progress__linear--value")!;
        if (tf) {
            bar.style.transform = "unset";
            value.classList.remove("display");
            bar.classList.add("progress__linear--bar--indeterminate");
        } else {
            this.isShowingValue ? value.classList.add("display") : value.classList.remove("display");
            bar.classList.remove("progress__linear--bar--indeterminate");
            setLinearValue(this.currentValue);
        }
    }

    #setCircularIndeterminate(tf: boolean) {
        if (tf) {

        } else {

        }
    }

}

customElements.define('weblab-progress', Progress);


function setLinearValue(v: number) {
    const bar = <HTMLSpanElement>document.querySelector(".progress__linear--bar")!;
    bar.style.transform = `translateX(${v - 100}%)`;

    const value = <HTMLDivElement>document.querySelector(".progress__linear--value")!;
    value.innerHTML = `${Math.floor(v)}%`;
}

function setCircularValue(v: number) {

}