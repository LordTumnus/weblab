import Component from "../../+internal/component";
import "./style.css";

import * as _ from './dependencies';


export default class Tree extends Component {

    #tree_view: HTMLDivElement;
    #branch_template: HTMLLIElement;
    #leaf_template: HTMLLIElement;



    Data: any = { "name": 'root', "children": [] };
    ViewData: any;

    applyHighlight: boolean = true;
    image_map = {};

    constructor() {
        super();
        this.#initialize();
        // @ts-ignore
        _.dom.watch({
            autoReplaceSvgRoot: this,
            observeMutationsRoot: this
        });

        this.subscribe("apply_filter", (f: { value: string, type: "leaf" | "branch" | "~leaf" | "~branch" }[]) => {
            this.filter(...f);
        })

        this.subscribe("expand_all", () => {
            this.expandAll();
        })

        this.subscribe("collapse_all", () => {
            this.collapseAll();
        })
    }

    set data(d: any) {
        this.Data = d;
        this.#renderTree(d);
    }

    set highlight_on_filter(tf: boolean) {
        this.applyHighlight = tf;
    }


    #initialize() {

        this.#tree_view = document.createElement("div");
        this.#tree_view.classList.add("treeview");
        this.appendChild(this.#tree_view);

        this.#branch_template = document.createElement("li");
        this.#branch_template.id = "branch_template";
        this.#branch_template.classList.add("treeview__branch")
        let branch_node = document.createElement("div");
        branch_node.classList.add("treeview__node", "treeview__node--clickable");
        let branch_icon = document.createElement("i");
        branch_icon.classList.add("fas", "fa-folder")
        let branch_contents = document.createElement("div");
        branch_contents.tabIndex = 0;
        branch_node.appendChild(branch_icon);
        branch_node.appendChild(branch_contents);
        this.#branch_template.appendChild(branch_node);

        this.#leaf_template = document.createElement("li");
        this.#leaf_template.id = "leaf_template";
        this.#leaf_template.classList.add("treeview__leaf")
        let leaf_node = document.createElement("div");
        leaf_node.classList.add("treeview__node");
        let leaf_icon = document.createElement("i");
        let leaf_contents = document.createElement("div");
        leaf_contents.tabIndex = 0;
        leaf_node.appendChild(leaf_icon);
        leaf_node.appendChild(leaf_contents);
        this.#leaf_template.appendChild(leaf_node);
    }

    /**
     * Filter the tree Data
     * @param {{ value: string, type: "leaf" | "branch" | "~leaf" | "~branch" }[]} filters 
     */
    filter(...filters: { value: string, type: "leaf" | "branch" | "~leaf" | "~branch" }[]) {

        // Clone the original data
        let filteredTree = _.cloneDeep(this.Data);
        let leafFilters: string[] = [];

        // Apply each filter in order
        _.forEach(filters, (filter_: { value: string, type: "leaf" | "branch" | "~leaf" | "~branch" }) => {
            if (filteredTree) {
                if (filter_.type === "~branch") {
                    filteredTree = _.filter_exclude_branch(filteredTree, filter_.value)
                } else if (filter_.type === "branch") {
                    filteredTree = _.filter_match_branch(filteredTree, filter_.value)
                } else if (filter_.type === "~leaf") {
                    filteredTree = _.filter_exclude_leaf(filteredTree, filter_.value);
                } else {
                    filteredTree = _.filter_match_leaf(filteredTree, filter_.value);
                    leafFilters.push(filter_.value);
                }
            }
        });
        /* Loop through the remanining nodes after the filtering to:
            - Force branches to be expanded
            - highlight the portions of the names that matched the filter
        */
        if (filters.length === 0) {
            filteredTree = this.Data;
        } else if (filteredTree) {
            filteredTree = _.mapValuesDeep(
                filteredTree,
                (node: any) => {
                    node["expanded"] = true;
                    if (this.applyHighlight && (node.children.length === 0 && leafFilters.length)) {
                        node.markedname = _.applyHighlight(node.name.replace(/<\/?[^>]+(>|$)/g, ""), leafFilters);
                        node.highlighted = true;
                    }
                    return node
                },
                {
                    childrenPath: ['node', 'children'],
                });
        } else {
            // Render an empty tree
            filteredTree = { name: "root", children: [] }
        }
        this.#renderTree(filteredTree);
    }

    expandAll() {
        this.Data = _.mapValuesDeep(
            this.Data,
            (node: any) => {
                if (node.children.length !== 0) {
                    node["expanded"] = true;
                }
                return node;
            },
            {
                childrenPath: ['node', 'children'],
            }
        )
        this.#renderTree(this.Data);
    }

    collapseAll() {
        this.Data = _.mapValuesDeep(
            this.Data,
            (node: any) => {
                if (node.children.length !== 0) {
                    node["expanded"] = false;
                }
                return node;
            },
            {
                childrenPath: ['node', 'children'],
            }
        )
        this.#renderTree(this.Data);
    }


    /**
     * Render the tree from the data passed
     * @param {any} data 
     */
    #renderTree(data: any) {
        // Clear the treeview div element. Also clean the class
        // definitions to remove the scrollbars
        this.#tree_view.innerHTML = "";

        // Append an unordered list where the nodes will be rendered
        this.#tree_view.appendChild(document.createElement("ul"));

        // Render the composition. Do not render the root node
        _.forEach(data.children, (node) => {
            this.#renderNode(node, this.#tree_view);
        });
    }


    /**
     * Render a single tree node (branch or leaf)
     * @param node The node data
     * @param parent The HTML container (div or ul)
     * @returns {HTMLLIElement} The created HTMLLIElement
     */
    #renderNode(node: any, parent: HTMLElement): HTMLLIElement {

        // BRANCH
        if (node.children.length !== 0) {
            // Clone the branch template and remove its id
            var n = cloneNode(this.#branch_template);
            n.id = "";

            // Get the different subcomponents of the branch
            // Branch [ contents [ icon text ] [ ul ]]
            var n_contents = n.querySelector<HTMLDivElement>(":scope > div")!;
            var n_text = n_contents!.querySelector<HTMLDivElement>(":scope > div")!;
            n_text.innerHTML = node.name.replace(/<\/?[^>]+(>|$)/g, "");

            // Add the listeners
            // 1 - When clicking the contents, open or close the folder
            // icon and display/hide the children
            n_contents!.addEventListener("click", (e) => {
                e.stopPropagation();
                e.preventDefault();
                this.#renderChildren(node, n);
            });
            // 2 - Tab navigation: on Enter while focused, do the same
            // as a click (display/hide contents)
            n_contents.addEventListener("keyup", (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    n_contents.click();
                }
            }, false);

            // 3 - Disable the default focus behaviour of branches:
            // do not mark the outline of the selected branch
            n_text.addEventListener("mousedown", (e) => {
                e.preventDefault();
                e.stopPropagation();
            }, false);

            // Finally we can append the child to its parent DOM node
            // (it must be an unordered list)
            parent.querySelector(":scope > ul")!.appendChild(n);
            // After appending, we check if the nodes properties require
            // that the node is rendered already expanded
            if (node.expanded) {
                this.#renderChildren(node, n);
            }
        } else {
            // LEAF
            // Clone the leaf template and remove the id. By default,
            // leafs are rendered
            var n = cloneNode(this.#leaf_template);
            n.id = "";

            // Get the text content and add the name of the node
            // Leaf [ contents [ text ] ]
            n_text = n.querySelector<HTMLDivElement>(":scope > div > div")!;
            n_text.innerHTML = node.markedname
                ? node.markedname
                : node.name.replace(/<\/?[^>]+(>|$)/g, "");
            node.highlighted ? n_text.classList.add("treeview__node--highlight") : n_text.classList.remove("treeview__node--highlight")

            let n_icon = n.querySelector<HTMLDivElement>(":scope > div > i")!;
            if ("icon" in node) {
                if (node.icon in this.image_map) {
                    n_icon.style.backgroundImage = this.image_map[node.icon];
                    n_icon.classList.add("leaf-icon");
                } else if (this.image_map["default"] !== undefined) {
                    n_icon.style.backgroundImage = this.image_map["default"];
                    n_icon.classList.add("leaf-icon");
                }
            }
            /*
            n_text.addEventListener("click", (e) => {
                uihtml.Data = { name: "nodeClick", data: node.name }
                //console.log(e.dataTransfer.getData('text/plain'));
            }, false);
            */
            parent.querySelector(":scope > ul")!.appendChild(n);
        }
        return n;
    }

    /**
     * Function called whenever a branch node is clicked.
     * Lazy-loads the children of said node
     * @param {any} node The node data
     * @param {HTMLLIElement} p The HTMLIElement of that node
     */
    #renderChildren(node: any, p: HTMLLIElement) {
        // If there is no <ul> , that means that the ul elements have
        // not been rendered. In that case, render them. Otherwise, just
        // toggle the display of the <ul>
        let ul = p.querySelector(":scope > ul");

        if (!ul) {
            p.appendChild(document.createElement("ul"));
            _.forEach(node.children, (child) => {
                this.#renderNode(child, p);
            });
            node.expanded = true;
        } else {
            ul.classList.toggle("treeview__list--visible");
            node.expanded = !node.expanded;
        }
        var p_icon_svg = p.querySelector(":scope > div > i > svg");
        if (p_icon_svg) {
            p_icon_svg.classList.toggle("fa-folder");
            p_icon_svg.classList.toggle("fa-folder-open");
        } else {
            p.querySelector(":scope > div > i")!.classList.toggle("fa-folder");
            p.querySelector(":scope > div > i")!.classList.toggle("fa-folder-open");
        }

    }

}


customElements.define('weblab-tree', Tree);

function cloneNode<T extends Node>(node: T) {
    return <T>node.cloneNode(true);
}
