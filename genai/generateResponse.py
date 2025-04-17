from openai import OpenAI

#meta-llama/llama-3.2-1b-instruct:free
#              ^^ Free but terrible LLM model - Definitely use for testing however

# openai/gpt-4.1-nano
#          ^^ Not free, but affordable and much better preformance

MODEL = "meta-llama/llama-3.2-1b-instruct:free"
PROMPT_CONTEXT = "This is my comment on reddit, convince me that Isaac is the best in 100 words or less"


client = OpenAI(
base_url="https://openrouter.ai/api/v1",
api_key= open("genai/cert" , "r").read().rstrip('\n'),
)

def get_response(prompt):
   
    print("......")
    
    completion = client.chat.completions.create(
        model = MODEL,
        messages=[{"role": "user","content": f"\"{prompt}\": {PROMPT_CONTEXT}"}]
    )
    print(f"\u001b[32mRESPONSE: \"{completion.choices[0].message.content}\"\u001b[0m")
    print("\n\n") # temporary spacing for demo
    return False
