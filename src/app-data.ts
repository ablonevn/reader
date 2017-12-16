import { Subject } from 'rxjs/Subject';

var appState={
    title:new Subject(),
    sites:new Subject()
};

export function setTitle(text) {
    appState.title.next(text);
}

export function getSite(id) {

}

export default appState;