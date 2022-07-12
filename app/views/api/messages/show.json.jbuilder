json.message do
    json.partial! 'api/messages/message', message: message
    json.author_name message.author.username
  end
  
# json.user do 
#     # json.partial! 'api/users/user', user: message.author
#     json.username message.author.username
# end

#Not yet implemented!! Might not work