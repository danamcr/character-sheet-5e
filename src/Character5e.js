/**
 * Model for 5e character data
 */

 export const constants = Object.freeze({
    SKILL_UNSKILLED: 0,
    SKILL_PROFICIENT: 1,
    SKILL_EXPERT: 2
 });

 export const attributes = Object.freeze({
    STRENGTH: 'str',
    DEXTERITY: 'dex',
    CONSTITUTION: 'con',
    INTELLIGENCE: 'intel',
    WISDOM: 'wis',
    CHARISMA: 'cha'
 });

 export const skills = Object.freeze({
    acrobatics: attributes.DEXTERITY,
    animal_handling: attributes.WISDOM,
    arcana: attributes.INTELLIGENCE,
    athletics: attributes.STRENGTH,
    deception: attributes.CHARISMA,
    history: attributes.INTELLIGENCE,
    insight: attributes.WISDOM,
    intimidation: attributes.CHARISMA,
    investigation: attributes.INTELLIGENCE,
    medicine: attributes.WISDOM,
    nature: attributes.INTELLIGENCE,
    perception: attributes.WISDOM,
    performance: attributes.CHARISMA,
    persuasion: attributes.CHARISMA,
    religion: attributes.INTELLIGENCE,
    sleight_of_hand: attributes.DEXTERITY,
    stealth: attributes.DEXTERITY,
    survival: attributes.WISDOM
 });

export default class Character5e {
    /**
     * Property notes...
     * @prop {String} key Unique (in one instance of the app) id for the character. 7 Random letters/numbers.
     * @prop {String} charname Name.
     * @prop {Array[]} weapons Weapon data (name, att, dam, notes).
     * @prop {String[]} features Special features and abilities.
     * @prop {String[]} equipment Stuff the character carries.
     * @prop {Array[]} notes_adv Adventure notes [header, text]
     * @prop {Array[]} notes_cam Campaign notes [header, text]
     * @prop {Array[]} npcs NPC notes [header, text]
     * @prop {Array[]} factions NPC notes [header, text]
     * @prop {String} key_prev If character was imported into app with identical key. This is that key and the character is given a new one on import.
     * @prop {Object} skills Skill and its level. 0/1/2 (See constants).
     */
    constructor ({
        key = '',
        charname = '',
        charclass = '',
        race = '',
        background = '',
        alignment = '',
        level = 1,
        experience = 0,
        inspiration = '',
        proficiency = '+2',
        armor_class = '',
        speed = 30,
        hp_cur = '',
        hp_max = '',
        hd_cur = '',
        hd_max = '',
        deathSave = {
            success: 0,
            fail: 0
        },
        str = 10,
        dex = 10,
        con = 10,
        intel = 10,
        wis = 10,
        cha = 10,
        saves = {
            'str': 0,
            'dex': 0,
            'con': 0,
            'intel': 0,
            'wis': 0,
            'cha': 0
        },
        skills = {
            acrobatics: 0,
            animal_handling: 0,
            arcana: 0,
            athletics: 0,
            deception: 0,
            history: 0,
            insight: 0,
            intimidation: 0,
            investigation: 0,
            medicine: 0,
            nature: 0,
            perception: 0,
            performance: 0,
            persuasion: 0,
            religion: 0,
            sleight_of_hand: 0,
            stealth: 0,
            survival: 0
        },
        weapons = [],
        proficiencies_other = '',
        languages = '',
        traits = '',
        ideals = '',
        bonds = '',
        flaws = '',
        appearance = '',
        equipment = [],
        cp = '',
        sp = '',
        gp = '',
        pp = '',
        features = [],
        notes = '',
        notes_adv = [],
        notes_cam = [],
        npcs = [],
        factions = [],
        partymembers = [],
        spell_ability = '',
        spell_save = '',
        spell_attack = '',
        spell_slots = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0
        },
        spell_slots_cur = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0
        },
        spells = {
            0: [],
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: [],
            7: [],
            8: [],
            9: []
        },
        updated = '',
        key_prev = ''
    }, emitter = null) {
        this.app = 'character-sheet-5e';
        this.key = key;
        this.charname = charname;
        this.charclass = charclass;
        this.race = race;
        this.background = background;
        this.alignment = alignment;
        this.level = level;
        this.experience = experience;
        this.inspiration = inspiration;
        this.proficiency = proficiency;
        this.armor_class = armor_class;
        this.speed = speed;
        this.hp_cur = hp_cur;
        this.hp_max = hp_max;
        this.hd_cur = hd_cur;
        this.hd_max = hd_max;
        this.deathSave = deathSave;
        this.str = str;
        this.dex = dex;
        this.con = con;
        this.intel = intel;
        this.wis = wis;
        this.cha = cha;
        this.saves = saves;
        this.skills = skills;
        // @version < 2.2.0 Backwards compatibile convert sleight_of_Hand to sleight_of_hand
        if (typeof this.skills['sleight_of_Hand'] !== 'undefined') {
            const sleight = this.skills['sleight_of_Hand'];
            delete this.skills['sleight_of_Hand'];
            this.skills['sleight_of_hand'] = sleight;
        }

        // @version < 1.8.0 Backwards compatible convert string to the text of a first list item.
        if (!Array.isArray(weapons)) {
            const lines = weapons.split(new RegExp('<br/?>', 'i'));
            weapons = lines.map((el) => { return [el]; });
        }
        this.weapons = weapons;
        this.proficiencies_other = proficiencies_other;
        this.languages = languages;
        this.traits = traits;
        this.ideals = ideals;
        this.bonds = bonds;
        this.flaws = flaws;
        this.appearance = appearance;
        // @version < 1.8.0 Backwards compatible convert string to array
        if (!Array.isArray(equipment)) {
            equipment = equipment.split(new RegExp('<br/?>', 'i'));
        }
        this.equipment = equipment;
        this.cp = cp;
        this.sp = sp;
        this.gp = gp;
        this.pp = pp;
        // @version < 1.8.0 Backwards compatible convert string to array
        if (!Array.isArray(features)) {
            features = features.split(new RegExp('<br/?>', 'i'));
        }
        this.features = features;
        this.notes = notes;
        // @version < 1.8.0 Backwards compatible convert string to the text of a first list item.
        if (!Array.isArray(notes_adv)) {
            notes_adv = [
                ['', notes_adv]
            ];
        }
        this.notes_adv = notes_adv;
        // @version < 1.8.0 Backwards compatible convert string to the text of a first list item.
        if (!Array.isArray(notes_cam)) {
            notes_cam = [
                ['', notes_cam]
            ];
        }
        this.notes_cam = notes_cam;
        this.npcs = npcs;
        this.factions = factions;
        this.partymembers = partymembers;
        this.spell_ability = spell_ability;
        this.spell_save = spell_save;
        this.spell_attack = spell_attack;
        this.spell_slots = spell_slots;
        this.spell_slots_cur = spell_slots_cur;
        this.spells = spells;
        this.updated = updated;
        this.key_prev = key_prev;

        this.emitter = emitter;
    }
    /**
     * A quick summary header for use in lists.
     */
    get summaryHeader() {
        return `${this.charname} (${this.charclass} ${this.level})`;
    }

    getAttributeMod(attr) {
        const score = this[attr];
        const raw = Math.floor((score - 10) / 2);
        return (raw > 0) ? `+${raw}` : raw.toString();
    }

    isProficient(skill) {
        return this.skills[skill] > constants.SKILL_UNSKILLED;
    }
    isExpert(skill) {
        return this.skills[skill] === constants.SKILL_EXPERT;
    }

    getSkillMod(skill) {
        if (!this.skills[skill]) {
            return 0;
        }
        const attribute = skills[skill];
        const attributeMod = this.getAttributeMod(attribute);
        const profMod = this.proficiency;


        let raw = 0 + parseInt(attributeMod, 10);
        if (this.isProficient(skill)) {
            raw += profMod;
        }
        if (this.isExpert(skill)) {
            raw += profMod;
        }
        return (raw > 0) ? `+${raw}` : raw.toString();
    }

    addSkill(skill) {
        if (!this.skills[skill]) {
            return;
        }
        this.skills[skill] = constants.SKILL_PROFICIENT;
        // trigger event.
        this.emitter.trigger('char:skill:change', skill, this.getSkillMod(skill));
    }

    removeSkill(skill) {
        if (!this.skills[skill]) {
            return;
        }
        this.skills[skill] = constants.SKILL_UNSKILLED;
        // trigger event.
        this.emitter.trigger('char:skill:change', skill, this.getSkillMod(skill));
    }

    addExpertisel(skill) {
        if (!this.skills[skill]) {
            return;
        }
        this.skills[skill] = constants.SKILL_EXPERT;
         // trigger event.
         this.emitter.trigger('char:skill:change', skill, this.getSkillMod(skill));
    }

    removeExpertise(skill) {
        if (!this.skills[skill]) {
            return;
        }
        this.skills[skill] = constants.SKILL_PROFICIENT;
        // trigger event.
        this.emitter.trigger('char:skill:change', skill, this.getSkillMod(skill));
    }
};
