
----
SETUP - LINUX
----

This project will require you to make "auth-reddit" and "auth-ai" files in the /src directory. These will include your api keys login information. 


auth-ai (at least if you use openrouter) only requires one api key to be pasted into it.
                        --**one line**--


auth-reddit requires (in order): client_id, client_secret, user_agent, username, password
               --**seperaate by putting each on a seperate line**--


Dependencies: python3--full


dependencies and virtual environment is handled automatically, but if you run into probems, try installing "praw" and "openai" libraries

I used openRouter for LLM api keys in this project personally, which gave me the ability to switch between free (but terrible) models, and paid ones. I personally recommend doing this.


----
USE
----

In the root directory, edit "config.json". You can specify what context you would like to feed to the AI model before responding to the reddit posts ("context"), what keywords to look for in posts you want to reply to ("positive-keyphrases"), how many of these keywords ought to be present ("number-of-positives"), and a couple more parameters. 
This is where you sepcify what you want the bot to do. Once you have this configured, execute "ribbit.sh" 

**./ribbit.sh**

(located in root directory) to start the bot, and follow the prompts.

will likely need to run **chmod +x ribbit.sh** to grant execute permission

----
WINDOWS
----

Although windows is less supported, libraries can be managed manually, and the script can be run from /src directory using **python3 main.py <<< 1** for replying, and **python3 main.py <<< 2** for post mode

----
SAMPLE
----
<img width="1920" height="474" alt="Screenshot from 2025-07-27 12-33-35" src="https://github.com/user-attachments/assets/9a157ece-f4ab-49a2-ab20-e60698acf6a2" />
