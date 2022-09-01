# json.currUser do
#   json.extract! @user, :id, :username, :status
# end

# json.conversations do
#   @user.conversations.each do |conversation|
#     json.set! conversation.id do
#       json.id conversation.id
#       if conversation.user2_id == @user.id
#         json.otherUser do
#           json.extract! conversation.user1, :id, :username, :status
#         end
#       else
#         json.otherUser do
#           json.extract! conversation.user2, :id, :username, :status
#         end
#       end
#     end
#   end
# end

@user.conversations.each do |conversation|
  json.set! conversation.id do
    json.id conversation.id
    json.last_updated conversation.last_updated
    if conversation.user2_id == @user.id
      json.unread conversation.unread2
      json.otherUser do
        json.extract! conversation.user1, :id, :username, :status
        json.pfp_url url_for(conversation.user1.profile_picture)
      end
    else
      json.unread conversation.unread1
      json.otherUser do
        json.extract! conversation.user2, :id, :username, :status
        json.pfp_url url_for(conversation.user2.profile_picture)
      end
    end
  end
end