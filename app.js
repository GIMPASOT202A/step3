const express = require('express');
const morgan = require('morgan');
const path = require('path');
const debug = require('debug')('app');

const app = express();
const port = process.env.PORT || 3000;
const bookRouter = express.Router();


app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/boostrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/boostrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist/')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

const books = [
  {
    title: 'Sample book title here',
    genre: 'Historical fiction',
    author: 'Kwame Oppong',
    read: false,
  },
  {
    title: 'Sample book title here',
    genre: 'Historical fiction',
    author: 'Kwame Oppong',
    read: false,
  },
  {
    title: 'Sample book title here',
    genre: 'Historical fiction',
    author: 'Kwame Oppong',
    read: false,
  },
  {
    title: 'Sample book title here',
    genre: 'Historical fiction',
    author: 'Kwame Oppong',
    read: false,
  },
];
bookRouter.route('/')
  .get((req, res) => {
    res.render(
      'books',
      {
        nav: [{ link: '/books', title: 'Books' },
          { link: '/author', title: 'Authors' }],
        title: 'Library',
        books,
      },
    );
  });
bookRouter.route('/single')
  .get((req, res) => {
    res.send('Single Hello books');
  });
app.use('/books', bookRouter);
app.get('/', (req, res) => {
  res.render(
    'index',
    {
      nav: [{ link: '/books', title: 'Books' },
        { link: '/author', title: 'Authors' }],
      title: 'Library',
    },
  );
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  debug(`Listeing on port ${port}`);
});
