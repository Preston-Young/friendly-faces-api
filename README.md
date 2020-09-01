# Friendly Faces (Back End)

This is the REST API I created for my first full stack web app: Friendly Faces.

Check out the front end code: <a href="https://github.com/Preston-Young/friendly-faces" target="_blank">https://github.com/Preston-Young/friendly-faces</a>

Check out the final product: <a href="https://friendlyfaces.herokuapp.com/" target="_blank">https://friendlyfaces.herokuapp.com/</a> <br />
(Note: When visiting the website for the first time, it will take a while to load, but every visit after will be much quicker because Chrome will cache the dependencies)

## Summary
This is the first full stack web I've built on my journey to teaching myself web development. Friendly Faces utilizes the Clarifai API to allow registered users to detect faces in photos that registered users upload. Creating this projects helped to solidify my understanding of how front end technologies interact with back end servers and databases. For the back end, I utilized Express.js to handle http requests to the server, and catch any errors that occur along the way. I created a PostgreSQL database on Heroku and connected it to this server, where I could store user login inforation, including their email, number of entries, and hashed password. In order to protect my Clarifai API key, I created an environment variable, which is safely stored in my app on Heroku.

## Things I want to improve on
* Add more entries to my user database to expand features
* Utilize the unused profile route I wrote the code for
