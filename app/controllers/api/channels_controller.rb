class Api::ChannelsController < ApplicationController

    before_action :require_logged_in
    # #RE-ENABLE ABOVE AFTER
    
    def show
        @channel = Channel.find(params[:id])
        # Your code here
    end
    
    def create
        @channel = Channel.new(channel_params)
    
        if @channel.save
            render '_channel'
        else
            render json: @channel.errors.full_messages, status: 422
        end
    end

    # def update
    #     @conversation = Conversation.find(params[:id])
      
    #     if @conversation.update(update_params)
    #         # render :update, locals: { conversation: @conversation }
    #         render json: @conversation
    #     else
    #         render json: @convo.errors.full_messages, status: 422
    #     end
    # end

    private
    def channel_params
        params.require(:channel).permit(:name, :server_id, :description)
    end

    # def update_params
    #     params.require(:conversation).permit(:last_updated)
    # end

end