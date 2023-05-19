import { EditorState, StateEffect, StateField, Transaction, Compartment } from "@codemirror/state"
import { EditorView, Decoration, type DecorationSet } from "@codemirror/view"


const markUneditable = StateEffect.define<{ from: number, to: number }>({
    map: ({ from, to }, change) => ({ from: change.mapPos(from), to: change.mapPos(to) })
})

const markEditable = StateEffect.define<null>();

const uneditableField = StateField.define<DecorationSet>({
    create() {
        return Decoration.none
    },
    update(uneditable: DecorationSet, tr: Transaction) {
        uneditable = uneditable.map(tr.changes);
        for (let e of tr.effects) {
            if (e.is(markEditable)) {
                uneditable = uneditable.update({
                    filter: () => false,
                })
            }
            if (e.is(markUneditable)) {
                uneditable = uneditable.update({
                    add: [uneditableMark.range(e.value.from, e.value.from)],
                })
            }
        }
        return uneditable
    },
    provide: f => EditorView.decorations.from(f)
})

const uneditableMark = Decoration.line({ class: "cm-uneditable" });

function readOnlyTransactionFilter() {
    return EditorState.transactionFilter.of((tr) => {
        const startState = tr.startState;
        let readonlyRangeSet = startState.field(uneditableField, false)
        if (readonlyRangeSet && tr.docChanged && !tr.annotation(Transaction.remote)) {
            let block = false;
            tr.changes.iterChangedRanges((chFrom, chTo) => {
                let range = readonlyRangeSet.iter();
                for (let ii = 1; ii <= readonlyRangeSet.size; ii++) {
                    const roFrom = range.from;
                    const roTo = startState.doc.lineAt(roFrom).to;
                    if (chTo >= roFrom && chFrom <= roTo) {
                        block = true;
                        break;
                    }
                    range.next();
                }
            })
            if (block) return []
        }
        return tr;
    })
}

let ro_compartment = new Compartment;

export function getROExtension() {
    return ro_compartment.of([
        uneditableField,
        readOnlyTransactionFilter(),
    ])
}

export function markUneditableRange(view: EditorView, lines: number[]) {

    if (ro_compartment.get(view.state) === undefined) {
        view.dispatch({
            effects: StateEffect.appendConfig.of(ro_compartment.of(readOnlyTransactionFilter()))
        })
    }
    
    view.dispatch({
        effects: markEditable.of(null),
    })

    let effects: StateEffect<unknown>[] = lines.map((n) => markUneditable.of({
        from: view.state.doc.line(n).from,
        to: view.state.doc.line(n).to,
    }))

    if (!effects.length) return false

    effects.push(ro_compartment.reconfigure([
        uneditableField,
        readOnlyTransactionFilter(),
    ]))

    view.dispatch({ effects })
    return true
}



