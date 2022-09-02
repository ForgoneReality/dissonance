@messages.each_with_index do |message, index|
  if((!@channel || message.location.name == @channel) && (!@has_image || message.image.attached?) && (!@fourdigit_id || (message.author.username == @username && message.author.fourdigit_id == @fourdigit_id)))
    json.set! index do
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