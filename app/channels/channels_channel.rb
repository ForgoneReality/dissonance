
class ChannelsChannel < ApplicationCable::Channel
    def subscribed
      @location = Channel.find_by(id: params[:id])
      stream_for @location
    end
end