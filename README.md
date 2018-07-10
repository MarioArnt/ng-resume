# ng-résumé

Here's the source code of my (quickly-made) online interactive résumé available at http://mario.arnautou.fr/
The website uses the front-end framework AngularJS and the back-end framework expressJS.
There is no databases such as MongoDB but the data are stored in static JSON files loaded
via an AJAX request from the front-end.

## Installation

Clone the repo on your server and fill the data JSON with your infos.
Then install the dependencies and build the dist files by typing the following command.

````
npm install -g bower grunt
gem install sass
gem install compass
npm install && bower install
grunt build
````

The project is installed locally. You start the app using ``npm start`` and see the result at http://localhost:8081/

## Deployment on Heroku

Fork the repo and create an app on heroku.

``heroku create your-app-name``



## Deployment on your own server

If you use nginx and passenger use the following configuration.

````
server {
    listen 80;
    server_name subdomain.example.com;

    # Tell Nginx and Passenger where your app's 'public' directory is
    root path/to/resume/dist;

    # Turn on Passenger
    passenger_enabled on;
    # Tell Passenger that your app is a Node.js app
    passenger_app_type node;
    passenger_startup_file server.js;
}
````
And restart nginx ``sudo service nginx restart``

Rename the config.example.json to config.json and fill it with relevant informations.

Enjoy
