
#Treasure Hunt


This repository contains the source code to the website and server used as the contest portal and leaderboard in order to make the hunt more interactive and engaging.

## Contest Structure
1) A clue will be provided at each level.
2) Each level in the treasure hunt consists of **2 parts**.
3) Once you solve clue the score will be updated.
4) Hunt is sucesful only if all the clues are answered

Features Check List:
User Registration and Authentication
Clues 
User Progress
Leaderboard(can only be accessed by admin)

Admin Credentials:
Userid:admin123
password:admin123
email:admin@gmail.com

This hunt tests various soft skills of User like that of Creative Thinking,Critical Thinking,Aptitude,General Knowledge and Problem Solving


## Installation

### Frontend: 

1. Add your `.env` file to the root directory
    >You can refer `sample.env` for the same
    
2. Install the required dependencies using
	  ```bash
    $ npm i --force
    ```
	> The `--force` flag is used as one of the dependency would fail to install without it.
	
4. In the project root directory, you can run:

    ```bash
    $ npm start
    ```

    >Runs the website in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Backend: 
1. Launch another terminal and switch to the server directory, by running:

     ```bash
     $ cd server
     ```
     
2. Add your `.env` file to the server directory
    >You can refer `server/sample.env` for the same

3. Install the required dependencies using
	  ```bash
    $ npm i
    ```

4. In the server directory, you can run:

     ```bash
     $ npm start
     ```
     or
     ```bash
     $ nodemon .
     ```
    >Runs the server in the development mode at [http://localhost:5000](http://localhost:5000).


