class Api::ServersController < ApplicationController

    before_action :require_logged_in, except: [:index]
    
    def index
        @servers = Server.all
        render json: @servers
    end
    
    def show
        @server = Server.find(params[:id])
        render :show, locals: {server: @server}
    end

    def mainchannel
        @server = Server.find(params[:id])

        render :firstchannel
    end

    # def create

    # end

    # def update
    # end

    # def destroy
    # end

    private
    # def server_params
    #     params.require(:server).permit(:user1_id, :user2_id)
    # end

end