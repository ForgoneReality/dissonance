@user.servers.each do |server|
    json.set! server.id do
        json.extract! server, :id, :name #image, #last_updated, #notifications
        if server.icon.attached?
            json.image_url url_for(server.icon)
        else
            json.image_url ""
        end
    end
end