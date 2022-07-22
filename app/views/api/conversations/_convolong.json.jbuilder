
json.id conversation.id
json.last_updated conversation.last_updated
if conversation.user2_id == userid
    json.otherUser do
    json.extract! conversation.user1, :id, :username, :status
    json.pfp_url url_for(conversation.user1.profile_picture)
    end
else
    json.otherUser do
    json.extract! conversation.user2, :id, :username, :status
    json.pfp_url url_for(conversation.user2.profile_picture)
    end
end
