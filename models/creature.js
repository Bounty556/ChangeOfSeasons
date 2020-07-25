const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CreatureSchema = new Schema({
    season: {type: String, required: true},
    cardId: {type: Number , required: true},
    cardType: {type: Number, required: true},
    resource: {type: Number, required: true},
    Attack: {type: Number, required: true},
    Heath: {type: Number, required: true},
    effect: {type: String},
    name: {type: String, required: true},
    img: {type: String, required: true}
});

const Creature = mongoose.model("Creature", CreatureSchema);

module.exports = Creature