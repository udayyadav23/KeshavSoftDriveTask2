// Simple Express server with Handlebars support
const express = require('express');
const exphbs  = require('express-handlebars');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set Handlebars as the view engine
app.engine('hbs', exphbs.engine({
  extname: 'hbs',
  defaultLayout: false,
  partialsDir: [
    path.join(__dirname, 'src/templates/AboutTemplates'),
    path.join(__dirname, 'src/templates/ContactTemplates'),
    path.join(__dirname, 'src/templates/IndexTemplates'),
    path.join(__dirname, 'src/templates')
  ]
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src/templates'));

// Serve static assets
app.use('/assets', express.static(path.join(__dirname, 'src/assets')));

// Routes
app.get('/', (req, res) => {
  res.render('index');
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/contact', (req, res) => {
  res.render('contact');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
const hbs = exphbs.create({
  extname: 'hbs',
  defaultLayout: false,
  partialsDir: [
    path.join(__dirname, 'src/templates/AboutTemplates'),
    path.join(__dirname, 'src/templates/ContactTemplates'),
    path.join(__dirname, 'src/templates/IndexTemplates'),
    path.join(__dirname, 'src/templates')
  ],
  helpers: {
    eq: (a, b) => a === b
  }
});

app.engine('hbs', hbs.engine);