import { default as View } from './View.js';

export default class SkillView extends View {


    constructor({ el, emitter, model }) {
        const event = [
            {
                event: 'change',
                selector: 'input[data-name="skills"]',
                method: 'updateSkill'
            },
            {
                event: 'change',
                selector: 'input[data-name="expert"]',
                method: 'updateExpertise'
            }
        ];
        const listeners = {
            'char:skill:change': 'updateSkillMod'
        };
        super({ emitter, model, el, events, listeners});
    }

    render() {
        // template?

        // list template.

        // item template for each skill?
    }

    // update model when skill is checked/unchecked
    updateSkill(ev) {
        // which skill?
        const skill = ev.target.datalist.subfield || '';
        if (!skill) {
            return;
        }
        // update model
        if (ev.target.checked) {
            this.model.removeSkill(skill);
        } else {
            this.model.addSkill(skill);
        }
    }
    // update model when expertise is checked/unchecked
    updateExpertise(ev) {
        // which skill?
        const skill = ev.target.datalist.subfield || '';
        if (!skill) {
            return;
        }
        // update model
        if (ev.target.checked) {
            this.model.removeExpertise(skill);
        } else {
            this.model.addExpertise(skill);
        }
    }
    // update modifier in UI
    updateSkillMod(skill, newModifier) {
        const skill = '';

        // update the modifier display value.
    }
}
