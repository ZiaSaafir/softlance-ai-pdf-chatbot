import os

from openai import OpenAI


client = OpenAI(
    base_url="https://router.huggingface.co/v1",
    api_key=os.getenv("HF_TOKEN"),
)


def generate_ai_response(messages):
    response = client.chat.completions.create(
        model="openai/gpt-oss-120b:fastest",
        messages=messages,
    )

    return response.choices[0].message.content