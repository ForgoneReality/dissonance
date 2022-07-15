json.messages do
    @channel.messages.each do |message|
      json.set! message.id do
        json.partial! 'api/messages/message', message: message
        json.author_name message.author.username
      end
    end
end

json.channel do
  json.extract! @channel, :id, :name, :description, :server_id
end

#roles/users stuff here