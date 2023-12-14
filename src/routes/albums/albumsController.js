const connexion = require('../../../db-config');
const db = connexion.promise();

const getAll = async (req, res) => {
  try {
    const albums = await db.query('SELECT * from albums');
    console.log(albums);
    res.status(200).json(albums[0]);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const getOne = async (req, res) => {
  try {
    const albums = await db.query('SELECT * from albums WHERE id = ?', [
      req.params.id,
    ]);
    if (albums[0][0]) {
      res.status(200).json(albums[0][0]);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const getTracksByAlbumId = async (req, res) => {
  try {
    const albums = await db.query('SELECT * FROM track where id_album = ?', [
      req.params.id,
    ]);
    res.status(200).json(albums[0]);
  } catch (error) {
    res.sendStatus(500);
  }
};

const postAlbums = async (req, res) => {
  try {
    const album = await db.query(
      'INSERT INTO albums(title, genre, picture, artist) VALUES (?, ?, ?, ?)',
      [req.body.title, req.body.genrel, req.body.picture, req.body.artist]
    );
    res.status(201).json({ ...req.body, id: album[0].insertId });
  } catch (error) {
    res.sendStatus(500);
  }
};

const updateAlbums = async (req, res) => {
  try {
    await db.query('UPDATE albums set ? WHERE id = ?', [
      req.body,
      req.params.id,
    ]);
    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(500);
  }
};

const deleteAlbums = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const deleteById = await db.query('DELETE from albums WHERE id = ?', [id]);
    res.status(204).json(deleteById[0][0]);
  } catch (error) {
    console.error(error);
    res.sendStatus(404);
  }
};

module.exports = {
  getAll,
  getOne,
  getTracksByAlbumId,
  postAlbums,
  updateAlbums,
  deleteAlbums,
};
