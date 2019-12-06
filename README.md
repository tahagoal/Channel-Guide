This project was created for interviewing process

## Assumptions
- There is no unrecord Show/Program, I applied the Record only, and there is no way back.
- Loading all the shows that started or that will start on the future, there is no access to frontend for the previous shows.
- Program informations is implemented on a modal pop-up, not an individual screen.
- The progress bar of the show is not live, you have to refresh to see the progress.
- The non-known end times for shows are only adapted from the backend using this api `/schedule/{schedule_id}/shiftMinutes/{minutes_to_be_added}`
- The recording scheduled task in the backend runs every 10 seconds, checking if there is any schedule recording show or not, and then start or finish the recording.
- Parsing Show information for only (Match. Tennis, Series, Movie).


## Database Design
- You can find the database diagram on db diagram here:
https://dbdiagram.io/d/5de130cfedf08a25543e8639

## Bcakend
Using Java springboot framework (Intellij IDE).

## FrontEnd
Using ReactJS Framework (VSCode).

## Adobe XD project
- Here is the link of Adobe XD project, Interactive mockup design for the frontend:
https://xd.adobe.com/view/6bb0a57b-0348-4be1-4bc0-5b47ede58741-1d81/ 
