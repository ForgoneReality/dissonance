json.extract! server, :id, :name, :owner_id
if server.icon.attached?
  json.image_url url_for(server.icon)
else
  json.image_url ""
end