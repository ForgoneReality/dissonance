# json.extract! @serverjoin, :id, :user_id, :server_id 
#for the moment, don't really need above information? can comment in later if needed
json.extract! @server.channels.first, :id

