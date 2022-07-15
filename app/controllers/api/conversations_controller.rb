class Api::ConversationsController < ApplicationController

    before_action :require_logged_in, except: [:index]
    # #RE-ENABLE ABOVE AFTER
      
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
            render '_convos', locals: { conversation: @conversation }
        else
            render json: @conversation.errors.full_messages, status: 422
        end
    end

    def update
        @conversation = Conversation.find(params[:id])
      
        if @conversation.update(update_params)
            # render :update, locals: { conversation: @conversation }
            render json: @conversation
        else
            render json: @convo.errors.full_messages, status: 422
        end
    end

    private
    def convo_params
        params.require(:conversation).permit(:user1_id, :user2_id)
    end

    def update_params
        params.require(:conversation).permit(:last_updated)
    end

end