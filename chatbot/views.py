from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Conversation
from .serializers import (
    ChatSerializer,
    ConversationSerializer,
    ConversationDetailSerializer,
)
from .services import create_chat_message

class ChatView(APIView):

    def post(self, request):

        serializer = ChatSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

        message = serializer.validated_data["message"]

        conversation_id = serializer.validated_data.get(
            "conversation_id"
        )

        result, error = create_chat_message(
            message=message,
            conversation_id=conversation_id
        )

        if error:
            return Response(
                {"error": error},
                status=status.HTTP_404_NOT_FOUND
            )

        return Response(
            {
                "conversation_id": result["conversation"].id,
                "user_message": result["user_message"].content,
                "assistant_response": (
                    result["assistant_message"].content
                ),
            }
        )

class ConversationListView(APIView):

    def get(self, request):

        conversations = Conversation.objects.all().order_by(
            "-updated_at"
        )

        serializer = ConversationSerializer(
            conversations,
            many=True
        )

        return Response(serializer.data)


class ConversationDetailView(APIView):

    def get(self, request, pk):

        try:
            conversation = Conversation.objects.get(
                id=pk
            )

        except Conversation.DoesNotExist:
            return Response(
                {
                    "error": "Conversation not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = ConversationDetailSerializer(
            conversation
        )

        return Response(serializer.data)

class ConversationDetailView(APIView):

    def get(self, request, pk):

        try:
            conversation = Conversation.objects.get(
                id=pk
            )

        except Conversation.DoesNotExist:
            return Response(
                {
                    "error": "Conversation not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = ConversationDetailSerializer(
            conversation
        )

        return Response(serializer.data)

    def delete(self, request, pk):

        try:
            conversation = Conversation.objects.get(
                id=pk
            )

        except Conversation.DoesNotExist:
            return Response(
                {
                    "error": "Conversation not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        conversation.delete()

        return Response(
            {
                "message": "Conversation deleted successfully."
            },
            status=status.HTTP_204_NO_CONTENT
        )
    