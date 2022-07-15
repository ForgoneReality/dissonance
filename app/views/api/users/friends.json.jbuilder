@user.friends.each do |friend|
    json.set! friend.id do
        json.extract! friend, :id, :username, :status, :bio
    end
end