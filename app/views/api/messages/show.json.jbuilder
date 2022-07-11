json.message do
    json.partial! 'api/messages/message', message: message
  end
  
json.user do 
    # json.partial! 'api/users/user', user: message.author
    json.username message.author.username
end

#Not yet implemented!! Might not work