class Api::ConversationsController < ApplicationController

    before_action :require_logged_in, except: [:index]
    ##RE-ENABLE ABOVE AFTER
      
    # def index
    #     @conversations = Conversation.all
    # end
    
    def show
        @conversation = Conversation.find(params[:id])
        # Your code here
    end
    
    def create
        @conversation = Conversation.new(convo_params)
    
        if @conversation.save
            render '_room', locals: { conversation: @conversation }
        else
            render json: @conversation.errors.full_messages, status: 422
        end
    end

    private
    def convo_params
        params.require(:conversation).permit(:user1_id, :user2_id)
    end

end