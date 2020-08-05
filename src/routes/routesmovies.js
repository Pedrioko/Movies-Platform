const express = require('express');
const router = express.Router();
const ObjectID = require('mongodb').ObjectID;
const Collection = require('../models').moviemodel;
const config = require("../config/index")
const attrname = "portada";
const { saveFile } = require('../services/files');



const update = async (req, res) => {
    let changedEntry = req.body;
    changedEntry._id = new ObjectID(changedEntry._id);
    changedEntry.categorias = changedEntry.categorias ? Array.isArray(changedEntry.categorias) ? changedEntry.categorias.map(e => new ObjectID(e)) : [new ObjectID(changedEntry.categorias)] : [];
    changedEntry.reparto = changedEntry.reparto ? Array.isArray(changedEntry.reparto) ? changedEntry.reparto.map(e => new ObjectID(e)) : [new ObjectID(changedEntry.reparto)] : [];
    changedEntry = await Collection.updateOne({ _id: req.params._id }, { $set: changedEntry })
    res.sendStatus(200).send(changedEntry);
};


const likedOne = async (req, res) => {
    const { _id } = req.params;
    var result = await Collection.findById(_id);
    result.like = result.like ? result.like + 1 : 1;
    await Collection.updateOne({ _id: _id }, { $set: { like: result.like } });
    res.send(result);
};


router.post('/', config.multer.single(attrname), async function (req, res) {
    try {
        const find = {};
        find["name"] = req.body["name"];
        var doc = await Collection.findOne({ "_id": req.body["_id"] });
        if (!doc)
            doc = await Collection.findOne(find);

        let changedEntry = req.body;


        if (Array.isArray(changedEntry.categorias)) {
            changedEntry.categorias = changedEntry.categorias ? changedEntry.categorias.map(e => new ObjectID(e)) : [];
        } else {
            changedEntry.categorias = changedEntry.categorias ? [new ObjectID(changedEntry.categorias)] : [];
        }
        changedEntry.reparto = changedEntry.reparto ? Array.isArray(changedEntry.reparto) ? changedEntry.reparto.map(e => new ObjectID(e)) : [new ObjectID(changedEntry.reparto)] : [];
        if (doc) {
            changedEntry._id = new ObjectID(doc._id);
            changedEntry = await Collection.findOneAndUpdate({ _id: changedEntry._id }, { $set: changedEntry },
                { upsert: true, new: true, setDefaultsOnInsert: true, fields: '-__v' }).exec();
        } else {
            changedEntry = await Collection.create(changedEntry);
        }
        changedEntry[attrname] = '/uploads/' + changedEntry._id;

        await saveFile(req.file, changedEntry, Collection);
        console.log(doc);


        res.status(200).send({ message: "Ok", doc });

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Error making post ' + error });
    }

});


router.post('/:_id/like', likedOne);
router.put('/:_id', update);

module.exports = router;

