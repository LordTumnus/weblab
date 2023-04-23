import ComponentContainer from "../../+internal/container";
import TagBar from "../tagbar";
import Tree from "../tree";


import { library, dom, config } from '@fortawesome/fontawesome-svg-core'
import { faFolder, faBan, faSlash } from '@fortawesome/free-solid-svg-icons'

import debounce from "lodash/debounce";

import "./style.css";

config.autoReplaceSvg = 'nest';
library.add(faFolder, faBan, faSlash);

export default class TagTree extends ComponentContainer {

    tagBar: TagBar;
    tree: Tree;

    not_operator: string = '~';
    branch_operator: string = ':';

    constructor() {
        super();
        this.#initialize();
        // @ts-ignore
        dom.watch({
            autoReplaceSvgRoot: this,
            observeMutationsRoot: this
        });

        this.subscribe("register_searchbar", (id: string) => {
            this.tagBar.id = id;
            this.appendComponent(this.tagBar);
        });
        this.subscribe("register_tree", (id: string) => {
            this.tree.id = id;
            this.appendComponent(this.tree);
        });
    }

    #initialize() {
        // Create the searchbar and tree
        this.tagBar = new TagBar();
        this.tree = new Tree();

        this.tagBar.tagify.settings.transformTag = (tagData: any) => this.#getTagProperties(tagData);
        this.tagBar.tagify.settings.templates.tag = (tagData: any) => this.#styleTag(tagData)!;

        this.tagBar.tagify.on("change", debounce((e) => {
            this.tree.filter(...<{ value: string, type: "leaf" | "branch" | "~leaf" | "~branch" }[]>e.detail.tagify.getCleanValue())
            },150)
        )
    }

    /**
     * Given the input text for the tag, determine which type of filter it will apply to the tree
     * @param tagData 
     * @returns {undefined}
     */
    #getTagProperties(tagData: { value: string; type?: string }): undefined {

        if (tagData.type) {
            return;
        }

        if (tagData.value.startsWith(this.not_operator + this.branch_operator) ||
            tagData.value.startsWith(this.branch_operator + this.not_operator)) {
            tagData.type = '~branch';
            tagData.value = tagData.value.substring(this.not_operator.length + this.branch_operator.length);
        } else if (tagData.value.startsWith(this.branch_operator)) {
            tagData.type = 'branch';
            tagData.value = tagData.value.substring(this.branch_operator.length);
        } else if (tagData.value.startsWith(this.not_operator)) {
            tagData.type = '~leaf';
            tagData.value = tagData.value.substring(this.not_operator.length);
        } else {
            tagData.type = 'leaf';
        }
    }

    /**
     * Transform every tag 
     * @param {{ value: string; type: 'leaf' | 'branch' | '~leaf' | '~branch' }} tagData 
     * @returns {string|undefined} the html code for the tag
     */
    #styleTag(tagData: { value: string; type: 'leaf' | 'branch' | '~leaf' | '~branch' }): string | undefined {
        // Style the tags based on the tag qualifiers (see getTagProperties)
        let span = document.createElement('span');
        span.classList.add("tagify__tag-icon")
        switch (tagData.type) {
            case 'leaf':
                span.style.display = "inline";
                break;
            case 'branch':
                span.innerHTML = '<i class="fas fa-folder"></i>';
                break;
            case '~leaf':
                span.innerHTML = '<i class="fas fa-ban"></i>';
                break;
            case '~branch':
                span.innerHTML = '<i class="fas fa-folder"></i><i class="fas fa-slash fa-rotate-90"></i>';
                break;
        }
        try {
            return `<tag title='${tagData.value
                }' contenteditable='false' spellcheck="false" tabindex="0" class='tagify__tag' ${this.tagBar.tagify.getAttributes(
                    tagData
                )}>
                      <x title='remove tag' class='tagify__tag__removeBtn'></x>
                      <div>
                          ${span.outerHTML}
                          <span class='tagify__tag-text'>${tagData.value}</span>
                      </div>
                      </tag>`;
        } catch (err) {
            console.log(err);
        }
    }
};

customElements.define('weblab-tagtree', TagTree);



