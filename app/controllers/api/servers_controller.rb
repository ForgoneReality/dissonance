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

    def create
        @server = Server.new(owner_id: params["server"]["owner_id"].to_i, name: params["server"]["name"], server_link: params["server"]["server_link"])
        if @server.save
            if(params["server"]["icon"])
                params["server"]["icon"].permit!
                input_string = params["server"]["icon"].inspect()
                start = "<Tempfile:"
                endd =  ">,"
                @server.icon.attach(io: File.open(input_string[/#{start}(.*?)#{endd}/m, 1]), filename: input_string[/filename="(.*?)"/m, 1])
            end
            render "_server", locals: { server: @server }, status: 200
        else
            render json: @server.errors.full_messages, status: 422
        end
    end

    def mainchannel
        @server = Server.find(params[:id])
        render :firstchannel
    end

  
    # def update
    # end

    # def destroy
    # end

    private
    # def server_params
    #     params.require(:server).permit(:server_link, :owner_id, :name)
    # end

end