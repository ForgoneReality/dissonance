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
            if(params["server"]["icon"] && params["server"]["icon"] != "")
                input_string = params["server"]["icon"].inspect()
                start = "<Tempfile:"
                endd =  ">,"
                @server.icon.attach(io: File.open(input_string[/#{start}(.*?)#{endd}/m, 1]), filename: input_string[/filename="(.*?)"/m, 1])
            end
            @server = Server.find(@server.id)
            render "_server", locals: { server: @server }, status: 200
        else
            render json: @server.errors.full_messages, status: 422
        end
    end

    def update
        @server = Server.find(params[:id])
        if @server.update(server_params)
            if(params["server"]["icon"])
                if(@server.icon.attached?)
                    @server.icon.purge
                end
                input_string = params["server"]["icon"].inspect()
                start = "<Tempfile:"
                endd =  ">,"
                @server.icon.attach(io: File.open(input_string[/#{start}(.*?)#{endd}/m, 1]), filename: input_string[/filename="(.*?)"/m, 1])
            end
            if @server.update(server_params)
                render "_server", locals: { server: @server }
            else
                render json: @server.errors.full_messages, status: 422
            end
        else
            render json: ["Incorrect password!"], status: 422
        end
    end

    def mainchannel
        @server = Server.find(params[:id])
        render :firstchannel
    end

    def getlink
        @server = Server.find_by(server_link: params[:id])
        @num_members = @server.users.length
        @online_members = @server.users.where(status: "online").count
        render "_serverlink", locals: {server: @server}
    end

    def leave
        @serverjoin = ServerJoin.find_by({server_id: params[:id], user_id: params[:user_id]})
        if(@serverjoin.destroy)
            render json: @serverjoin, status: 200
        else
            render json: ["An Error Occurred with Leaving the Server"], status: 422
        end
    end

    def join
        @serverjoin = ServerJoin.find_by({server_id: params[:id], user_id: params[:user_id]})
        if(@serverjoin)
            @server = Server.find(@serverjoin.server_id)
            render "_serverjoin", status: 200
        else
            @serverjoin = ServerJoin.new({server_id: params[:id], user_id: params[:user_id]})
            if(@serverjoin.save)
                @server = Server.find(@serverjoin.server_id)
                render "_serverjoin", status: 200
            else
                render json: ["An Error Occurred with Joining the Server"], status: 422
            end
        end
        
    end

  
    # def update
    # end

    def destroy
        @server = Server.find(params[:id])
        @server.destroy
        render json: @server
    end

    private
    def server_params
        params.require(:server).permit(:server_link, :owner_id, :name)
    end

end