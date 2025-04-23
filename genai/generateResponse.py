from openai import OpenAI

#meta-llama/llama-3.2-1b-instruct:free
#              ^^ Free but terrible LLM model - Definitely use for testing however

# openai/gpt-4.1-nano
#          ^^ Not free, but affordable and much better preformance

MODEL = "meta-llama/llama-3.2-1b-instruct:free"

client = OpenAI(
base_url="https://openrouter.ai/api/v1",
api_key= open("auth-ai" , "r").read().rstrip('\n'),
)

def get_response(prompt):
   
    print("......")
    
    completion = client.chat.completions.create(
        model = MODEL,
        messages=[{"role": "user","content": prompt}]
    )
    print(f"\u001b[32mRESPONSE: \"{completion.choices[0].message.content}\"\u001b[0m")
    print("\n\n") # temporary spacing for demo
    return False
