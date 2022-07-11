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
    if conversation.user2_id == @user.id
      json.otherUser do
        json.extract! conversation.user1, :id, :username, :status
      end
    else
      json.otherUser do
        json.extract! conversation.user2, :id, :username, :status
      end
    end
  end
end