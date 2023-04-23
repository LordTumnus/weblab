import { n, C as ComponentContainer, _ as __classPrivateFieldGet, d as debounce } from './index.js';
import TagBar from './index-9ccaa4cc.js';
import { d as dom$1, c as config$1, l as library$1, f as faFolder, a as faBan, b as faSlash, T as Tree } from './index-e19d1886.js';

var css = "weblab-tagtree {\n  display: flex;\n  flex-direction: column;\n  align-content: center;\n  justify-content: center;\n  overflow: hidden;\n  row-gap: 5px;\n}\n\nweblab-tagtree > .tagbar {\n  height: 3em;\n  padding: 0;\n}\n\nweblab-tagtree > .tagbar .tagify {\n  overflow-x: scroll;\n  flex-wrap: nowrap;\n  align-content: center;\n}\n\nweblab-tagtree > weblab-tree {\n  flex-grow: 1;\n}\n\nweblab-tagtree .tagify__input {\n  white-space: nowrap;\n}\n\n.tagify__tag-icon {\n  margin-right: 5px;\n  color: #777;\n  overflow: visible;\n}\n\n.tagify__tag-icon > i:nth-child(2){\n  margin-left: -1em;\n}\n\n.fa-ban, .fa-slash {\n  color: red;\n}\n";
n(css,{});

var _TagTree_instances, _TagTree_initialize, _TagTree_getTagProperties, _TagTree_styleTag;
config$1.autoReplaceSvg = 'nest';
library$1.add(faFolder, faBan, faSlash);
class TagTree extends ComponentContainer {
    constructor() {
        super();
        _TagTree_instances.add(this);
        this.not_operator = '~';
        this.branch_operator = ':';
        __classPrivateFieldGet(this, _TagTree_instances, "m", _TagTree_initialize).call(this);
        // @ts-ignore
        dom$1.watch({
            autoReplaceSvgRoot: this,
            observeMutationsRoot: this
        });
        this.subscribe("register_searchbar", (id) => {
            this.tagBar.id = id;
            this.appendComponent(this.tagBar);
        });
        this.subscribe("register_tree", (id) => {
            this.tree.id = id;
            this.appendComponent(this.tree);
        });
    }
}
_TagTree_instances = new WeakSet(), _TagTree_initialize = function _TagTree_initialize() {
    // Create the searchbar and tree
    this.tagBar = new TagBar();
    this.tree = new Tree();
    this.tagBar.tagify.settings.transformTag = (tagData) => __classPrivateFieldGet(this, _TagTree_instances, "m", _TagTree_getTagProperties).call(this, tagData);
    this.tagBar.tagify.settings.templates.tag = (tagData) => __classPrivateFieldGet(this, _TagTree_instances, "m", _TagTree_styleTag).call(this, tagData);
    this.tagBar.tagify.on("change", debounce((e) => {
        this.tree.filter(...e.detail.tagify.getCleanValue());
    }, 150));
}, _TagTree_getTagProperties = function _TagTree_getTagProperties(tagData) {
    if (tagData.type) {
        return;
    }
    if (tagData.value.startsWith(this.not_operator + this.branch_operator) ||
        tagData.value.startsWith(this.branch_operator + this.not_operator)) {
        tagData.type = '~branch';
        tagData.value = tagData.value.substring(this.not_operator.length + this.branch_operator.length);
    }
    else if (tagData.value.startsWith(this.branch_operator)) {
        tagData.type = 'branch';
        tagData.value = tagData.value.substring(this.branch_operator.length);
    }
    else if (tagData.value.startsWith(this.not_operator)) {
        tagData.type = '~leaf';
        tagData.value = tagData.value.substring(this.not_operator.length);
    }
    else {
        tagData.type = 'leaf';
    }
}, _TagTree_styleTag = function _TagTree_styleTag(tagData) {
    // Style the tags based on the tag qualifiers (see getTagProperties)
    let span = document.createElement('span');
    span.classList.add("tagify__tag-icon");
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
        return `<tag title='${tagData.value}' contenteditable='false' spellcheck="false" tabindex="0" class='tagify__tag' ${this.tagBar.tagify.getAttributes(tagData)}>
                      <x title='remove tag' class='tagify__tag__removeBtn'></x>
                      <div>
                          ${span.outerHTML}
                          <span class='tagify__tag-text'>${tagData.value}</span>
                      </div>
                      </tag>`;
    }
    catch (err) {
        console.log(err);
    }
};
customElements.define('weblab-tagtree', TagTree);

export { TagTree as default };
