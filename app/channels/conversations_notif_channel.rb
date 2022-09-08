# app/channels/rooms_channel.rb

class ConversationsNotifChannel < ApplicationCable::Channel
    def subscribed
      stream_for current_user
    end
end