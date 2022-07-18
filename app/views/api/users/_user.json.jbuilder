json.extract! user, :id, :email, :username, :fourdigit_id, :status, :bio
json.pfp_url url_for(user.profile_picture)