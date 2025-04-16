from openai import OpenAI

client = OpenAI(
  api_key = open("openai/cert", "r").read().rstrip('\n')
)

completion = client.chat.completions.create(
  model="gpt-4o-mini",
  messages=[
    {"role": "user", "content": "write a haiku about ai"}
  ]
)

print(completion.choices[0].message);

