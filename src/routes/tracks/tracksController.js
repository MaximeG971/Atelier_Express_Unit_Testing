const connexion = require('../../../db-config');
const db = connexion.promise();

const getOne = async (req, res) => {
  try {
    const track = await db.query('SELECT * from track WHERE id = ?', [
      req.params.id,
    ]);
    if (track[0][0]) {
      res.status(200).json(track[0][0]);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const getAll = async (req, res) => {
  try {
    const tracks = await db.query('SELECT * from track');
    console.log(tracks);
    res.status(200).json(tracks[0]);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const postTracks = async (req, res) => {
  try {
    const track = await db.query(
      'INSERT INTO track(title, youtube_url, id_album) VALUES (?, ?, ?)',
      [req.body.title, req.body.youtube_url, req.body.id_album]
    );
    res.status(201).json({ ...req.body, id: track[0].insertId });
  } catch (error) {
    res.sendStatus(500);
  }
};

const updateTracks = async (req, res) => {
  try {
    await db.query('UPDATE track set ? WHERE id = ?', [
      req.body,
      req.params.id,
    ]);
    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(500);
  }
};

const deleteTracks = (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM track WHERE id = ?', [id])
    .then((track) => {
      if (track[0][0].id) {
        db.query('DELETE FROM track WHERE id = ?', [id])
          .then((result) => res.status(204).send(result[0]))
          .catch((err) => {
            res.status(404).send(err);
          });
      } else {
        res.status(404).send('Tracks not found');
      }
    })
    .catch((err) => res.status(404).send(err));
};

module.exports = { getOne, getAll, postTracks, updateTracks, deleteTracks };
