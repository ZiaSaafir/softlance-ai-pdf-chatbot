from .models import Conversation, Message
from .ai_service import generate_ai_response


def create_chat_message(message, conversation_id=None):

    # Get existing conversation or create a new one
    if conversation_id:

        try:
            conversation = Conversation.objects.get(
                id=conversation_id
            )

        except Conversation.DoesNotExist:
            return None, "Conversation not found."

    else:
        conversation = Conversation.objects.create(
            title=message[:50]
        )

    # Save user message
    user_message = Message.objects.create(
        conversation=conversation,
        role="user",
        content=message
    )

    # Get conversation history
    conversation_messages = Message.objects.filter(
        conversation=conversation
    ).order_by("created_at")

    messages=[
        {
            "role":"system",
            "content":(
                "You are a helpful ai assitant"
                "Give clear , accurate and concise answers"
            ),
        }
    ]

    # Convert database messages to AI messages
    messages += [
        {
            "role": msg.role,
            "content": msg.content,
        }
        for msg in conversation_messages
    ]

    # Generate AI response
    assistant_response = generate_ai_response(messages)

    # Save AI response
    assistant_message = Message.objects.create(
        conversation=conversation,
        role="assistant",
        content=assistant_response
    )

    return {
        "conversation": conversation,
        "user_message": user_message,
        "assistant_message": assistant_message,
    }, None