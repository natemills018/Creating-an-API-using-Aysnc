const express = require('express');
const chirpStore = require('../../chirpstore');

const router = express.Router();

router.get('/:id', async (req, res) => {
    let id = req.params.id
    try {
        const chirps = await chirpStore.GetChirps();
        const singleChirp = await chirpStore.GetChirp(id);

        if (singleChirp) {
            res.json(singleChirp)
        } else {
            res.send(chirps)
        };
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error })
    }
})

router.post('/', async (req, res) => {
    try {
        await chirpStore.CreateChirp(req.body)
        console.log(req.body)
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error })
    }
})

router.put('/:id', async (req, res) => {
    let id = req.params.id
    try {
        await chirpStore.UpdateChirp(id, req.body)
        res.json({ message: "Updated Successfully"})
    } catch(error) {
        console.log(error);
        res.status(500).json({ message: error})
    }
})

router.delete('/:id', async(req, res) => {
    let id = req.params.id
    try {
        await chirpStore.DeleteChirp(id)
        res.json({ message: "Deleted Successfully"})
    } catch(error) {
        console.log(error)
        res.status(500).json({ message: error})
    }
})

module.exports = router