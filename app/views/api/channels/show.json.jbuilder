json.messages do
    @channel.messages.each do |message|
      json.set! message.id do
        #BELOW IS AN OPTIMIZATION ISSUE!!!! NEEDING TO FIND THE SERVERJOIN FOR A NICKNAME EVERY SINGLE TIME CAN BE IMPROVED
        #but refactoring is needed and I CBA
        serverjoiner = ServerJoin.find_by({server_id: @channel.server_id, user_id: message.author_id})
        if(!serverjoiner.nil?)
          json.nickname serverjoiner.nickname
        else
          json.nickname ""
        end

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

json.channel do
  json.extract! @channel, :id, :name, :description, :server_id
end

#roles/users stuff here