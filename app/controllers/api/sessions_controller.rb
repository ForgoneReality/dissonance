class Api::SessionsController < ApplicationController

    def create
        @user = User.find_by_credentials(params[:user][:email], params[:user][:password])
        
        if(@user && @user.special_id == 0)
            login!(@user)
            @user.last_login = Time.current
            @user.status = "online"
            @user.save

            Thread.new do
                sleep 10
                aria = User.find_by({email: "cleverbot@gmail.com"})
                convo = Conversation.find_by({user1_id: @user.id, user2_id: aria.id})
                message = Message.new({content: "Hi! Welcome to Dissonance!", author_id: aria.id, location_type: "Conversation", location_id: convo.id})
                if message.save
                    convo.unread1 += 1
                    convo.save!
                end
                ConversationsNotifChannel.broadcast_to convo.user1, type: "RECEIVE_CONVERSATION_NOTIF", conversation: convo
                ConversationsChannel.broadcast_to message.location, type:"RECEIVE_MESSAGE", **from_template('api/messages/_helper', message: message)
            end
            # redirect_to api_users_url(@user)
            render "_user", status: 200

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
        @user = demo_users.min_by {|ele| ele.last_login}
        
        # @user = User.where("id < 6").order("last_login ASC").first

        if(@user)
            login!(@user)
            @user.last_login = Time.current
            @user.status = "online"
            # redirect_to api_users_url(@user)
            @user.save

            Thread.new do
                sleep 10
                aria = User.find_by({email: "cleverbot@gmail.com"})
                convo = Conversation.find_by({user1_id: @user.id, user2_id: aria.id})
                message = Message.new({content: "Hi! Welcome to Dissonance!", author_id: aria.id, location_type: "Conversation", location_id: convo.id})
                if message.save
                    convo.unread1 += 1
                    convo.save!
                end
                ConversationsNotifChannel.broadcast_to convo.user1, type: "RECEIVE_CONVERSATION_NOTIF", conversation: convo
                ConversationsChannel.broadcast_to message.location, type:"RECEIVE_MESSAGE", **from_template('api/messages/_helper', message: message)
            end
              

            render "_user", status: 200
        else #No status!!
            render json: ["Something went wrong..."], status: 401
            # render :new
        end
    end

    def destroy
        if(logged_in?)
            current_user.status = "offline"
            current_user.save
            logout!
            render json: {} #!!!!!!!!!!!!!!!!!!!!!!!!!!!
        else
            render json: ["Nobody signed in"], status: 404
        end
    end

end
