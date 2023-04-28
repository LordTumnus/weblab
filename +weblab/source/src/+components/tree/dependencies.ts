// FontAwesome deps
import { library, dom, config } from '@fortawesome/fontawesome-svg-core'
import { faFolder, faFolderOpen } from '@fortawesome/free-solid-svg-icons'

// Lodash deps
import cloneDeep from "lodash/cloneDeep";
import uniq from "lodash/uniq";
import some from "lodash/some";
import forEach from "lodash/forEach";

// Deepdash deps
import { filterDeep, mapValuesDeep } from 'deepdash-es/standalone'



// Configure the fontawesome icons
config.autoReplaceSvg = 'nest';
library.add(faFolder, faFolderOpen);

export { dom, cloneDeep, uniq, some, forEach, filterDeep, mapValuesDeep };

/**
 * Run through the leaves. Filter the one that contained the matching
 * string 
 * @param {any} tree 
 * @param {string} match 
 * @returns {any}
 */
export function filter_match_leaf(tree: any, match: string): any {
    return filterDeep(
        tree,
        (node: any) => {
            return node.name.includes(match)
        },
        {
            childrenPath: ['node', 'children'],
            leavesOnly: true
        }
    );
}

/**
 * Run through the branches. Filter the branches that contain the
 * matching string AND all their children (including sub-branches and
 * leaves)
 * @param {any} tree 
 * @param {string} match 
 * @returns {any}
 */
export function filter_match_branch(tree: any, match: string): any {

    return filterDeep(
        tree,
        (node: any) => {
            return node.children.length !== 0 && node.name.includes(match)
        },
        {
            childrenPath: ['node', 'children'],
            onTrue: { skipChildren: true },
        }
    );
}

/**
 * Run through the leaves. Keep only the ones that do not contain the
 * matching string
 * @param {any} tree 
 * @param {string} match 
 * @returns {any}
 */
export function filter_exclude_leaf(tree: any, match: string): any {
    return filterDeep(
        tree,
        (node: any) => {
            return !node.name.includes(match)
        },
        {
            childrenPath: ['node', 'children'],
            leavesOnly: true
        }
    );
}

/**
 * Run thorugh the branches. If a branch contains the matching string,
 * then do not return it or any of its children
 * @param {any} tree 
 * @param {string} match 
 * @returns {any}
 */
export function filter_exclude_branch(tree: any, match: string): any {
    return filterDeep(
        tree,
        (node: any) => {
            if (node.children.length !== 0 && !node.name.includes(match)) {
                // If a branch does not include the matching string, there is a
                // chance still that we dont need it, so return undefined
                return undefined
            } else if (node.children.length === 0) {
                return true
            } else {
                return false
            }
        },
        {
            childrenPath: ['node', 'children'],
            onTrue: { skipChildren: false },
            onFalse: { skipChildren: true },
        }
    );
}

/**
 * 
 * @param name 
 * @param filt 
 * @returns 
 */
export function applyHighlight(name: string, filt: string[]) {
    // Given a string and an array of filters, this function replaces the
    // sections of the name that match with the filter by <mark>$</match>
    var indexes: [number, number][] = [];

    uniq(filt).forEach((f: string) => {
        let i = -1;
        while ((i = name.indexOf(f, i + 1)) != -1) {
            indexes.length ? (some(indexes, (pair, ii) => {
                if ((i >= pair[0]) && (i < pair[1])) {
                    if ((i + f.length) > pair[1]) {
                        indexes[ii] = [pair[0], i + f.length];
                        return true
                    }
                } else if ((i + f.length > pair[0]) && (i + f.length <= pair[1])) {
                    if (i < pair[0]) {
                        indexes[ii] = [ii, pair[1]];
                        return true
                    }
                }
            }) ? [] : indexes.push([i, i + f.length])) : indexes.push([i, i + f.length]);
        }
    });
    let keywords: string[] = [];
    forEach(indexes, (pair: [number, number]) => keywords.push(name.substring(pair[0], pair[1])));
    const pattern = new RegExp(`(${keywords.sort((a, b) => { return b.length - a.length }).map((s) => { return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') }).join('|')})`, 'g');
    return name.replace(pattern, match => `<mark>${match}</mark>`);
}