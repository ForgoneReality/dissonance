json.extract! server, :id, :name, :owner_id, :server_link
json.num_members @num_members
json.online_members @online_members
if server.icon.attached?
  json.image_url url_for(server.icon)
else
  json.image_url ""
end