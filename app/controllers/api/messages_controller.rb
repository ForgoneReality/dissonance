require 'open-uri'

class Api::MessagesController < ApplicationController
    before_action :require_logged_in

   
    def create
        @message = Message.new(message_params)

        if @message.save
          if(params["message"]["image"])
            params["message"]["image"].permit!
            input_string = params["message"]["image"].inspect()
            start = "<Tempfile:"
            endd =  ">,"
            @message.image.attach(io: File.open(input_string[/#{start}(.*?)#{endd}/m, 1]), filename: input_string[/filename="(.*?)"/m, 1])
          end

          if(@message.location_type == "Conversation")
            if(params["message"]["recipient_id"]) #recipient_id wasn't needed but w/e
              convo = Conversation.find(params["message"]["location_id"])

              if(convo.user1_id == params["message"]["recipient_id"].to_i)
                convo.unread1 += 1
                cfirst = true;
              else
                convo.unread2 += 1
                cfirst = false;
              end
              convo.save!
              if(cfirst)
                ConversationsNotifChannel.broadcast_to convo.user1, type: "RECEIVE_CONVERSATION_NOTIF", conversation: convo
              else  
                ConversationsNotifChannel.broadcast_to convo.user2, type: "RECEIVE_CONVERSATION_NOTIF", conversation: convo
              end

              # params["message"]["recipient_id"]
            end
            ConversationsChannel.broadcast_to @message.location, type:"RECEIVE_MESSAGE", **from_template('api/messages/_helper', message: @message)
          elsif(@message.location_type == "Channel")
            ChannelsChannel.broadcast_to @message.location, type:"RECEIVE_MESSAGE", **from_template('api/messages/_helper', message: @message)
          end

          render "_helper", locals: { message: @message }, status: 200
        else
            render json: @message.errors.full_messages, status: 422
        end
    end

    def createother
      @message = Message.new(message_params)
        if @message.save
          if(params["message"]["image"])
            downloaded_image = open(params["message"]["image"])
            @message.image.attach(io: downloaded_image, filename: "test.png")
          end

          if(@message.location_type == "Conversation")
            if(params["message"]["recipient_id"]) #recipient_id wasn't needed but w/e
              convo = Conversation.find(params["message"]["location_id"])

              if(convo.user1_id == params["message"]["recipient_id"].to_i)
                convo.unread1 += 1
                cfirst = true;
              else
                convo.unread2 += 1
                cfirst = false;
              end
              convo.save!
              if(cfirst)
                ConversationsNotifChannel.broadcast_to convo.user1, type: "RECEIVE_CONVERSATION_NOTIF", conversation: convo
              else  
                ConversationsNotifChannel.broadcast_to convo.user2, type: "RECEIVE_CONVERSATION_NOTIF", conversation: convo
              end

              # params["message"]["recipient_id"]
            end
            ConversationsChannel.broadcast_to @message.location, type:"RECEIVE_MESSAGE", **from_template('api/messages/_helper', message: @message)
          elsif(@message.location_type == "Channel")
            ChannelsChannel.broadcast_to @message.location, type:"RECEIVE_MESSAGE", **from_template('api/messages/_helper', message: @message)
          end

          render "_helper", locals: { message: @message }, status: 200
        else
            render json: @message.errors.full_messages, status: 422
        end
    end

    def destroy
        @message = Message.find(params[:id])
        @message.destroy
        
        if(@message.location_type == "Conversation")
          ConversationsChannel.broadcast_to @message.location,
          type: 'DELETE_MESSAGE',
          id: @message.id
        elsif(@message.location_type == "Conversation")
          ChannelsChannel.broadcast_to @message.location,
          type: 'DELETE_MESSAGE',
          id: @message.id
        end
        # Your code here
        render json: @message, status: :ok
    end


    def update
      @message = Message.find(params[:id])

     
      if @message.update(message_edit_params)

        @message.edited = true
        @message.save!
        if(@message.location_type == "Conversation")
          ConversationsChannel.broadcast_to @message.location, type:"RECEIVE_MESSAGE", **from_template('api/messages/_helper', message: @message)
        elsif(@message.location_type == "Channel")
          ChannelsChannel.broadcast_to @message.location, type:"RECEIVE_MESSAGE", **from_template('api/messages/_helper', message: @message)
        end
        
        render "_helper", locals: { message: @message }
      else
        render json: @message.errors.full_messages, status: 422
      end
    end

    def pin
      @message = Message.find(params[:id])

      @message.pinned = !@message.pinned
      if @message.save
        render "_helper", locals: { message: @message }
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