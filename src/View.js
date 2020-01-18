/** Simple (I hope) View. */

export default class View {
    /**
     * @prop {Element} el Html element container for view.
     * @prop {Object} model
     * @prop {EventEmitter} emitter
     * @prop {Object} events DOM events, selectors and handlers.
     */
    constructor({
        el = null,
        model = null,
        emitter = null,
        events = [],
        listeners = {}
    }) {
        this.el = el;
        this.model = model;
        this.emitter = emitter;
        this.listeners = {};
        const listenEvents = Object.keys(listeners);
        listenEvents.forEach((event) => {
            this.setListener(event, listenEvents[event]);
        });
        this.events = {};
        events.forEach((ev) => {
            this.setEvent(ev);
        });
    }
    /**
     * Handler: Any attached events go through this method.
     * @param {Event} ev Some type of event.
     */
    eventHandler(ev) {
        if (!this.events[ev.type]) {
            return;
        }
        const selectors = Object.keys(this.events[ev.type]);
        selectors.forEach((sel) => {
            const elements = Array.from(this.el.querySelectorAll(sel));
            if (elements.indexOf(ev.target) === -1) {
                return;
            }
            const handler = this.events[ev.type][sel];
            this[handler].call(this, ev);
        })
    }
    /**
     * Add an event to the view.
     * @param {Object} data
     * @param {String} data.event Event name (click, submit, etc). Must match the event.type prop.
     * @param {String} data.selector Selector for the element to be target of event.
     * @param {String} data.method Name of method (on the view) to call for event.
     */
    setEvent({
        event,
        selector,
        method,
    }) {
        let register = false;
        if (!this.events[event]) {
            this.events[event] = {};
            register = true;
        }
        this.events[event][selector] = method;
        if (register) {
            this.el.addEventListener(event, this.eventHandler.bind(this));
        }
    }

    setListener(event, method) {
        if (!this.emitter) {
            return;
        }
        this.emitter.on(event, this[method], this);
    }
}
