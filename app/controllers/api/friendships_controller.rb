class Api::FriendshipsController < ApplicationController

    before_action :require_logged_in
    
    def create
        @friendship = Friendship.new(friendship_params)

        if @friendship.save
            render json: @friendship
        else
            render json: @friendship.errors.full_messages, status: 422
        end
        # Your code here
    end
    
    # def create
    #     @conversation = Conversation.new(convo_params)
    
    #     if @conversation.save
    #         render '_room', locals: { conversation: @conversation }
    #     else
    #         render json: @conversation.errors.full_messages, status: 422
    #     end
    # end

    private
    def friendship_params
        params.require(:friendship).permit(:user_id, :friend_id)
    end
end