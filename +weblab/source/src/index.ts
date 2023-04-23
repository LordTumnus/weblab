import connector from "./+internal/connector";
import Frame from "./+internal/frame";
import "./style.css";


let frame = new Frame();
frame.id = "wb__frame"; 
connector.register(frame);
document.body.appendChild(frame);

window["setup"] = function (html:any) {
    connector.setup(html);
};




