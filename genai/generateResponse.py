from openai import OpenAI

client = OpenAI(
base_url="https://openrouter.ai/api/v1",
api_key= open("genai/cert" , "r").read().rstrip('\n'),
)

def get_response(prompt):
   
    print("\n......\n")
    
    completion = client.chat.completions.create(
        model="meta-llama/llama-3.2-1b-instruct:free",
        messages=[{"role": "user","content": f"{prompt}"}]
    )
    print(f"\u001b[32mRESPONSE: \"{completion.choices[0].message.content}\"\u001b[0m")
    
    return False
