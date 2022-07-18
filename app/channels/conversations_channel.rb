# app/channels/rooms_channel.rb

class ConversationsChannel < ApplicationCable::Channel
    def subscribed
      @location = Conversation.find_by(id: params[:id])
      stream_for @location
    end
    
end