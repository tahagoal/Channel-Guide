This project was created for Pixelogic Media interviewing process

## Assumptions
- There is no unrecord Show/Program, I applied the Record only, and there is no way back.
- Loading all the shows that started or that will start on the future, there is no access in frontend for the previous shows.
- Program informations is implemented on a modal pop-up, not an individual screen.
- The progress bar of the show is not live, you have to refresh to see the progress.
- The non-known end times for shows are only adapted from the backend using this api `/schedule/{schedule_id}/shiftMinutes/{minutes_to_be_added}`
- The recording scheduled task in the backend runs every 10 seconds, checking if there is any schedule recording show or not, and then start or finish the recording.
- Parsing Show information for only these types (Match, Tennis, Series or Movie).
- The home page has only the channels with the live shows, any channel with non-live shows right now will not be displayed.
- To access channel details page for any channel, please click on channel name on the home page or type `http://localhost:3000/channel/{id}` 
- It's recommend to test the system before 10/12/2019 to get live and reliable data.


## Migration 
- Please create a database called channel-guide first
- Please create a schema called public
- Run the application, it will create the tables and insert the records, the seeders exists here `TVGuide/ScheduledTasks`
- If the system find just one channel it will not seed any tables, so you can remove the schema and run the system again.


## Database Design
- You can find the database diagram on db diagram here:
https://dbdiagram.io/d/5de130cfedf08a25543e8639
- Please restore the channel-guide.sql database in pgadmin

## Bcakend
Using Java springboot framework (Intellij IDE).
- You have to run it on port `8080`

## FrontEnd
Using ReactJS Framework (VSCode).
- Command `npm install` for getting node modules packages
- Command `npm start` to serve the React project on `http://localhost:3000`
- You have to serve it on port `3000`

## Adobe XD project
- Here is the link of Adobe XD project, Interactive mockup design for the frontend:
https://xd.adobe.com/view/6bb0a57b-0348-4be1-4bc0-5b47ede58741-1d81/
