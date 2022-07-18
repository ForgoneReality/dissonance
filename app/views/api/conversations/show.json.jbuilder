# json.conversation do
#   json.set! @conversation.id do 
#     json.partial! 'api/conversations/convos', conversation: @conversation
#     json.user1_name @conversation.user1.username
#     json.user2_name @conversation.user2.username
#   end
# end

json.users do
  json.set! @conversation.user1.id do
    json.extract! @conversation.user1, :id, :username, :fourdigit_id, :bio, :status  #maybe more if clicked on
  end
  
  json.set! @conversation.user2.id do
    json.extract! @conversation.user2, :id, :username, :fourdigit_id, :bio, :status
  end
end

@conversation.messages.each do |message|
  json.messages do
    json.set! message.id do
      json.partial! 'api/messages/message', message: message
      json.author_name message.author.username
      json.pfp_url url_for(message.author.profile_picture)
      if message.image.attached?
        json.image_url url_for(message.image)
      else
        json.image_url ""
      end
    end
  end
end