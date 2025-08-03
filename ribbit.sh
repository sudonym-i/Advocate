printf "\n Ribbit: a reddit bot - enter mode \n\n"
printf "(1) reply to comments \n"
printf "(2) post to subreddits \n\n" 
read -p "--> " mode


# Function to find and activate venv
activate_venv() {
    # Search for activate script in common locations
    local activate_script=""
    
    # Check common venv directory names
    for venv_dir in venv .venv env .env virtualenv; do
        if [[ -f "$venv_dir/bin/activate" ]]; then
            activate_script="$venv_dir/bin/activate"
            break
        fi
    done
    
    # If not found in current dir, search upwards
    if [[ -z "$activate_script" ]]; then
        local current_dir="$PWD"
        while [[ "$current_dir" != "/" ]]; do
            for venv_dir in venv .venv env .env virtualenv; do
                if [[ -f "$current_dir/$venv_dir/bin/activate" ]]; then
                    activate_script="$current_dir/$venv_dir/bin/activate"
                    break 2
                fi
            done
            current_dir=$(dirname "$current_dir")
        done
    fi
    
    if [[ -n "$activate_script" ]]; then
        echo "Found virtual environment: $activate_script"
        chmod -R +x "$(dirname "$activate_script")/.."
        source "$activate_script"
        return 0
    else
        echo "No virtual environment found"
        return 1
    fi
}



if [ "$mode" = "1" ]; then

    printf "\ncreating virtual environment & resolving dependencies \n\n"
    python3 -m venv .venv
    activate_venv
    pip install openai
    pip install praw
    printf "\n\n ---- starting up bot ---- \n\n"
    cd src
    python3 main.py <<< "1"

elif [ "$mode" = "2" ]; then

    printf "\ncreating virtual environment & resolving dependencies \n\n"
    python3 -m venv .venv
    activate_venv
    pip install openai
    pip install praw
    printf "\n\n ---- starting up bot ---- \n\n"
    cd src
    python3 main.py <<< "2"

else
    printf "\n\n ---- no mode selected ---- \n\n"
    exit 1
fi