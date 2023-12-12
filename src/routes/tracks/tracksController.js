const connexion = require('../../../db-config');
const db = connexion.promise();

const getOne = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const tracksById = await db.query('SELECT * from track WHERE id = ?', [id]);
    res.status(200).json(tracksById[0][0]);
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
  const { title, youtube_url, id_album } = req.body;

  db.query('INSERT INTO track(title, youtube_url, id_album) VALUES (?, ?, ?)', [
    title,
    youtube_url,
    id_album,
  ])
    .then(([result]) => {
      res.status(201).send({ id: result.insertId });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const updateTracks = async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, youtube_url, id_album } = req.body;
  try {
    const updateById = await db.query(
      'update track SET title = ?, youtube_url = ?, id_album = ? WHERE id = ?',
      [title, youtube_url, id_album, id]
    );
    res.status(200).json(updateById[0]);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const deleteTracks = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const deleteById = await db.query('DELETE from track WHERE id = ?', [id]);
    res.status(200).json(deleteById[0][0]);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

module.exports = { getOne, getAll, postTracks, updateTracks, deleteTracks };
