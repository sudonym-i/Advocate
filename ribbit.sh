printf "\n Ribbit: a reddit bot - enter mode \n\n"
printf "(1) reply to comments \n"
printf "(2) post to subreddits \n\n" 
read -p "--> " mode


if [ "$mode" = "1" ]; then

    printf "\ncreating virtual environment & resolving dependencies \n\n"
    python3 -m venv .venv
    source .venv/bin/activate
    pip install openai praw
    printf "\n\n ---- starting up bot ---- \n\n"
    cd src
    python3 main.py <<< "1"

elif [ "$mode" = "2" ]; then

    printf "\ncreating virtual environment & resolving dependencies \n\n"
    python3 -m venv .venv
    source .venv/bin/activate
    pip install openai praw
    printf "\n\n ---- starting up bot ---- \n\n"
    cd src
    python3 main.py <<< "2"

else
    printf "\n\n ---- no mode selected ---- \n\n"
    exit 1
fi