class Api::SessionsController < ApplicationController

    def create
        @user = User.find_by_credentials(params[:user][:email], params[:user][:password])
        
        if(@user && @user.id != 6)
            login!(@user)
            @user.last_login = Time.current
            # redirect_to api_users_url(@user)
            render json: @user, status: 200
        else #No status!!
            render json: ["Invalid username/password combination"], status: 401

            # render :new
        end
    end

    def demo
        demo1 = User.first
        demo2 = User.second
        demo3 = User.third
        demo4 = User.fourth
        demo5 = User.fifth
        demo_users = [demo1, demo2, demo3, demo4, demo5]
        debugger
        @user = demo_users.min_by {|ele| ele.last_login}
        # @user = User.where("id < 6").order("last_login ASC").first

        if(@user)
            login!(@user)
            @user.last_login = Time.current
            # redirect_to api_users_url(@user)
            render json: @user, status: 200
        else #No status!!
            render json: ["Something went wrong..."], status: 401
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
