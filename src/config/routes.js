import app from 'app';

app.route('/', 'Home', 'home');
app.route('/about', 'About', 'about');
app.route('/about', 'About');
app.route('/login', 'User/Login', 'login');
app.route('/logout', 'User/Logout', 'logout');
app.route('/profile', 'User/Profile', 'profile').guard();
app.route.redirect('/about-us', '/about');
