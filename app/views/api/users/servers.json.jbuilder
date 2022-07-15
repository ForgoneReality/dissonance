@user.servers.each do |server|
    json.set! server.id do
        json.extract! server, :id, :name #image, #last_updated, #notifications
    end
end