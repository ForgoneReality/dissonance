
class Api::UsersController < ApplicationController

    def create 
        # my_params = user_params;
        # my_params[:fourdigit_id] = generate_fourdigit();
        # while(user_params[:fourdigit_id])
            
        # end
        @user = User.new(user_params)

        if(@user.save)
            byebug
            server = Server.find_by({server_link: "dissonance"})
            ServerJoin.create!({user_id: @user.id, server_id: server.id})
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

    def update
        @user = User.find(params[:id])
        if @user.is_password?(params["user"]["password"])
            if(!params["user"]["newpassword"].nil? && !params["user"]["newpassword"].empty?)
                @user.password = params["user"]["newpassword"]
                @user.save! #dont work Pain
            end
            if @user.update(user_params)
                render "_user", locals: { user: @user }
            else
                render json: @user.errors.full_messages, status: 422
            end
        else
          render json: ["Incorrect password!"], status: 422
        end
    end

    def updateBio
        @user = User.find(params[:id])
        @user.bio = params[:bio]
        if @user.save
            render "_user", locals: { user: @user }
        else
            render json: @user.errors.full_messages, status: 422
        end
    end

    def status
        @user = User.find(params[:id])
        @user.status = params[:status]
        if @user.save
            render "_user", locals: { user: @user }
        else
            render json: @user.errors.full_messages, status: 422
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

    def changePFP
        @user = User.find(params[:id])
        params["user"]["image"].permit!
        if(@user.profile_picture.attached?)
            @user.profile_picture.purge
        end
        input_string = params["user"]["image"].inspect()
        start = "<Tempfile:"
        endd =  ">,"
        @user.profile_picture.attach(io: File.open(input_string[/#{start}(.*?)#{endd}/m, 1]), filename: input_string[/filename="(.*?)"/m, 1])
        render "_user", locals: { user: @user }, status: 200
    end

    def nickname
        @serverjoin = ServerJoin.find_by({user_id: params[:id], server_id: params[:server_id]})
        @serverjoin.nickname = params[:nickname]
        if(@serverjoin.save)
            render json: @serverjoin, status: 200
        else
            render json: ["An Error Occurred with Nickname change"], status: 422
        end
    end


    # def check_password(pass) #THIS SHOULd BE IMPLEMENTED INSTEAD OF DOING THE COMPARISON IN THE FRONTEND, BUT... YEAH... MAYBE LATER
    #     @
    # end

    private
    def user_params
        params.require(:user).permit(:email, :username, :fourdigit_id, :bio) #maybe not pass
    end

    # def generate_fourdigit

    # end

end
