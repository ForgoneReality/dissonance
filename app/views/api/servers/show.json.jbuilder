json.server do
    json.extract! @server, :id, :name, :owner_id, :server_link
    if @server.icon.attached?
        json.image_url url_for(@server.icon)
    else
        json.image_url ""
    end
end

json.users do
    @server.users.each do |user|
        json.set! user.id do
            serverjoiner = ServerJoin.find_by({server_id: @server.id, user_id: user.id})
            if(!serverjoiner.nil?)
              json.nickname serverjoiner.nickname
            else
              json.nickname ""
            end
            json.partial! 'api/users/user', user: user
        end
    end
end

json.channels do
    @server.channels.each do |channel|
        json.set! channel.id do
            json.extract! channel, :id, :name, :description, :server_id #trash code to repeat server_id over and over
        end
    end
end