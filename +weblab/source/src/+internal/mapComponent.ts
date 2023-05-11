import Component from './component';

/**
 * Dynamically import the component in JS mapped to the Matlab class passed
 * as an inpur argument
 * @param {string} className 
 * @returns {Promise<{default: typeof Component}|undefined>}
 */
export default async function mapComponent(className: string): Promise<{ default: typeof Component } | undefined> {
    switch (className) {
        case 'weblab.components.Tree':
            return await import('../+components/tree/index');
        case 'weblab.components.TagBar':
            return await import('../+components/tagbar/index');
        case 'weblab.components.TagFilterTree':
            return await import('../+components/tagtree/index');
        case 'weblab.components.Progress':
            return await import('../+components/progress/index');
        case 'weblab.components.CodeEditor':
            return await import('../+components/codeeditor/index');
        case 'weblab.components.HTMLContainer':
            return await import('../+components/htmlcontainer/index');
        default:
            return;
    }
}

