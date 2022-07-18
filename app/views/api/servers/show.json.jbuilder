json.server do
    json.extract! @server, :id, :name
end

json.users do
    @server.users.each do |user|
        json.set! user.id do
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