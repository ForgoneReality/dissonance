@user.friends.each do |friend|
    json.set! friend.id do
        json.extract! friend, :id, :username, :status, :bio, :fourdigit_id
        json.pfp_url url_for(friend.profile_picture)
    end
end