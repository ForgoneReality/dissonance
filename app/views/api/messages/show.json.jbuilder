json.message do
  json.partial! 'api/messages/message', message: message
  json.author_name message.author.username
  json.pfp_url url_for(message.author.profile_picture)
  if message.image.attached?
    json.image_url url_for(message.image)
  else
    json.image_url ""
  end
end
  
# json.user do 
#     # json.partial! 'api/users/user', user: message.author
#     json.username message.author.username
# end

#Not yet implemented!! Might not work