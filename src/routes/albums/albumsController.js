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
  const id = parseInt(req.params.id);
  try {
    const albumsById = await db.query('SELECT * from albums WHERE id = ?', [
      id,
    ]);
    res.status(200).json(albumsById[0][0]);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const getTracksByAlbumId = (req, res) => {
  res.status(200).send('Get Albums route is OK');
};

const postAlbums = (req, res) => {
  const { title, genre, picture, artist } = req.body;

  db.query(
    'INSERT INTO albums(title, genre, picture, artist) VALUES (?, ?, ?, ?)',
    [title, genre, picture, artist]
  )
    .then(([result]) => {
      res.status(201).send({ id: result.insertId });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const updateAlbums = (req, res) => {
  res.status(200).send('Update route is OK');
};

const deleteAlbums = (req, res) => {
  res.status(200).send('Delete route is Ok');
};

module.exports = {
  getAll,
  getOne,
  getTracksByAlbumId,
  postAlbums,
  updateAlbums,
  deleteAlbums,
};
