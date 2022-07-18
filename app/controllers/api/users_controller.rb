
class Api::UsersController < ApplicationController

    def create 
        # my_params = user_params;
        # my_params[:fourdigit_id] = generate_fourdigit();
        # while(user_params[:fourdigit_id])
            
        # end

        @user = User.new(user_params)

        if(@user.save)
            login!(@user)
            # redirect_to api_users_url(@user)
            render json: @user
        else
            #Note to self: no status!!
            # flash.now[:errors] = @users.error.full_messages
            # render :new
            render json: @user.errors.full_messages, status: 422
            # render json: ["Something went wrong"], status: 401
        end
    end

    def conversations
        @user = User.find(params[:id])

        if @user
            render :conversations, locals: { user: @user }
        else
            render json: ["User does not exist"], status: 404
        end
    end

    def friends
        @user = User.find(params[:id])

        if @user
            render :friends, locals: { user: @user }
        else
            render json: ["User does not exist"], status: 404
        end
    end

    def servers
        @user = User.find(params[:id])

        if @user
            render :servers, locals: { user: @user }
        else
            render json: ["User does not exist"], status: 404
        end
    end

    def search
        @user = User.find_by(username: params[:username], fourdigit_id: params[:fourdigit_id])

        if @user
            # render partial: :user, locals: {user: @user}
            render json: @user.as_json(only: [:id, :username, :fourdigit_id, :status, :bio]), status: 200
        else
            render json: ["User does not exist"], status: 404
        end
    end

    private
    def user_params
        params.require(:user).permit(:email, :password, :username, :fourdigit_id)
    end

    # def generate_fourdigit

    # end

end
