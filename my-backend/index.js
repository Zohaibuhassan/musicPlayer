const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Upload route
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).send("No file uploaded.");
  res.json({ name: req.file.filename, url: `http://localhost:${PORT}/uploads/${req.file.filename}` });
});

// Get list of uploaded songs
app.get('/songs', (req, res) => {
  fs.readdir('uploads/', (err, files) => {
    if (err) return res.status(500).json({ error: "Failed to read directory." });
    const songs = files.map(file => ({
      name: file,
      url: `http://localhost:${PORT}/uploads/${file}`
    }));
    res.json(songs);
  });
});

// Delete song
app.delete('/delete/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'uploads', req.params.filename);
  fs.unlink(filePath, (err) => {
    if (err) return res.status(500).send("File not found or cannot delete.");
    res.send("File deleted.");
  });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));