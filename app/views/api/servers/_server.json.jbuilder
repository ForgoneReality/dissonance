json.extract! server, :id, :name, :owner_id, :server_link
if server.icon.attached?
  json.image_url url_for(server.icon)
else
  json.image_url ""
end
json.firstChannel server.channels[0]