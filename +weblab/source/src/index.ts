import connector from "./+internal/connector";
import Frame from "./+internal/frame";
import "./style.css";

import Editor from "./+components/codeeditor/index"

let frame = new Frame();
frame.id = "wb__frame"; 
connector.register(frame);
document.body.appendChild(frame);

window["setup"] = function (html:any) {
    connector.setup(html);
};

let e = new Editor();
window["e"] = e;
frame.appendChild(e)