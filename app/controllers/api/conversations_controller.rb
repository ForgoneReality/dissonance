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
        # debugger
        @conversation = Conversation.new(convo_params)
    
        if @conversation.save
            render '_convos', locals: { conversation: @conversation }
        else
            render json: @conversation.errors.full_messages, status: 422
        end
    end

    def other #bad code incoming...
        @conversation = Conversation.new(convo_params)
    
        if @conversation.save
            render '_convolong', locals: {conversation: @conversation, userid: params[:userId]}
        else
            render json: @conversation.errors.full_messages, status: 422
        end
    end

    
    def search
        @conversation = Conversation.find_by({user1_id: params[:conversation][:user1_id], user2_id: params[:conversation][:user2_id]});
        if @conversation.nil?
            @conversation = Conversation.find_by({user2_id: params[:conversation][:user1_id], user1_id: params[:conversation][:user2_id]})
        end
    
        if @conversation
            render '_convos', locals: {conversation: @conversation}
        else
            render json: ["None"]
        end
    end

    def update
        @conversation = Conversation.find(params[:id])
        if @conversation.update(update_params)
            render '_convolong', locals: {conversation: @conversation, userid: params[:userId]}
        else
            render json: @convo.errors.full_messages, status: 422
        end
    end

    def read
        @conversation = Conversation.find(params[:id])
        user_id = params[:userId].to_i
        if(@conversation.user1_id == user_id)
            @conversation.unread1 = 0
        else
            @conversation.unread2 = 0
        end
        if @conversation.save
            render '_convolong', locals: {conversation: @conversation, userid: user_id}
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