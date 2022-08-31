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

    def fetchBatch
        @channel = Channel.find(params[:id])

        # @channel.messages[0]
    end

    def update
        @channel = Channel.find(params[:id])
      
        if @channel.update(channel_params)
            # render :update, locals: { conversation: @conversation }
            render json: @channel
        else
            render json: @channel.errors.full_messages, status: 422
        end
    end

    def destroy
        @channel = Channel.find(params[:id])
        @server = @channel.server
        @channel.destroy
        
        render json: @server.channels[0]
    end

    private
    def channel_params
        params.require(:channel).permit(:name, :server_id, :description)
    end

    # def update_params
    #     params.require(:conversation).permit(:last_updated)
    # end

end