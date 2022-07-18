class Api::SessionsController < ApplicationController

    def create
        @user = User.find_by_credentials(params[:user][:email], params[:user][:password])
        
        if(@user)
            login!(@user)
            # redirect_to api_users_url(@user)
            render json: @user
        else #No status!!
            render json: ["Invalid username/password combination"], status: 401

            # render :new
        end
    end

    def destroy
        if(logged_in?)
            logout!
            render json: {} #!!!!!!!!!!!!!!!!!!!!!!!!!!!
        else
            render json: ["Nobody signed in"], status: 404
        end
    end

end
