class Api::MessagesController < ApplicationController
    # before_action :require_logged_in

    def create
        @message = Message.new(message_params)
    
        if @message.save
        # Your code here
          render :show, locals: { message: @message }
        else
            render json: @message.errors.full_messages, status: 422
        end
    end

    def destroy
        @message = Message.find(params[:id])
        @message.destroy
        # Your code here
        render json: @message, status: :ok
    end


    #NOTE: THEY CAN CHANGE MORE THAN I WANT
    def update
      @message = Message.find(params[:id])
      
      if @message.update(message_edit_params)
        render :show, locals: { message: @message }
      else
        render json: @message.errors.full_messages, status: 422
      end
    end

  private
  def message_params
    params.require(:message).permit(:content, :author_id, :location_type, :location_id)
  end

  def message_edit_params
    params.require(:message).permit(:content)
  end
end