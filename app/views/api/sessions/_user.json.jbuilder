json.extract! @user, :id, :email, :username, :password_digest, :fourdigit_id, :status, :bio
json.pfp_url url_for(@user.profile_picture)